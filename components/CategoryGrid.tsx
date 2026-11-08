'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface CategoryItem {
  id?: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  itemCount?: number;
}

export const defaultCategories: CategoryItem[] = [
  {
    name: 'Lighting & Lamps',
    slug: 'lighting-lamps',
    description: 'Sculptural table luminaires & ambient glows',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    itemCount: 4,
  },
  {
    name: 'Vases & Vessels',
    slug: 'vases-vessels',
    description: 'Hand-fluted ceramics & tactile pottery',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    itemCount: 6,
  },
  {
    name: 'Textiles & Throws',
    slug: 'textiles-throws',
    description: 'French flax linen & fringed pillows',
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    itemCount: 5,
  },
  {
    name: 'Mirrors & Wall Decor',
    slug: 'mirrors-wall-decor',
    description: 'Antique brass arches & plaster reliefs',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    itemCount: 3,
  },
  {
    name: 'Candles & Scents',
    slug: 'candles-scents',
    description: 'Solid travertine stone & botanical soy wax',
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    itemCount: 4,
  },
  {
    name: 'Decor Accents',
    slug: 'decor-accents',
    description: 'Zen stone fountains & carved trays',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    itemCount: 8,
  },
];

interface CategoryGridProps {
  categories?: CategoryItem[];
  onCategorySelect?: (slug: string) => void;
}

export default function CategoryGrid({
  categories = defaultCategories,
  onCategorySelect,
}: CategoryGridProps) {
  return (
    <section id="categories-section" className="py-16 sm:py-24 border-b border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#e5e5e5]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#737373] font-semibold">
              Browse Curations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a1a] font-normal mt-1">
              Curated by Atmosphere
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-sm text-[#737373] max-w-md font-light">
            Intentional categories designed to bring warmth, texture, and organic composure to every room.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              onClick={() => onCategorySelect?.(category.slug)}
              className="group flex flex-col overflow-hidden bg-white border border-[#e5e5e5] rounded-none hover:border-[#1a1a1a] transition-all duration-300"
            >
              {/* Image Container with Editorial Zoom */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#f0ede6]">
                <img
                  src={category.imageUrl || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'}
                  alt={category.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />

                {/* Arrow Icon Indicator */}
                <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1a1a1a] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Text Meta */}
              <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-medium text-[#1a1a1a] group-hover:text-black line-clamp-1">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="mt-1 text-[11px] text-[#737373] line-clamp-1 font-light hidden sm:block">
                      {category.description}
                    </p>
                  )}
                </div>
                <div className="mt-2 pt-2 border-t border-[#f5f5f5] flex items-center justify-between text-[11px] text-[#8c827a]">
                  <span>Explore items</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
