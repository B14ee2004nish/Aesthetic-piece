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
    <article className="group relative flex flex-col bg-white border border-[#e5e5e5] hover:border-[#1a1a1a] transition-all duration-300">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Featured Tag */}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-[#1a1a1a] text-white text-[10px] tracking-[0.18em] uppercase font-semibold px-2.5 py-1 z-10">
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
            className="absolute bottom-3 left-3 right-3 py-2.5 bg-white/95 backdrop-blur-sm text-[#1a1a1a] text-xs font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#1a1a1a] hover:text-white text-center cursor-pointer shadow-sm z-10"
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
        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer z-20 ${
          isWishlisted
            ? 'bg-[#1a1a1a] text-white'
            : 'bg-white/85 text-[#1a1a1a] hover:bg-white hover:text-red-600'
        }`}
      >
        <Heart
          className={`w-4 h-4 ${isWishlisted ? 'fill-white stroke-white' : 'stroke-[1.75]'}`}
        />
      </button>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Category Label */}
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#737373]">
            {product.category}
          </span>

          {/* Clickable Product Title */}
          <Link
            href={`/product/${product.id}`}
            onClick={handleCardClick}
            className="block font-serif text-lg font-medium text-[#1a1a1a] mt-1 group-hover:text-black line-clamp-1 hover:underline decoration-1 underline-offset-2"
          >
            {product.name}
          </Link>

          {/* Description Preview */}
          <p className="mt-2 text-xs text-[#525252] leading-relaxed line-clamp-2 font-light">
            {product.description}
          </p>
        </div>

        {/* Footer info: Price & Affiliate Link CTA */}
        <div className="mt-5 pt-4 border-t border-[#f0ede6] flex items-center justify-between gap-3">
          {product.price !== undefined && product.price !== null && product.price > 0 ? (
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#a3a3a3]">Guide Price</span>
              <span className="font-serif text-base font-medium text-[#1a1a1a]">
                ${Number(product.price).toFixed(2)}
              </span>
            </div>
          ) : (
            <div className="text-xs text-[#737373] italic">Curated Piece</div>
          )}

          {/* Affiliate Outbound Link */}
          <a
            href={product.affiliateLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wide text-white bg-[#1a1a1a] hover:bg-black active:scale-[0.98] transition-all rounded-none cursor-pointer"
          >
            <span>Shop Now</span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[1.75]" />
          </a>
        </div>
      </div>
    </article>
  );
}
