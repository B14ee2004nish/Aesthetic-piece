'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShieldCheck, Sparkles, X } from 'lucide-react';

interface HeaderProps {
  wishlistCount?: number;
  onSearchClick?: () => void;
  onWishlistClick?: () => void;
}

export default function Header({
  wishlistCount = 0,
  onSearchClick,
  onWishlistClick,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#fcfbf9]/90 backdrop-blur-md border-b border-[#e5e5e5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Tagline */}
          <div className="flex flex-col">
            <Link href="/" className="group inline-flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1a1a1a] transition-colors group-hover:text-black">
                Aesthetic Piece
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" />
            </Link>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#737373] font-medium mt-0.5">
              Curated Living & Style
            </span>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide text-[#525252]">
            <Link
              href="/"
              className="text-[#1a1a1a] font-medium transition-colors hover:text-black"
            >
              Collection
            </Link>
            <Link
              href="/category/lighting-lamps"
              className="hover:text-[#1a1a1a] transition-colors"
            >
              Lighting
            </Link>
            <Link
              href="/category/vases-vessels"
              className="hover:text-[#1a1a1a] transition-colors"
            >
              Ceramics
            </Link>
            <Link
              href="/category/textiles-throws"
              className="hover:text-[#1a1a1a] transition-colors"
            >
              Textiles
            </Link>
            <Link
              href="/category/decor-accents"
              className="hover:text-[#1a1a1a] transition-colors"
            >
              Accents
            </Link>
          </nav>

          {/* Right Action Icons & Admin CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Icon */}
            <button
              type="button"
              onClick={onSearchClick}
              aria-label="Search curated decor"
              className="p-2.5 rounded-full text-[#1a1a1a] hover:bg-[#f0ede6] transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
            </button>

            {/* Heart / Wishlist Icon */}
            <button
              type="button"
              onClick={onWishlistClick}
              aria-label="View saved pieces"
              className="relative p-2.5 rounded-full text-[#1a1a1a] hover:bg-[#f0ede6] transition-colors cursor-pointer"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-semibold text-white bg-[#1a1a1a] rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Admin & Manage Button */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium tracking-wide text-[#1a1a1a] bg-white border border-[#e5e5e5] rounded-full shadow-xs hover:bg-[#f5f3ef] hover:border-[#d4d4d4] transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#737373]" />
              <span>Admin & Manage</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
