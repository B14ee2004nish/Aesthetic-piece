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
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] flex items-center justify-center overflow-hidden border-b border-[#e5e5e5]">
      {/* Background Home Decor Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-102"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85")',
        }}
      />

      {/* Atmospheric Editorial Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#fcfbf9] via-[#fcfbf9]/75 to-[#fcfbf9]/40 sm:bg-gradient-to-r sm:from-[#fcfbf9]/95 sm:via-[#fcfbf9]/80 sm:to-[#fcfbf9]/45 backdrop-blur-[1px]" />

      {/* Subtle organic warm tint */}
      <div className="absolute inset-0 bg-[#e8e4dc]/20 mix-blend-multiply pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center sm:text-left flex flex-col items-center sm:items-start">
        {/* Curated Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#e5e5e5] shadow-xs mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#8c7b6c]" />
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#525252]">
            Autumn / Winter Edit &middot; 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1a1a1a] leading-[1.15] max-w-3xl">
          Discover Beautiful Things That Make Life More Aesthetic.
        </h1>

        {/* Subheadline */}
        <p className="mt-5 text-base sm:text-lg text-[#525252] font-light leading-relaxed max-w-2xl">
          Explore thoughtfully selected products, stylish finds, and beautiful everyday essentials curated for the intentional sanctuary.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Solid Black Button: "Explore Products" */}
          <a
            href="#products-section"
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide text-white bg-[#1a1a1a] rounded-none hover:bg-black transition-all shadow-sm active:scale-[0.99] cursor-pointer"
          >
            Explore Products
          </a>

          {/* Outlined Button: "Discover Trending Finds" */}
          <a
            href="#categories-section"
            onClick={onTrendingClick}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide text-[#1a1a1a] bg-transparent border border-[#1a1a1a] rounded-none hover:bg-[#1a1a1a]/5 transition-all active:scale-[0.99] cursor-pointer"
          >
            Discover Trending Finds
          </a>
        </div>
      </div>
    </section>
  );
}
