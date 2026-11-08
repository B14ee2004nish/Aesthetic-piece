import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ExternalLink,
  Heart,
  ShieldCheck,
  Sparkles,
  Layers,
  Compass,
  Check
} from 'lucide-react';
import prisma from '@/lib/prisma';
import ProductCard, { ProductType } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

// Curated fallback items if database is queried before seeding
const FALLBACK_PRODUCTS: ProductType[] = [
  {
    id: 'prod_1',
    name: 'Zen Basalt Stone Fountain',
    category: 'Decor Accents',
    description: 'Handcrafted natural basalt stone water fountain with gentle cascading stream, bringing calming acoustic ambiance and grounding presence to living sanctuaries.',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/zen-basalt-fountain',
    price: 185.0,
    featured: true,
  },
  {
    id: 'prod_2',
    name: 'Fluted Ceramic Vase',
    category: 'Vases & Vessels',
    description: 'Sculptural ribbed ceramic vessel with an unglazed matte chalk finish, designed to display dry florals or stand alone as a quiet architectural statement.',
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
    description: 'Slim antique brass arched mantle mirror crafted from iron and distortion-free hand-finished glass, catching natural light across entryways and dressing areas.',
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

interface ProductPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;

  let product: ProductType | null = null;
  let similarProducts: ProductType[] = [];

  try {
    // 1. Fetch single product by its ID from the database
    const dbProduct = await prisma.product.findUnique({
      where: { id },
      include: { categoryRel: true },
    });

    if (dbProduct) {
      product = {
        id: dbProduct.id,
        name: dbProduct.name,
        category: dbProduct.category,
        description: dbProduct.description,
        imageUrl: dbProduct.imageUrl,
        affiliateLink: dbProduct.affiliateLink,
        price: dbProduct.price ?? undefined,
        featured: dbProduct.featured,
        createdAt: dbProduct.createdAt.toISOString(),
      };
    } else {
      // Check fallback list
      product = FALLBACK_PRODUCTS.find((p) => p.id === id) || null;
    }

    if (product) {
      // 2. Fetch similar products sharing the same category (exclude current product)
      const dbSimilar = await prisma.product.findMany({
        where: {
          category: product.category,
          NOT: { id: product.id },
        },
        take: 3,
        orderBy: { createdAt: 'desc' },
      });

      if (dbSimilar && dbSimilar.length > 0) {
        similarProducts = dbSimilar.map((p: any) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          description: p.description,
          imageUrl: p.imageUrl,
          affiliateLink: p.affiliateLink,
          price: p.price ?? undefined,
          featured: p.featured,
          createdAt: p.createdAt.toISOString(),
        }));
      } else {
        // Fallback similar
        similarProducts = FALLBACK_PRODUCTS.filter(
          (p) => p.category === product?.category && p.id !== product?.id
        ).slice(0, 3);

        // If category has only 1 item, display other curated pieces
        if (similarProducts.length === 0) {
          similarProducts = FALLBACK_PRODUCTS.filter((p) => p.id !== product?.id).slice(0, 3);
        }
      }
    }
  } catch (error) {
    console.warn('Prisma error fetching product detail:', error);
    product = FALLBACK_PRODUCTS.find((p) => p.id === id) || null;
    if (product) {
      similarProducts = FALLBACK_PRODUCTS.filter(
        (p) => p.category === product?.category && p.id !== product?.id
      ).slice(0, 3);
    }
  }

  if (!product) {
    notFound();
  }

  const categorySlug = product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div className="py-10 sm:py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#737373] mb-8 sm:mb-12">
          <Link href="/" className="hover:text-[#1a1a1a] transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Collection</span>
          </Link>
          <span>/</span>
          <Link href={`/category/${categorySlug}`} className="hover:text-[#1a1a1a] transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#1a1a1a] font-medium truncate max-w-[200px] sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* Product Showcase Section: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-20 border-b border-[#e5e5e5]">
          {/* Left Column: Editorial Product Photography */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] w-full bg-[#f4f2ee] border border-[#e5e5e5] overflow-hidden group">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
              />

              {product.featured && (
                <div className="absolute top-4 left-4 bg-[#1a1a1a] text-white text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1">
                  Featured Curated Pick
                </div>
              )}
            </div>

            {/* Quality & Craftsmanship Badges */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#f0ede6]">
              <div className="flex flex-col items-center text-center p-3 bg-[#faf9f6] border border-[#e5e5e5]">
                <ShieldCheck className="w-4 h-4 text-[#8c7b6c] mb-1.5" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#1a1a1a]">Verified</span>
                <span className="text-[10px] text-[#737373] mt-0.5">Craftsmanship</span>
              </div>

              <div className="flex flex-col items-center text-center p-3 bg-[#faf9f6] border border-[#e5e5e5]">
                <Sparkles className="w-4 h-4 text-[#8c7b6c] mb-1.5" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#1a1a1a]">Natural</span>
                <span className="text-[10px] text-[#737373] mt-0.5">Organic Materials</span>
              </div>

              <div className="flex flex-col items-center text-center p-3 bg-[#faf9f6] border border-[#e5e5e5]">
                <Compass className="w-4 h-4 text-[#8c7b6c] mb-1.5" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#1a1a1a]">Timeless</span>
                <span className="text-[10px] text-[#737373] mt-0.5">Restrained Design</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Product Details & Affiliate Link */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category Tag */}
              <Link
                href={`/category/${categorySlug}`}
                className="inline-block text-[11px] uppercase tracking-[0.22em] text-[#737373] font-medium hover:text-[#1a1a1a] transition-colors"
              >
                {product.category}
              </Link>

              {/* Product Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1a1a1a] mt-2 leading-[1.15]">
                {product.name}
              </h1>

              {/* Price Tag */}
              <div className="mt-4 pb-6 border-b border-[#e5e5e5] flex items-baseline gap-3">
                {product.price !== undefined && product.price !== null && product.price > 0 ? (
                  <>
                    <span className="font-serif text-2xl font-medium text-[#1a1a1a]">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    <span className="text-xs text-[#737373] uppercase tracking-wider font-light">
                      Estimated Retail Guide Price
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-[#737373] italic">Curated Design Selection</span>
                )}
              </div>

              {/* Curator Description */}
              <div className="mt-6 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1a1a1a]">
                  Curator&apos;s Notes &amp; Story
                </span>
                <p className="text-sm sm:text-base text-[#525252] leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              {/* Material & Architectural Attributes */}
              <div className="mt-8 pt-6 border-t border-[#f0ede6] space-y-2.5 text-xs text-[#525252]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#8c7b6c]" />
                  <span>Sourced for tactile textures and neutral interior warmth</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#8c7b6c]" />
                  <span>Direct merchant purchase through verified partner affiliate link</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#8c7b6c]" />
                  <span>Curated for modern sanctuaries, living spaces, and consoles</span>
                </div>
              </div>
            </div>

            {/* Outbound Affiliate CTA & Actions */}
            <div className="mt-10 pt-8 border-t border-[#e5e5e5] space-y-3.5">
              {/* Primary Affiliate Link Button */}
              <a
                href={product.affiliateLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs uppercase tracking-widest font-medium text-white bg-[#1a1a1a] hover:bg-black active:scale-[0.99] transition-all cursor-pointer shadow-sm"
              >
                <span>View Product at Retailer</span>
                <ExternalLink className="w-4 h-4 stroke-[1.75]" />
              </a>

              <p className="text-[11px] text-[#737373] text-center font-light">
                Opens directly in retailer storefront with active curation pricing.
              </p>
            </div>
          </div>
        </div>

        {/* Similar Products: "You May Also Like" Section */}
        <section className="mt-20 sm:mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#e5e5e5]">
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#737373] font-semibold">
                Atmosphere Matching
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a1a] font-normal mt-1">
                You May Also Like
              </h2>
            </div>
            <Link
              href={`/category/${categorySlug}`}
              className="mt-2 sm:mt-0 text-xs uppercase tracking-wider text-[#1a1a1a] hover:underline font-medium"
            >
              Browse all {product.category} &rarr;
            </Link>
          </div>

          {similarProducts.length === 0 ? (
            <p className="text-sm text-[#737373]">No other items in this category currently.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProducts.map((similar) => (
                <ProductCard key={similar.id} product={similar} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
