'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick?: () => void;
  onTrendingClick?: () => void;
}

export default function Hero({ onExploreClick, onTrendingClick }: HeroProps) {
  return (
    <section className="relative w-full min-h-[600px] sm:min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* Full-Width Background Home Decor Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-102"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85")',
        }}
      />

      {/* Soft Dark Gradient Overlay for Crisp White Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />

      {/* Centered Editorial Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-24 sm:py-32 text-center flex flex-col items-center">
        {/* Curated Season Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-md mb-7">
          <Sparkles className="w-3.5 h-3.5 text-[#f5ece0]" />
          <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-white/95">
            Autumn / Winter Edit &middot; 2026
          </span>
        </div>

        {/* Centered Serif Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12] max-w-3xl drop-shadow-xs">
          Discover Beautiful Things That Make Life More Aesthetic.
        </h1>

        {/* Centered Subheadline */}
        <p className="mt-6 text-base sm:text-lg text-white/85 font-light leading-relaxed max-w-2xl">
          Explore thoughtfully selected products, stylish finds, and beautiful everyday essentials curated for the intentional sanctuary.
        </p>

        {/* Modern Pill-Shaped CTA Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#products-section"
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 text-sm font-medium tracking-wide text-[#111111] bg-[#faf9f6] rounded-full hover:bg-white transition-all shadow-lg active:scale-[0.98] cursor-pointer"
          >
            Explore Products
          </a>

          <a
            href="#products-section"
            onClick={onTrendingClick}
            className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 text-sm font-medium tracking-wide text-white bg-white/10 backdrop-blur-md border border-white/40 rounded-full hover:bg-white/20 transition-all active:scale-[0.98] cursor-pointer"
          >
            Discover Trending Finds
          </a>
        </div>
      </div>
    </section>
  );
}
