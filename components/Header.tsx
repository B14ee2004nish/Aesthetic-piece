'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShieldCheck, Menu, X } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-[#faf9f6]/92 backdrop-blur-md border-b border-[#e5e5e5] transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-24">
          {/* Logo & Tagline */}
          <div className="flex flex-col">
            <Link href="/" className="group inline-flex items-baseline gap-2.5">
              <span className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#111111] transition-colors group-hover:text-black">
                Aesthetic Piece
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#111111]" />
            </Link>
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#737373] font-medium mt-1">
              Curated Living & Style
            </span>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-10 text-sm tracking-wide text-[#525252]">
            <Link
              href="/"
              className="text-[#111111] font-medium transition-colors hover:text-black"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="hover:text-[#111111] transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="hover:text-[#111111] transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Right Action Icons & Admin CTA */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search Icon */}
            <button
              type="button"
              onClick={onSearchClick}
              aria-label="Search curated decor"
              className="p-2.5 rounded-full text-[#111111] hover:bg-[#efede8] transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5 stroke-[1.6]" />
            </button>

            {/* Heart / Wishlist Icon */}
            <button
              type="button"
              onClick={onWishlistClick}
              aria-label="View saved pieces"
              className="relative p-2.5 rounded-full text-[#111111] hover:bg-[#efede8] transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5 stroke-[1.6]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-semibold text-white bg-[#111111] rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Admin Button */}
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium tracking-wide text-[#111111] bg-white border border-[#e5e5e5] rounded-full shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 opacity-70" />
              <span className="hidden sm:inline">Admin & Manage</span>
              <span className="sm:hidden">Admin</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-full text-[#111111] hover:bg-[#efede8] transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[#e5e5e5] flex flex-col gap-3 text-sm text-[#525252]">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 text-[#111111] font-medium"
            >
              Home
            </Link>
            <Link
              href="/categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#111111]"
            >
              Categories
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#111111]"
            >
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
