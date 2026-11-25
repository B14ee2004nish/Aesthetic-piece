import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#111111] py-14 sm:py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Back Link */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#737373] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Editorial About Card */}
        <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 sm:p-14 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faf9f6] border border-[#e5e5e5] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#8c7b6c]" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#525252] font-medium">
                Our Philosophy
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#111111] leading-[1.14]">
              Curated Living &amp; Intentional Style
            </h1>
          </div>

          <div className="space-y-5 text-base sm:text-lg text-[#525252] font-light leading-relaxed">
            <p>
              Aesthetic Piece is an editorial home decor guide dedicated to quiet warmth, sculptural forms, and thoughtful everyday objects that turn houses into restful sanctuaries.
            </p>
            <p>
              Every vase, ambient lamp, travertine vessel, and European linen textile featured in our collection is handpicked for tactile balance, timeless materials, and effortless styling across modern living spaces.
            </p>
          </div>

          <div className="pt-6 border-t border-[#e5e5e5] flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-sm"
            >
              <span>Browse Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-[#e5e5e5] hover:border-[#111111] text-[#111111] text-xs uppercase tracking-[0.2em] font-medium transition-all"
            >
              <span>Explore Collection</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
