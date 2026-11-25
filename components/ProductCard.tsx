'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ExternalLink, ArrowUpRight } from 'lucide-react';

export interface ProductType {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  affiliateLink: string;
  price?: number | null;
  featured?: boolean;
  categoryId?: string | null;
  rating?: number;
  reviews?: number;
  createdAt?: string | Date;
}

interface ProductCardProps {
  product: ProductType;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  onQuickView?: (product: ProductType) => void;
  onProductClick?: (productId: string) => void;
}

export default function ProductCard({
  product,
  isWishlisted = false,
  onToggleWishlist,
  onQuickView,
  onProductClick,
}: ProductCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    if (onProductClick) {
      e.preventDefault();
      onProductClick(product.id);
    }
  };

  return (
    <article className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_14px_30px_-8px_rgba(0,0,0,0.1)] transition-all duration-300">
      {/* Clickable Image Container */}
      <Link
        href={`/product/${product.id}`}
        onClick={handleCardClick}
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

        {/* Featured Tag */}
        {product.featured && (
          <div className="absolute top-3.5 left-3.5 bg-[#111111]/90 backdrop-blur-xs text-white text-[10px] tracking-[0.18em] uppercase font-medium px-3 py-1 rounded-full z-10">
            Featured Pick
          </div>
        )}

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-3.5 left-3.5 right-3.5 py-2.5 rounded-full bg-white/95 backdrop-blur-sm text-[#111111] text-xs font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#111111] hover:text-white text-center cursor-pointer shadow-sm z-10"
          >
            Quick View
          </button>
        )}
      </Link>

      {/* Wishlist Heart Button (Placed outside Link to prevent accidental navigation) */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleWishlist?.(product.id);
        }}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer z-20 ${
          isWishlisted
            ? 'bg-[#111111] text-white'
            : 'bg-white/85 text-[#111111] hover:bg-white hover:text-red-600'
        }`}
      >
        <Heart
          className={`w-4 h-4 ${isWishlisted ? 'fill-white stroke-white' : 'stroke-[1.6]'}`}
        />
      </button>

      {/* Product Content Details */}
      <div className="p-6 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Category Label */}
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#737373]">
            {product.category}
          </span>

          {/* Aligned Title & Price */}
          <div className="mt-1.5 flex items-baseline justify-between gap-3">
            <Link
              href={`/product/${product.id}`}
              onClick={handleCardClick}
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

          {/* Description Preview */}
          <p className="mt-2.5 text-xs text-[#525252] leading-relaxed line-clamp-2 font-light">
            {product.description}
          </p>
        </div>

        {/* Footer CTA */}
        <div className="mt-5 pt-4 border-t border-[#f2efe9] flex items-center justify-between gap-3">
          <Link
            href={`/product/${product.id}`}
            onClick={handleCardClick}
            className="text-xs text-[#737373] hover:text-[#111111] transition-colors font-medium"
          >
            View Details
          </Link>

          <a
            href={product.affiliateLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wide text-white bg-[#111111] hover:bg-black rounded-full active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Shop Now</span>
            <ExternalLink className="w-3 h-3 stroke-[1.75]" />
          </a>
        </div>
      </div>
    </article>
  );
}
