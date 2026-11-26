'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Gift,
  Cake,
  Sparkles,
  Lightbulb,
  Palette,
  Tag,
} from 'lucide-react';
import type { ProductType } from '@/components/ProductCard';

interface GiftProduct extends ProductType {
  retailer: 'AMAZON' | 'ALIEXPRESS';
  giftTag:
    | 'Birthday Celebrations'
    | 'Christmas & Holiday Wonders'
    | 'STEM & Mind Boosters'
    | 'Creative & Open Play'
    | 'Under $30 Sweet Spots';
}

const FALLBACK_GIFT_PRODUCTS: GiftProduct[] = [
  {
    id: 'prod_hd_1',
    name: 'Decorative Vases',
    category: 'Home Décor',
    description:
      'Sculptural fluted ceramic vessel with a matte chalk finish—an effortless housewarming or birthday keepsake.',
    imageUrl:
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    affiliateLink:
      'https://www.amazon.com/s?k=decorative+vases+home+decor&tag=aestheticpiece-20',
    price: 28.0,
    featured: true,
    retailer: 'AMAZON',
    giftTag: 'Birthday Celebrations',
  },
  {
    id: 'prod_3',
    name: 'Dome Mushroom Lamp',
    category: 'Lighting & Lamps',
    description:
      'Mid-century modern dome table luminaire casting a cozy ambient glow for winter evenings and holiday gifting.',
    imageUrl:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/dome-mushroom-lamp',
    price: 120.0,
    featured: true,
    retailer: 'ALIEXPRESS',
    giftTag: 'Christmas & Holiday Wonders',
  },
  {
    id: 'prod_9',
    name: 'Travertine Candle',
    category: 'Candles & Scents',
    description:
      'Hand-poured soy wax candle housed in a solid honed beige travertine vessel with sandalwood and cardamom notes.',
    imageUrl:
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=travertine+candle&tag=aestheticpiece-20',
    price: 29.0,
    featured: true,
    retailer: 'AMAZON',
    giftTag: 'Under $30 Sweet Spots',
  },
  {
    id: 'prod_8',
    name: 'Plaster Wall Art',
    category: 'Mirrors & Wall Decor',
    description:
      'Hand-sculpted textured plaster relief canvas inspiring tactile creativity and serene architectural warmth.',
    imageUrl:
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/plaster-wall-art',
    price: 195.0,
    featured: true,
    retailer: 'ALIEXPRESS',
    giftTag: 'Creative & Open Play',
  },
  {
    id: 'prod_1',
    name: 'Zen Basalt Stone Fountain',
    category: 'Decor Accents',
    description:
      'Natural basalt stone cascading water feature designed to calm focus corners, study desks, and reading nooks.',
    imageUrl:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=tabletop+water+fountain&tag=aestheticpiece-20',
    price: 145.0,
    featured: true,
    retailer: 'AMAZON',
    giftTag: 'STEM & Mind Boosters',
  },
];

const GIFT_FILTERS = [
  { label: 'Birthday Celebrations', icon: Cake },
  { label: 'Christmas & Holiday Wonders', icon: Sparkles },
  { label: 'STEM & Mind Boosters', icon: Lightbulb },
  { label: 'Creative & Open Play', icon: Palette },
  { label: 'Under $30 Sweet Spots', icon: Tag },
] as const;

type GiftFilterLabel = 'All Gift Picks' | (typeof GIFT_FILTERS)[number]['label'];

const GIFT_TAG_ROTATION: GiftProduct['giftTag'][] = [
  'Birthday Celebrations',
  'Christmas & Holiday Wonders',
  'Under $30 Sweet Spots',
  'Creative & Open Play',
  'STEM & Mind Boosters',
];

export default function GiftIdeasPage() {
  const [giftProducts, setGiftProducts] = useState<GiftProduct[]>(FALLBACK_GIFT_PRODUCTS);
  const [activeFilter, setActiveFilter] = useState<GiftFilterLabel>('All Gift Picks');

  useEffect(() => {
    let isMounted = true;

    async function fetchGiftProducts() {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        if (!res.ok) return;
        const json = await res.json();
        if (isMounted && json?.success && Array.isArray(json.data) && json.data.length > 0) {
          const topFive: GiftProduct[] = json.data
            .slice(0, 5)
            .map((item: ProductType, idx: number) => {
              const linkLower = (item.affiliateLink || '').toLowerCase();
              const retailer: 'AMAZON' | 'ALIEXPRESS' = linkLower.includes('aliexpress')
                ? 'ALIEXPRESS'
                : idx % 2 === 0
                  ? 'AMAZON'
                  : 'ALIEXPRESS';
              const giftTag =
                item.price !== null && item.price !== undefined && item.price > 0 && item.price <= 30
                  ? 'Under $30 Sweet Spots'
                  : GIFT_TAG_ROTATION[idx % GIFT_TAG_ROTATION.length];
              return {
                ...item,
                retailer,
                giftTag,
              };
            });
          setGiftProducts(topFive);
        }
      } catch {
        // Retain fallback curated gift recommendations when DB API is unreachable
      }
    }

    fetchGiftProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'All Gift Picks') return giftProducts;
    if (activeFilter === 'Under $30 Sweet Spots') {
      return giftProducts.filter(
        (p) => p.giftTag === 'Under $30 Sweet Spots' || (p.price !== null && p.price !== undefined && p.price <= 30)
      );
    }
    return giftProducts.filter((p) => p.giftTag === activeFilter);
  }, [giftProducts, activeFilter]);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#111111] py-10 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Back Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#737373] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* 1. Hero Banner (Top Section) */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#fdf1f5] via-[#faf9f6] to-[#fbe6ee] border border-[#efdce3] px-6 py-12 sm:px-12 sm:py-16 lg:py-20 shadow-[0_6px_30px_-10px_rgba(0,0,0,0.05)]">
          {/* Subtle Gift Icon in Top-Right Corner */}
          <Gift
            aria-hidden="true"
            className="w-14 h-14 sm:w-20 sm:h-20 text-[#cfa1b3]/35 absolute top-6 right-6 sm:top-8 sm:right-10 pointer-events-none stroke-[1.25]"
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#efdce3] text-[11px] sm:text-xs font-semibold tracking-[0.14em] uppercase text-[#111111] shadow-2xs mb-6">
              <span>🎁 MAGICAL GIFT IDEAS GUIDE</span>
            </div>

            {/* Large Serif Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#111111] leading-[1.12]">
              Unbox Pure Wonder &amp; Joy
            </h1>

            {/* Subheadline */}
            <p className="mt-5 text-base sm:text-lg text-[#525252] font-light leading-relaxed max-w-2xl">
              Find the perfect surprise for birthday parties, Christmas stockings, milestone celebrations, and everyday smiles. Curated with love, tested for wonder, and gentle on parent budgets.
            </p>

            {/* Metadata Row */}
            <p className="mt-7 text-xs sm:text-sm tracking-wide text-[#737373] font-medium">
              {giftProducts.length} Gift Recommendations Available &bull; Age-Appropriate &bull; Direct Affiliate Links
            </p>
          </div>
        </section>

        {/* 2. Filter Pills */}
        <section className="mt-12 sm:mt-14 pb-6 border-b border-[#e5e5e5]">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Active / All Gift Picks Pill */}
            <button
              type="button"
              onClick={() => setActiveFilter('All Gift Picks')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide border transition-all cursor-pointer ${
                activeFilter === 'All Gift Picks'
                  ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                  : 'bg-white text-[#525252] border-[#e5e5e5] hover:border-[#111111] hover:text-[#111111]'
              }`}
            >
              <span>All Gift Picks ({giftProducts.length})</span>
            </button>

            {/* Category Pills with Icons */}
            {GIFT_FILTERS.map(({ label, icon: Icon }) => {
              const isActive = activeFilter === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveFilter(label)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                      : 'bg-white text-[#525252] border-[#e5e5e5] hover:border-[#111111] hover:text-[#111111]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Product Grid */}
        <section className="mt-8 sm:mt-10">
          {/* Count Label */}
          <p className="text-xs sm:text-sm text-[#737373] font-light mb-6">
            Showing {filteredProducts.length} thoughtfully curated{' '}
            {filteredProducts.length === 1 ? 'gift idea' : 'gift ideas'}
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="group relative flex flex-col bg-white border border-[#e5e5e5]/80 rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_14px_30px_-8px_rgba(0,0,0,0.1)] transition-all duration-300"
                >
                  {/* Image Container with Retailer & Save 23% Badges */}
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

                    {/* Subtle Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Top-Left Badge: Colored AMAZON or ALIEXPRESS */}
                    <span
                      className={`absolute top-3.5 left-3.5 text-white text-[10px] tracking-[0.16em] uppercase font-semibold px-3 py-1 rounded-full shadow-xs z-10 ${
                        product.retailer === 'AMAZON' ? 'bg-[#ff9900]' : 'bg-[#e62e04]'
                      }`}
                    >
                      {product.retailer}
                    </span>

                    {/* Top-Right Badge: Green Save 23% */}
                    <span className="absolute top-3.5 right-3.5 bg-emerald-600 text-white text-[10px] tracking-[0.12em] uppercase font-semibold px-3 py-1 rounded-full shadow-xs z-10">
                      Save 23%
                    </span>
                  </Link>

                  {/* Product Content Details */}
                  <div className="p-5 flex flex-col flex-grow justify-between bg-white">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#737373]">
                        {product.category}
                      </span>

                      <div className="mt-1.5 flex items-baseline justify-between gap-2.5">
                        <Link
                          href={`/product/${product.id}`}
                          className="font-serif text-lg font-medium text-[#111111] group-hover:text-black line-clamp-1 hover:underline decoration-1 underline-offset-4"
                        >
                          {product.name}
                        </Link>
                        {product.price !== undefined && product.price !== null && product.price > 0 && (
                          <span className="font-serif text-base font-medium text-[#111111] shrink-0">
                            ${Number(product.price).toFixed(2)}
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-xs text-[#525252] leading-relaxed line-clamp-2 font-light">
                        {product.description}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-5 pt-4 border-t border-[#f2efe9] flex items-center justify-between gap-3">
                      <Link
                        href={`/product/${product.id}`}
                        className="text-xs text-[#737373] hover:text-[#111111] transition-colors font-medium"
                      >
                        View Details
                      </Link>

                      <a
                        href={product.affiliateLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wide text-white bg-[#111111] hover:bg-black rounded-full active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <span>Shop Gift</span>
                        <ExternalLink className="w-3 h-3 stroke-[1.75]" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white border border-[#e5e5e5] rounded-2xl p-8">
              <p className="font-serif text-xl text-[#111111]">
                No gift ideas matched &ldquo;{activeFilter}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter('All Gift Picks')}
                className="mt-5 px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors cursor-pointer"
              >
                Show All Gift Picks
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
