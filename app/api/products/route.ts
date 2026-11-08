import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-dynamic';

// GET /api/products
// Optional query params: ?category=slug-or-name&featured=true&search=term
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get('category');
    const featuredParam = searchParams.get('featured');
    const searchParam = searchParams.get('search');

    const whereClause: any = {};

    if (categoryParam) {
      whereClause.OR = [
        { category: { contains: categoryParam } },
        { categoryRel: { slug: categoryParam } },
      ];
    }

    if (featuredParam === 'true') {
      whereClause.featured = true;
    }

    if (searchParam) {
      whereClause.OR = [
        { name: { contains: searchParam } },
        { description: { contains: searchParam } },
        { category: { contains: searchParam } },
      ];
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        categoryRel: true,
      },
    });

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error: any) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch products from database',
      },
      { status: 500 }
    );
  }
}

// POST /api/products
// Handles both multipart/form-data (with direct file upload) and application/json
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let name = '';
    let category = '';
    let description = '';
    let imageUrl = '';
    let affiliateLink = '';
    let price = 0.0;
    let featured = false;
    let categoryId: string | null = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      name = (formData.get('name') as string) || '';
      category = (formData.get('category') as string) || '';
      description = (formData.get('description') as string) || '';
      affiliateLink = (formData.get('affiliateLink') as string) || '';
      const priceVal = formData.get('price');
      price = priceVal ? parseFloat(priceVal as string) : 0.0;
      featured = formData.get('featured') === 'true';
      categoryId = (formData.get('categoryId') as string) || null;

      // Handle direct file upload
      const file = (formData.get('image') || formData.get('file')) as File | null;
      if (file && typeof file === 'object' && 'arrayBuffer' in file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        await fs.mkdir(uploadsDir, { recursive: true });

        const originalName = file.name || 'uploaded_image.jpg';
        const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${Date.now()}-${safeName}`;
        const filePath = path.join(uploadsDir, fileName);

        await fs.writeFile(filePath, buffer);
        imageUrl = `/uploads/${fileName}`;
      } else {
        imageUrl = (formData.get('imageUrl') as string) || '';
      }
    } else {
      const body = await request.json();
      name = body.name || '';
      category = body.category || '';
      description = body.description || '';
      imageUrl = body.imageUrl || '';
      affiliateLink = body.affiliateLink || '';
      price = body.price ? parseFloat(body.price) : 0.0;
      featured = Boolean(body.featured);
      categoryId = body.categoryId || null;
    }

    // Validate required fields
    if (!name.trim() || !category.trim() || !description.trim() || !imageUrl.trim() || !affiliateLink.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: Title, category, description, image, and affiliate link are required.',
        },
        { status: 400 }
      );
    }

    // Connect to category in Prisma if matching
    let matchedCategoryId = categoryId;
    if (!matchedCategoryId) {
      try {
        const existingCategory = await prisma.category.findFirst({
          where: {
            OR: [
              { name: { equals: category } },
              { slug: { equals: category.toLowerCase().replace(/[^a-z0-9]+/g, '-') } },
            ],
          },
        });
        if (existingCategory) {
          matchedCategoryId = existingCategory.id;
        }
      } catch (catErr) {
        // Continue if category lookup fails
      }
    }

    const newProduct = await prisma.product.create({
      data: {
        name: name.trim(),
        category: category.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        affiliateLink: affiliateLink.trim(),
        price: price || 0.0,
        featured: Boolean(featured),
        categoryId: matchedCategoryId || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Product created successfully',
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Failed to create product:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create product in database',
      },
      { status: 500 }
    );
  }
}

// PATCH /api/products
// Body: { id, affiliateLink, name, price, featured, description }
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, affiliateLink, name, price, featured, description } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required for update' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (affiliateLink !== undefined) updateData.affiliateLink = affiliateLink.trim();
    if (name !== undefined) updateData.name = name.trim();
    if (price !== undefined) updateData.price = parseFloat(price);
    if (featured !== undefined) updateData.featured = Boolean(featured);
    if (description !== undefined) updateData.description = description.trim();

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error: any) {
    console.error('Failed to update product:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE /api/products
// Query param: ?id=xxx or JSON body { id: 'xxx' }
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');

    if (!id) {
      try {
        const body = await request.json();
        id = body.id;
      } catch (e) {}
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required for deletion' },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error: any) {
    console.error('Failed to delete product:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete product' },
      { status: 500 }
    );
  }
}

