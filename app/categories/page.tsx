import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import prisma from '@/lib/prisma';
import { defaultCategories, CategoryItem } from '@/components/CategoryGrid';

export const dynamic = 'force-dynamic';

async function getCategories(): Promise<CategoryItem[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    if (categories && categories.length > 0) {
      return categories.map((c: any) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        imageUrl: c.imageUrl,
        affiliateLink: c.affiliateLink,
      }));
    }
  } catch (error) {
    console.warn('Prisma categories query failed, using defaults:', error);
  }
  return defaultCategories;
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#111111] py-14 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Breadcrumb */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#737373] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Standalone Large Heading */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#737373] font-semibold block mb-3">
            Aesthetic Piece &middot; Full Directory
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#111111] leading-[1.12]">
            Browse Categories
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] font-light leading-relaxed">
            Explore every curated atmosphere—from sculptural ceramics and warm ambient lighting to tactile European flax textiles.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug || category.id}
              href={`/category/${category.slug}`}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#ece8e1] shadow-[0_6px_24px_-6px_rgba(0,0,0,0.08)] flex items-end p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_14px_32px_-8px_rgba(0,0,0,0.16)]"
            >
              <img
                src={
                  category.imageUrl ||
                  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
                }
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/15 group-hover:from-black/80 transition-colors" />

              <div className="relative z-10 w-full">
                <div className="flex items-end justify-between gap-2">
                  <h2 className="font-serif text-lg sm:text-xl font-normal text-white leading-snug">
                    {category.name}
                  </h2>
                  <ArrowRight className="w-4 h-4 text-white/80 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                {category.description && (
                  <p className="mt-1.5 text-xs text-white/75 font-light line-clamp-2 hidden sm:block">
                    {category.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
