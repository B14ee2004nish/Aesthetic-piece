import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Sparkles, ShoppingBag } from 'lucide-react';
import prisma from '@/lib/prisma';
import { defaultCategories } from '@/components/CategoryGrid';
import { ProductType } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

// Fallback products for initial demonstration and seed alignment
const FALLBACK_CATEGORY_PRODUCTS: Record<string, ProductType[]> = {
  'home-decor': [
    {
      id: 'prod_hd_1',
      name: 'Decorative Vases',
      category: 'Home Décor',
      description: 'Sculptural fluted ceramic vessel with a matte chalk finish, designed for displaying dry stems or making a quiet architectural statement.',
      imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
      affiliateLink: 'https://www.amazon.com/s?k=decorative+vases+home+decor&tag=aestheticpiece-20',
      price: 68.0,
      featured: true,
    },
    {
      id: 'prod_hd_2',
      name: 'Tabletop Fountains',
      category: 'Home Décor',
      description: 'Handcrafted natural basalt stone indoor water fountain with gentle cascading stream, bringing calming acoustic ambiance to living rooms.',
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      affiliateLink: 'https://www.amazon.com/s?k=tabletop+water+fountains+indoor&tag=aestheticpiece-20',
      price: 145.0,
      featured: true,
    },
    {
      id: 'prod_hd_3',
      name: 'Decorative Lamps',
      category: 'Home Décor',
      description: 'Mid-century modern dome table luminaire with warm ambient diffused LED illumination, featuring a weighted metal base and satin cashmere lacquer.',
      imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      affiliateLink: 'https://www.amazon.com/s?k=decorative+mushroom+table+lamps&tag=aestheticpiece-20',
      price: 110.0,
      featured: true,
    },
    {
      id: 'prod_hd_4',
      name: 'Wall Decorations',
      category: 'Home Décor',
      description: 'Hand-sculpted textured plaster relief canvas and slim arched brass mantle accent crafted for serene living spaces and entryways.',
      imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      affiliateLink: 'https://www.amazon.com/s?k=modern+aesthetic+wall+decorations&tag=aestheticpiece-20',
      price: 185.0,
      featured: true,
    },
    {
      id: 'prod_hd_5',
      name: 'Artificial Flowers',
      category: 'Home Décor',
      description: 'Naturally dried neutral pampas plumes and lifelike silk botanical stems adding soft movement, tactile richness, and organic texture to quiet corners.',
      imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80',
      affiliateLink: 'https://www.amazon.com/s?k=artificial+flowers+dried+botanicals&tag=aestheticpiece-20',
      price: 38.0,
      featured: false,
    },
  ],
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  let categoryName = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  let categoryDescription = `Explore our curated selection of ${categoryName.toLowerCase()} designed to elevate your living space.`;
  let categoryImageUrl: string | null = null;
  let categoryAffiliateLink: string | null = null;
  let products: ProductType[] = [];

  try {
    // 1. Fetch specific category details from the database
    const dbCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { slug },
          { name: { equals: categoryName } },
        ],
      },
    });

    if (dbCategory) {
      categoryName = dbCategory.name;
      if (dbCategory.description) {
        categoryDescription = dbCategory.description;
      }
      categoryImageUrl = dbCategory.imageUrl;
      categoryAffiliateLink = dbCategory.affiliateLink;
    } else {
      // Check defaultCategories list
      const matchedMeta = defaultCategories.find((c) => c.slug === slug);
      if (matchedMeta) {
        categoryName = matchedMeta.name;
        if (matchedMeta.description) categoryDescription = matchedMeta.description;
        categoryImageUrl = matchedMeta.imageUrl || null;
        categoryAffiliateLink = matchedMeta.affiliateLink || null;
      }
    }

    // 2. Fetch all products that belong to this category (via categoryId, category name, or categoryRel.slug)
    const dbProducts = await prisma.product.findMany({
      where: {
        OR: [
          ...(dbCategory ? [{ categoryId: dbCategory.id }] : []),
          { category: { contains: categoryName } },
          { categoryRel: { slug } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });

    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts.map((p: any) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        description: p.description,
        imageUrl: p.imageUrl,
        affiliateLink: p.affiliateLink,
        price: p.price ?? undefined,
        featured: p.featured,
        createdAt: p.createdAt ? p.createdAt.toISOString() : undefined,
      }));
    } else if (FALLBACK_CATEGORY_PRODUCTS[slug]) {
      products = FALLBACK_CATEGORY_PRODUCTS[slug];
    }
  } catch (error) {
    console.warn('Database query failed for category page, using fallbacks:', error);
    if (FALLBACK_CATEGORY_PRODUCTS[slug]) {
      products = FALLBACK_CATEGORY_PRODUCTS[slug];
    }
  }

  return (
    <div className="py-12 sm:py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#737373] mb-8">
          <Link href="/" className="hover:text-[#1a1a1a] transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>
          <span>/</span>
          <span className="text-[#1a1a1a] font-medium">{categoryName}</span>
        </div>

        {/* Category Header with Name and Description (Requirement 3) */}
        <div className="pb-10 border-b border-[#e5e5e5] mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#737373] font-semibold">
                Atmosphere &middot; Category Collection
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-[#1a1a1a] font-normal mt-2">
                {categoryName}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#525252] font-light max-w-2xl leading-relaxed">
                {categoryDescription}
              </p>
            </div>

            {categoryAffiliateLink && (
              <a
                href={categoryAffiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f4f2ee] border border-[#e5e5e5] text-xs uppercase tracking-wider text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors self-start md:self-end"
              >
                <span>Shop {categoryName} on Amazon</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Product Grid: Clean, responsive grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8) (Requirement 3) */}
        {products.length === 0 ? (
          <div className="py-20 text-center bg-white border border-dashed border-[#e5e5e5] p-8">
            <ShoppingBag className="w-8 h-8 text-[#a3a3a3] mx-auto mb-3 stroke-[1.5]" />
            <p className="font-serif text-xl text-[#1a1a1a]">No products yet in {categoryName}</p>
            <p className="mt-2 text-sm text-[#737373] max-w-md mx-auto">
              Add products to this category from the Admin Dashboard and they will automatically appear here.
            </p>
            <Link
              href="/admin"
              className="inline-block mt-6 px-6 py-2.5 text-xs uppercase tracking-wider text-white bg-[#1a1a1a] hover:bg-black transition-colors"
            >
              Add Product in Admin
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <article
                key={product.id}
                className="group relative flex flex-col bg-white border border-[#e5e5e5] hover:border-[#1a1a1a] transition-all duration-300"
              >
                {/* Product Image */}
                <Link
                  href={`/product/${product.id}`}
                  className="relative aspect-[4/5] w-full overflow-hidden bg-[#f4f2ee] block cursor-pointer"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {product.featured && (
                    <div className="absolute top-3 left-3 bg-[#1a1a1a] text-white text-[10px] tracking-[0.18em] uppercase font-semibold px-2.5 py-1 z-10">
                      Featured Pick
                    </div>
                  )}
                </Link>

                {/* Details Container */}
                <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    {/* Category Name */}
                    <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#737373]">
                      {product.category}
                    </span>

                    {/* Product Name */}
                    <Link
                      href={`/product/${product.id}`}
                      className="block font-serif text-lg font-medium text-[#1a1a1a] mt-1 group-hover:text-black line-clamp-1 hover:underline decoration-1 underline-offset-2"
                    >
                      {product.name}
                    </Link>

                    {/* Short Description */}
                    <p className="mt-2 text-xs text-[#525252] leading-relaxed line-clamp-2 font-light">
                      {product.description}
                    </p>
                  </div>

                  {/* Footer with Price and "Shop Now" Button (Requirement 3) */}
                  <div className="mt-6 pt-4 border-t border-[#f0ede6] flex items-center justify-between gap-3">
                    {/* Price */}
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#a3a3a3] block">
                        Guide Price
                      </span>
                      <span className="font-serif text-base font-medium text-[#1a1a1a]">
                        ${product.price !== undefined && product.price !== null ? Number(product.price).toFixed(2) : '0.00'}
                      </span>
                    </div>

                    {/* "Shop Now" Button linking to affiliateLink */}
                    <a
                      href={product.affiliateLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-white bg-[#1a1a1a] hover:bg-black active:scale-[0.98] transition-all rounded-none cursor-pointer"
                    >
                      <span>Shop Now</span>
                      <ExternalLink className="w-3.5 h-3.5 stroke-[1.75]" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
