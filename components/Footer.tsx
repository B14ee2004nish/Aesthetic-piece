'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Music2,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-[#ededed] border-t border-[#2a2a2a] pt-20 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#333333]">
          {/* Brand Philosophy & Contact Info */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl sm:text-3xl text-white tracking-tight">
                  Aesthetic Piece
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c2b29d]" />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#a3a3a3] mt-1">
                Curated Living & Style
              </p>
              <p className="mt-5 text-sm text-[#a3a3a3] font-light leading-relaxed max-w-sm">
                A design curation dedicated to organic warmth, sculptural ceramics, calming water features, and timeless everyday essentials for spaces of quiet mindfulness.
              </p>

              {/* Contact Info */}
              <div className="mt-6 space-y-2.5 text-sm text-[#d4d4d4] font-light">
                <a
                  href="mailto:modernstyle2026@gmail.com"
                  className="flex items-center gap-2.5 hover:text-white transition-colors w-fit"
                >
                  <Mail className="w-4 h-4 text-[#c2b29d] shrink-0" />
                  <span>modernstyle2026@gmail.com</span>
                </a>
                <a
                  href="tel:03390002230"
                  className="flex items-center gap-2.5 hover:text-white transition-colors w-fit"
                >
                  <Phone className="w-4 h-4 text-[#c2b29d] shrink-0" />
                  <span>03390002230</span>
                </a>
              </div>

              {/* Social Media Links */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://instagram.com/aestheticpiece"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1d1d1d] border border-[#333333] text-[#d4d4d4] hover:bg-[#faf9f6] hover:text-[#111111] hover:border-[#faf9f6] transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com/aestheticpiece"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1d1d1d] border border-[#333333] text-[#d4d4d4] hover:bg-[#faf9f6] hover:text-[#111111] hover:border-[#faf9f6] transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://tiktok.com/@aestheticpiece"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  title="TikTok"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1d1d1d] border border-[#333333] text-[#d4d4d4] hover:bg-[#faf9f6] hover:text-[#111111] hover:border-[#faf9f6] transition-all"
                >
                  <Music2 className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-[#737373]">
              <Sparkles className="w-4 h-4 text-[#c2b29d]" />
              <span>Built with Next.js 14, Prisma ORM, and SQLite.</span>
            </div>
          </div>

          {/* Curated Categories */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-medium mb-4">
              Atmospheres
            </h4>
            <ul className="space-y-2.5 text-sm text-[#a3a3a3] font-light">
              <li>
                <Link href="/category/lighting-lamps" className="hover:text-white transition-colors">
                  Lighting & Lamps
                </Link>
              </li>
              <li>
                <Link href="/category/vases-vessels" className="hover:text-white transition-colors">
                  Vases & Vessels
                </Link>
              </li>
              <li>
                <Link href="/category/textiles-throws" className="hover:text-white transition-colors">
                  Textiles & Throws
                </Link>
              </li>
              <li>
                <Link href="/category/mirrors-wall-decor" className="hover:text-white transition-colors">
                  Mirrors & Wall Decor
                </Link>
              </li>
              <li>
                <Link href="/category/candles-scents" className="hover:text-white transition-colors">
                  Candles & Scents
                </Link>
              </li>
              <li>
                <Link href="/category/decor-accents" className="hover:text-white transition-colors">
                  Decor Accents & Water Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial Newsletter */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-medium mb-4">
              The Sunday Curation
            </h4>
            <p className="text-sm text-[#a3a3a3] font-light leading-relaxed mb-4">
              Receive a weekly digest featuring three handpicked home decor pieces, artisan studio spotlights, and mindful styling notes.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <input
                type="email"
                placeholder="your.email@domain.com"
                className="w-full bg-[#262626] border border-[#404040] text-sm text-white px-4 py-2.5 placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-[#1a1a1a] px-5 py-2.5 text-xs uppercase tracking-wider font-medium hover:bg-[#e5e5e5] transition-colors whitespace-nowrap cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#737373] font-light gap-4">
          <p>&copy; {new Date().getFullYear()} Aesthetic Piece. All rights reserved. Curated living and editorial design.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-[#a3a3a3] hover:text-white transition-colors">
              Admin & Manage
            </Link>
            <Link href="/" className="text-[#a3a3a3] hover:text-white transition-colors">
              Privacy & Editorial Standards
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
