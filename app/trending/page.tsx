'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ChevronDown } from 'lucide-react';
import type { ProductType } from '@/components/ProductCard';

const FALLBACK_TRENDING_PRODUCTS: ProductType[] = [
  {
    id: 'prod_hd_1',
    name: 'Decorative Vases',
    category: 'Vases & Vessels',
    description:
      'Sculptural fluted ceramic vessel with a matte chalk finish, designed for displaying dry stems or making a quiet architectural statement on consoles.',
    imageUrl:
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    affiliateLink:
      'https://www.amazon.com/s?k=decorative+vases+home+decor&tag=aestheticpiece-20',
    price: 68.0,
    featured: true,
    createdAt: '2026-11-20T10:00:00.000Z',
  },
  {
    id: 'prod_3',
    name: 'Dome Mushroom Lamp',
    category: 'Lighting & Lamps',
    description:
      'Mid-century modern dome table lamp with warm ambient diffused LED illumination, featuring a weighted metal base and matte cashmere lacquer.',
    imageUrl:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/dome-mushroom-lamp',
    price: 120.0,
    featured: true,
    createdAt: '2026-11-19T10:00:00.000Z',
  },
  {
    id: 'prod_6',
    name: 'Linen Cushions',
    category: 'Textiles & Throws',
    description:
      'Washed French flax linen throw pillow covers with raw frayed fringe detailing and plush cruelty-free down-alternative feather inserts.',
    imageUrl:
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/linen-cushions',
    price: 48.0,
    featured: true,
    createdAt: '2026-11-18T10:00:00.000Z',
  },
  {
    id: 'prod_2',
    name: 'Fluted Ceramic Vase',
    category: 'Vases & Vessels',
    description:
      'Sculptural ribbed ceramic vessel with an unglazed matte chalk finish, designed to display dry florals or make a quiet statement.',
    imageUrl:
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/fluted-ceramic-vase',
    price: 58.0,
    featured: true,
    createdAt: '2026-11-17T10:00:00.000Z',
  },
  {
    id: 'prod_hd_3',
    name: 'Decorative Lamps',
    category: 'Lighting & Lamps',
    description:
      'Warm ambient diffused table luminaire crafted with satin cashmere lacquer for soft evening illumination in living spaces.',
    imageUrl:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    affiliateLink:
      'https://www.amazon.com/s?k=decorative+mushroom+table+lamps&tag=aestheticpiece-20',
    price: 110.0,
    featured: true,
    createdAt: '2026-11-16T10:00:00.000Z',
  },
  {
    id: 'prod_10',
    name: 'Flax Linen Sheets',
    category: 'Textiles & Throws',
    description:
      'Stonewashed breathable pure European flax sheet set with an effortless lived-in drape that softens with every wash.',
    imageUrl:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/flax-linen-sheets',
    price: 260.0,
    featured: false,
    createdAt: '2026-11-15T10:00:00.000Z',
  },
  {
    id: 'prod_5',
    name: 'Arched Brass Mirror',
    category: 'Mirrors & Wall Decor',
    description:
      'Slim antique brass arched mantle mirror crafted from iron and distortion-free hand-finished glass, catching natural light across entryways.',
    imageUrl:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/arched-brass-mirror',
    price: 240.0,
    featured: true,
    createdAt: '2026-11-14T10:00:00.000Z',
  },
  {
    id: 'prod_9',
    name: 'Travertine Candle',
    category: 'Candles & Scents',
    description:
      'Hand-poured natural soy wax candle housed in a heavy solid honed beige travertine vessel with notes of sandalwood and cardamom.',
    imageUrl:
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/travertine-candle',
    price: 72.0,
    featured: true,
    createdAt: '2026-11-13T10:00:00.000Z',
  },
  {
    id: 'prod_12',
    name: 'Travertine Tray',
    category: 'Decor Accents',
    description:
      'Carved raw natural beige travertine stone vanity tray with smooth rounded beveled edges for coffee table or console styling.',
    imageUrl:
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/travertine-tray',
    price: 88.0,
    featured: true,
    createdAt: '2026-11-12T10:00:00.000Z',
  },
];

const FILTER_OPTIONS = ['All Trending', 'Vases', 'Lighting', 'Textiles'] as const;
type FilterOption = (typeof FILTER_OPTIONS)[number];
type SortOption = 'popular' | 'newest';

export default function TrendingPage() {
  const [products, setProducts] = useState<ProductType[]>(FALLBACK_TRENDING_PRODUCTS);
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All Trending');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  useEffect(() => {
    let isMounted = true;

    async function fetchTrendingProducts() {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        if (!res.ok) return;
        const json = await res.json();
        if (isMounted && json?.success && Array.isArray(json.data) && json.data.length > 0) {
          setProducts(json.data);
        }
      } catch {
        // Keep fallback curated products if database API is unavailable
      }
    }

    fetchTrendingProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((item) => {
      if (activeFilter === 'All Trending') return true;
      const combined = `${item.name} ${item.category} ${item.description}`.toLowerCase();
      if (activeFilter === 'Vases') {
        return combined.includes('vase') || combined.includes('vessel') || combined.includes('planter');
      }
      if (activeFilter === 'Lighting') {
        return combined.includes('light') || combined.includes('lamp');
      }
      if (activeFilter === 'Textiles') {
        return (
          combined.includes('textile') ||
          combined.includes('linen') ||
          combined.includes('cushion') ||
          combined.includes('throw') ||
          combined.includes('sheet')
        );
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'newest') {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      }
      // 'popular': prioritize featured picks first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, activeFilter, sortBy]);

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
        <section className="rounded-3xl bg-gradient-to-br from-[#fdf3ea] via-[#faf9f6] to-[#f8e7d8] border border-[#eadfd3] px-6 py-12 sm:px-12 sm:py-16 lg:py-20 shadow-[0_6px_30px_-10px_rgba(0,0,0,0.05)]">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-[#eadfd3] text-xs font-medium tracking-wide text-[#111111] shadow-2xs mb-6">
              <span>🔥 Trending Curations</span>
            </div>

            {/* Large Serif Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#111111] leading-[1.12]">
              What&apos;s Hot Right Now
            </h1>

            {/* Subheadline */}
            <p className="mt-5 text-base sm:text-lg text-[#525252] font-light leading-relaxed max-w-2xl">
              Discover the most-loved, best-reviewed, and highest-demand pieces inspiring intentional living right now.
            </p>

            {/* Trust Row */}
            <p className="mt-7 text-xs sm:text-sm tracking-wide text-[#737373] font-medium">
              Updated Daily &bull; Verified Retailer Picks &bull; Curator Approved
            </p>
          </div>
        </section>

        {/* 2. Filter and Sort Bar */}
        <section className="mt-12 sm:mt-14 pb-6 border-b border-[#e5e5e5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left: Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5">
            {FILTER_OPTIONS.map((option) => {
              const isActive = activeFilter === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setActiveFilter(option)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                      : 'bg-white text-[#525252] border-[#e5e5e5] hover:border-[#111111] hover:text-[#111111]'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Right: Sort Dropdown */}
          <div className="relative self-start sm:self-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Sort trending products"
              className="appearance-none bg-white border border-[#e5e5e5] rounded-full pl-5 pr-10 py-2.5 text-xs sm:text-sm font-medium text-[#111111] focus:outline-none focus:border-[#111111] transition-colors cursor-pointer shadow-2xs"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest Arrivals</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#737373] pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </section>

        {/* 3. Product Grid */}
        <section className="mt-10 sm:mt-12">
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedProducts.map((product) => (
                <article
                  key={product.id}
                  className="group relative flex flex-col bg-white border border-[#e5e5e5]/80 rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_14px_30px_-8px_rgba(0,0,0,0.1)] transition-all duration-300"
                >
                  {/* Image Container with Top-Left & Top-Right Badges */}
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

                    {/* Subtle hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Top-Left Badge: Trending */}
                    <span className="absolute top-3.5 left-3.5 bg-[#111111]/90 backdrop-blur-xs text-white text-[10px] tracking-[0.18em] uppercase font-medium px-3 py-1 rounded-full z-10">
                      Trending
                    </span>

                    {/* Top-Right Badge: Save 20% */}
                    <span className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-xs text-[#111111] border border-[#e5e5e5] text-[10px] tracking-[0.14em] uppercase font-semibold px-3 py-1 rounded-full shadow-xs z-10">
                      Save 20%
                    </span>
                  </Link>

                  {/* Product Details */}
                  <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#737373]">
                        {product.category}
                      </span>

                      <div className="mt-1.5 flex items-baseline justify-between gap-3">
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

                      <p className="mt-2.5 text-xs text-[#525252] leading-relaxed line-clamp-2 font-light">
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
                        <span>Shop Now</span>
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
                No trending pieces found for &ldquo;{activeFilter}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter('All Trending')}
                className="mt-5 px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors cursor-pointer"
              >
                Show All Trending
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
