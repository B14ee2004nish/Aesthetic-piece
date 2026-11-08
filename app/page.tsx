import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import ProductCard, { ProductType } from '@/components/ProductCard';
import { defaultCategories, CategoryItem } from '@/components/CategoryGrid';
import prisma from '@/lib/prisma';
import { ArrowRight, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

// Fallback curated seed data in case database is accessed before seeding
const fallbackProducts: ProductType[] = [
  // Primary Home Décor items
  {
    id: 'prod_hd_1',
    name: 'Decorative Vases',
    category: 'Home Décor',
    description: 'Sculptural fluted ceramic vessel with a matte chalk finish, designed for displaying dry stems or making a quiet architectural statement on consoles.',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=decorative+vases+home+decor&tag=aestheticpiece-20',
    price: 68.0,
    featured: true,
  },
  {
    id: 'prod_hd_2',
    name: 'Tabletop Fountains',
    category: 'Home Décor',
    description: 'Handcrafted natural basalt stone indoor water fountain with gentle cascading stream, bringing calming acoustic ambiance to living sanctuaries.',
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
  // Additional atmosphere items
  {
    id: 'prod_1',
    name: 'Zen Basalt Stone Fountain',
    category: 'Decor Accents',
    description: 'Handcrafted natural basalt stone water fountain with gentle cascading stream, bringing calming acoustic ambiance to living sanctuaries.',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/zen-basalt-fountain',
    price: 185.0,
    featured: true,
  },
  {
    id: 'prod_2',
    name: 'Fluted Ceramic Vase',
    category: 'Vases & Vessels',
    description: 'Sculptural ribbed ceramic vessel with an unglazed matte chalk finish, designed to display dry florals or make a quiet statement.',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/fluted-ceramic-vase',
    price: 58.0,
    featured: true,
  },
  {
    id: 'prod_3',
    name: 'Dome Mushroom Lamp',
    category: 'Lighting & Lamps',
    description: 'Mid-century modern dome table lamp with warm ambient diffused LED illumination, featuring a weighted metal base and matte cashmere lacquer.',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/dome-mushroom-lamp',
    price: 120.0,
    featured: true,
  },
  {
    id: 'prod_4',
    name: 'Boho Pampas Grass',
    category: 'Decor Accents',
    description: 'Naturally dried fluffy neutral pampas plumes adding soft architectural movement, tactile richness, and organic texture to quiet interior corners.',
    imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/boho-pampas-grass',
    price: 34.0,
    featured: false,
  },
  {
    id: 'prod_5',
    name: 'Arched Brass Mirror',
    category: 'Mirrors & Wall Decor',
    description: 'Slim antique brass arched mantle mirror crafted from iron and distortion-free hand-finished glass, catching natural light across entryways.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/arched-brass-mirror',
    price: 240.0,
    featured: true,
  },
  {
    id: 'prod_6',
    name: 'Linen Cushions',
    category: 'Textiles & Throws',
    description: 'Washed French flax linen throw pillow covers with raw frayed fringe detailing and plush cruelty-free down-alternative feather inserts.',
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/linen-cushions',
    price: 48.0,
    featured: true,
  },
  {
    id: 'prod_7',
    name: 'Ribbed Planter',
    category: 'Vases & Vessels',
    description: 'Architectural stoneware planter with vertical grooved fluting and internal drainage saucer, ideal for indoor olive trees, ferns, and fiddle leaf figs.',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/ribbed-planter',
    price: 64.0,
    featured: false,
  },
  {
    id: 'prod_8',
    name: 'Plaster Wall Art',
    category: 'Mirrors & Wall Decor',
    description: 'Hand-sculpted textured plaster relief canvas featuring subtle geometric arches and tactile impasto contours in soft warm off-white and gypsum.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/plaster-wall-art',
    price: 195.0,
    featured: true,
  },
  {
    id: 'prod_9',
    name: 'Travertine Candle',
    category: 'Candles & Scents',
    description: 'Hand-poured natural soy wax candle housed in a heavy solid honed beige travertine vessel with fragrance notes of sandalwood, amber, and cardamom.',
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/travertine-candle',
    price: 72.0,
    featured: true,
  },
  {
    id: 'prod_10',
    name: 'Flax Linen Sheets',
    category: 'Textiles & Throws',
    description: 'Stonewashed breathable pure European flax sheet set with an effortless lived-in drape that regulates body temperature and softens with every wash.',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/flax-linen-sheets',
    price: 260.0,
    featured: false,
  },
  {
    id: 'prod_11',
    name: 'Frosted Window Clings',
    category: 'Decor Accents',
    description: 'Non-adhesive static-cling frosted privacy glass film that diffuses harsh direct sunlight into a soft luminous aesthetic glow while blocking UV rays.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/frosted-window-clings',
    price: 28.0,
    featured: false,
  },
  {
    id: 'prod_12',
    name: 'Travertine Tray',
    category: 'Decor Accents',
    description: 'Carved raw natural beige travertine stone vanity tray with smooth rounded beveled edges, ideal for perfumes, jewelry, keys, or coffee table styling.',
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/travertine-tray',
    price: 88.0,
    featured: true,
  },
];

async function getProducts(): Promise<ProductType[]> {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    if (products && products.length > 0) {
      return products.map((p: any) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        description: p.description,
        imageUrl: p.imageUrl,
        affiliateLink: p.affiliateLink,
        price: p.price ?? undefined,
        featured: p.featured,
        categoryId: p.categoryId,
        createdAt: p.createdAt ? p.createdAt.toISOString() : undefined,
      }));
    }
  } catch (error) {
    console.warn('Prisma query failed, falling back to default curated products:', error);
  }
  return fallbackProducts;
}

async function getCategories(): Promise<CategoryItem[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    if (categories && categories.length > 0) {
      return categories.map((c: any) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        imageUrl: c.imageUrl,
        affiliateLink: c.affiliateLink,
      }));
    }
  } catch (error) {
    console.warn('Prisma categories query failed, using defaults:', error);
  }
  return defaultCategories;
}

export default async function HomePage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  // Helper to match products to a category
  const getProductsForCategory = (cat: CategoryItem): ProductType[] => {
    const catNameLower = cat.name.toLowerCase().trim();
    const catSlug = cat.slug.toLowerCase().trim();

    return products.filter((p) => {
      if (cat.id && (p as any).categoryId && (p as any).categoryId === cat.id) {
        return true;
      }
      const pCatLower = (p.category || '').toLowerCase().trim();
      const pCatSlug = pCatLower.replace(/[^a-z0-9]+/g, '-');
      return pCatLower === catNameLower || pCatSlug === catSlug || pCatLower.includes(catNameLower);
    });
  };

  // Group all categories that have products, plus any category defined in the DB
  const categoryGroups = categories.map((cat) => {
    return {
      category: cat,
      products: getProductsForCategory(cat),
    };
  });

  // Track products that have already been assigned to avoid duplicates if needed
  const renderedProductIds = new Set(
    categoryGroups.flatMap((group) => group.products.map((p) => p.id))
  );

  // Catch any unassigned products and group them under their category name
  const remainingProducts = products.filter((p) => !renderedProductIds.has(p.id));
  const remainingCategoriesMap = new Map<string, ProductType[]>();
  for (const prod of remainingProducts) {
    const catName = prod.category || 'Other Curations';
    if (!remainingCategoriesMap.has(catName)) {
      remainingCategoriesMap.set(catName, []);
    }
    remainingCategoriesMap.get(catName)!.push(prod);
  }

  // Filter groups: display categories with items first, or show all populated categories
  const activeGroups = categoryGroups.filter((g) => g.products.length > 0);
  const displayGroups = activeGroups.length > 0 ? activeGroups : categoryGroups;

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfbf9]">
      {/* Hero Section */}
      <Hero />

      {/* Stacked Categories & Products Section (Requirement 1) */}
      <div id="products-section" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {displayGroups.map(({ category, products: catProducts }, index) => {
          return (
            <section
              key={category.slug || category.id || index}
              className="pb-16 sm:pb-24 border-b border-[#e5e5e5] mb-16 sm:mb-24 last:border-b-0 last:pb-0 last:mb-0"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-[#737373] font-semibold">
                      Atmosphere Curation
                    </span>
                    <span className="text-[#a3a3a3]">&middot;</span>
                    <span className="text-xs text-[#8c7b6c] font-medium">
                      {catProducts.length} {catProducts.length === 1 ? 'Piece' : 'Pieces'}
                    </span>
                  </div>

                  {/* Large Category Heading as requested */}
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-normal tracking-tight">
                    {category.name}
                  </h2>

                  {category.description && (
                    <p className="mt-2 text-sm sm:text-base text-[#525252] font-light max-w-2xl leading-relaxed">
                      {category.description}
                    </p>
                  )}
                </div>

                {/* View Category Link */}
                <Link
                  href={`/category/${category.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#1a1a1a] hover:underline self-start sm:self-end shrink-0"
                >
                  <span>Explore {category.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Responsive Product Grid: grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 */}
              {catProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {catProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center bg-white border border-dashed border-[#e5e5e5] p-6">
                  <p className="font-serif text-base text-[#1a1a1a]">No pieces cataloged in {category.name} yet.</p>
                  <Link
                    href="/admin"
                    className="inline-block mt-3 text-xs uppercase tracking-wider text-[#1a1a1a] underline"
                  >
                    Add Products in Admin &rarr;
                  </Link>
                </div>
              )}
            </section>
          );
        })}

        {/* Any remaining unassigned categories */}
        {Array.from(remainingCategoriesMap.entries()).map(([catName, unassignedProducts]) => {
          const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return (
            <section
              key={catName}
              className="pb-16 sm:pb-24 border-b border-[#e5e5e5] mb-16 sm:mb-24 last:border-b-0 last:pb-0 last:mb-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[#737373] font-semibold block mb-1">
                    Atmosphere Curation
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-normal tracking-tight">
                    {catName}
                  </h2>
                </div>

                <Link
                  href={`/category/${slug}`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#1a1a1a] hover:underline self-start sm:self-end shrink-0"
                >
                  <span>Explore {catName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {unassignedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
