import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-dynamic';

export const PREDEFINED_CATEGORIES = [
  {
    id: 'cat_hd',
    name: 'Home Décor',
    slug: 'home-decor',
    description: 'Beautiful decorative products thoughtfully selected for creating a warm, intentional living space.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=home+decor+aesthetic&tag=aestheticpiece-20',
  },
  {
    id: 'cat_1',
    name: 'Lighting & Lamps',
    slug: 'lighting-lamps',
    description: 'Atmospheric illumination, sculptural table lamps, and serene ambient fixtures.',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=home+decor+lighting+lamps&tag=aestheticpiece-20',
  },
  {
    id: 'cat_2',
    name: 'Vases & Vessels',
    slug: 'vases-vessels',
    description: 'Artisanal stoneware, fluted ceramics, and organic sculptural vessels.',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=fluted+ceramic+vases+vessels&tag=aestheticpiece-20',
  },
  {
    id: 'cat_3',
    name: 'Textiles & Throws',
    slug: 'textiles-throws',
    description: 'Washed Belgian linen, tactile cushions, and cozy organic woven fibers.',
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=french+linen+pillows+throws&tag=aestheticpiece-20',
  },
  {
    id: 'cat_4',
    name: 'Mirrors & Wall Decor',
    slug: 'mirrors-wall-decor',
    description: 'Hand-finished brass arches, minimalist mirrors, and textured wall reliefs.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=arched+brass+mirror+wall+decor&tag=aestheticpiece-20',
  },
  {
    id: 'cat_5',
    name: 'Candles & Scents',
    slug: 'candles-scents',
    description: 'Honed travertine candle vessels, botanical aromas, and soothing soy wax.',
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=scented+soy+candles+stone+vessels&tag=aestheticpiece-20',
  },
  {
    id: 'cat_6',
    name: 'Decor Accents',
    slug: 'decor-accents',
    description: 'Thoughtfully curated stone objects, carved trays, and calming fountains.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=aesthetic+decor+accents+stone+trays&tag=aestheticpiece-20',
  },
];

// GET /api/categories
export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });

    if (categories && categories.length > 0) {
      return NextResponse.json({
        success: true,
        data: categories,
      });
    }

    return NextResponse.json({
      success: true,
      data: PREDEFINED_CATEGORIES,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      data: PREDEFINED_CATEGORIES,
    });
  }
}

// POST /api/categories - Create new category with Image Upload support (Requirement 4)
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let name = '';
    let slug = '';
    let description = '';
    let imageUrl = '';
    let affiliateLink = '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      name = (formData.get('name') as string) || '';
      slug = (formData.get('slug') as string) || '';
      description = (formData.get('description') as string) || '';
      affiliateLink = (formData.get('affiliateLink') as string) || '';

      // Direct Image File Upload
      const file = (formData.get('image') || formData.get('file')) as File | null;
      if (file && typeof file === 'object' && 'arrayBuffer' in file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        await fs.mkdir(uploadsDir, { recursive: true });

        const originalName = file.name || 'category_image.jpg';
        const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `cat-${Date.now()}-${safeName}`;
        const filePath = path.join(uploadsDir, fileName);

        await fs.writeFile(filePath, buffer);
        imageUrl = `/uploads/${fileName}`;
      } else {
        imageUrl = (formData.get('imageUrl') as string) || '';
      }
    } else {
      const body = await request.json();
      name = body.name || '';
      slug = body.slug || '';
      description = body.description || '';
      imageUrl = body.imageUrl || '';
      affiliateLink = body.affiliateLink || '';
    }

    if (!name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
        { status: 400 }
      );
    }

    const calculatedSlug = slug.trim()
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const created = await prisma.category.create({
      data: {
        name: name.trim(),
        slug: calculatedSlug,
        description: description?.trim() || null,
        imageUrl: imageUrl?.trim() || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        affiliateLink: affiliateLink?.trim() || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Category created successfully',
        data: created,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Failed to create category:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create category' },
      { status: 500 }
    );
  }
}

// PATCH /api/categories - Update category
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, slug, affiliateLink, name, description, imageUrl } = body;

    if (!id && !slug) {
      return NextResponse.json(
        { success: false, error: 'Category id or slug is required' },
        { status: 400 }
      );
    }

    const where = id ? { id } : { slug };

    const updated = await prisma.category.upsert({
      where,
      update: {
        ...(affiliateLink !== undefined && { affiliateLink: affiliateLink?.trim() || null }),
        ...(name && { name: name.trim() }),
        ...(description !== undefined && { description: description?.trim() || null }),
        ...(imageUrl !== undefined && { imageUrl: imageUrl?.trim() || null }),
      },
      create: {
        name: name || (slug ? slug.replace(/-/g, ' ') : 'Category'),
        slug: slug || id,
        affiliateLink: affiliateLink?.trim() || null,
        description: description || null,
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Category updated successfully',
      data: updated,
    });
  } catch (error: any) {
    console.error('Failed to update category:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE /api/categories - Delete category by ID
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
        { success: false, error: 'Category ID is required for deletion' },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error: any) {
    console.error('Failed to delete category:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete category' },
      { status: 500 }
    );
  }
}
