'use client';

import React, { useState } from 'react';
import ProductCard, { ProductType } from './ProductCard';
import { SlidersHorizontal, Sparkles, Filter } from 'lucide-react';

interface ProductGridProps {
  products: ProductType[];
  isLoading?: boolean;
  activeCategory?: string;
  onCategoryFilterChange?: (category: string) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
  onQuickView?: (product: ProductType) => void;
  onProductClick?: (productId: string) => void;
}

export default function ProductGrid({
  products = [],
  isLoading = false,
  activeCategory = 'All',
  onCategoryFilterChange,
  wishlistIds = [],
  onToggleWishlist,
  onQuickView,
  onProductClick,
}: ProductGridProps) {
  const [selectedSort, setSelectedSort] = useState<'featured' | 'newest' | 'price-low' | 'price-high'>('featured');

  // Extract unique categories for filter bar
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  // Filter
  const filteredProducts = products.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === 'featured') {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
    if (selectedSort === 'price-low') {
      return (a.price || 0) - (b.price || 0);
    }
    if (selectedSort === 'price-high') {
      return (b.price || 0) - (a.price || 0);
    }
    return 0; // default newest
  });

  return (
    <section id="products-section" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#e5e5e5]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#737373] font-semibold">
            Catalog &middot; Collection 2026
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1a1a] font-normal mt-1">
            Curated Home Objects
          </h2>
          <p className="mt-2 text-sm text-[#737373] font-light max-w-lg">
            Each item is verified for craftsmanship, organic materials, and timeless aesthetic restraint.
          </p>
        </div>

        {/* Filter Chips / Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#f4f2ee] rounded-none border border-[#e5e5e5]">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryFilterChange?.(cat)}
                className={`px-3 py-1.5 text-xs tracking-wide transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-[#1a1a1a] font-medium shadow-2xs border border-[#e5e5e5]'
                    : 'text-[#525252] hover:text-[#1a1a1a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value as any)}
            className="text-xs bg-white border border-[#e5e5e5] px-3 py-2 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] cursor-pointer"
          >
            <option value="featured">Sort: Featured</option>
            <option value="newest">Sort: Latest Additions</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse bg-white border border-[#e5e5e5]">
              <div className="aspect-[4/5] bg-[#ece9e2]" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-[#e5e5e5] w-1/4" />
                <div className="h-5 bg-[#e5e5e5] w-3/4" />
                <div className="h-3 bg-[#e5e5e5] w-full" />
                <div className="h-8 bg-[#e5e5e5] w-1/2 pt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : sortedProducts.length === 0 ? (
        /* Empty State */
        <div className="mt-16 py-20 text-center bg-white border border-dashed border-[#e5e5e5] p-8">
          <p className="font-serif text-xl text-[#1a1a1a]">No pieces found matching this filter</p>
          <p className="mt-2 text-sm text-[#737373]">Try selecting &apos;All&apos; or reset your search criteria.</p>
          <button
            type="button"
            onClick={() => onCategoryFilterChange?.('All')}
            className="mt-6 px-6 py-2.5 text-xs uppercase tracking-wider text-white bg-[#1a1a1a] hover:bg-black transition-colors"
          >
            Show All Products
          </button>
        </div>
      ) : (
        /* The Responsive Grid Required: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 */
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      )}

      {/* Grid Summary Footer */}
      {!isLoading && sortedProducts.length > 0 && (
        <div className="mt-12 text-center text-xs tracking-wider text-[#a3a3a3] uppercase">
          Displaying {sortedProducts.length} of {products.length} Curated Items
        </div>
      )}
    </section>
  );
}
