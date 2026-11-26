import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';

const VALUES = [
  {
    icon: Compass,
    eyebrow: '01 · Form & Restraint',
    title: 'Intentional Design',
    description:
      'Every silhouette we select serves a quiet purpose—balancing organic textures, gentle proportions, and architectural calm so your rooms breathe naturally.',
  },
  {
    icon: ShieldCheck,
    eyebrow: '02 · Tactile Honesty',
    title: 'Verified Quality',
    description:
      'We prioritize enduring materials—matte stoneware, honed travertine, brushed brass, and washed European flax—evaluated for craftsmanship that deepens with age.',
  },
  {
    icon: Sparkles,
    eyebrow: '03 · Restful Spaces',
    title: 'Curated Aesthetics',
    description:
      'Rather than overwhelming catalogs, we assemble cohesive atmospheres where ambient light, sculptural vessels, and calming accents live together effortlessly.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#111111]">
      {/* 1. Full-Width Editorial Hero Section */}
      <section className="relative w-full min-h-[460px] sm:min-h-[540px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-102"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=85")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-24 sm:py-32 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#f5ece0]" />
            <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-white/95">
              Our Story &middot; Aesthetic Piece
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12] max-w-3xl">
            Curated Living, Crafted for Quiet Warmth
          </h1>

          <p className="mt-6 text-base sm:text-lg text-white/85 font-light leading-relaxed max-w-2xl">
            An editorial curation dedicated to timeless home decor, organic materials, and thoughtful everyday objects that turn houses into restful sanctuaries.
          </p>
        </div>
      </section>

      {/* 2. Two-Column Brand Story Section */}
      <section className="py-20 sm:py-28 border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Editorial Room Image */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#ece8e1] border border-[#e5e5e5] shadow-[0_20px_50px_-14px_rgba(0,0,0,0.14)]">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                  alt="Warm minimalist living room styled with natural textiles and sculptural accents"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Brand Philosophy Narrative */}
            <div className="lg:col-span-6 space-y-7">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#737373] font-semibold block mb-3">
                  The Philosophy
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#111111] leading-[1.16]">
                  Beauty Lives in the Quiet Details
                </h2>
              </div>

              <div className="space-y-5 text-base sm:text-lg text-[#525252] font-light leading-relaxed">
                <p>
                  Aesthetic Piece began with a simple conviction: the spaces we wake up to each morning quietly shape how we think, rest, and create. Rather than chasing fleeting trends, we seek out pieces with honest textures and enduring stillness.
                </p>
                <p>
                  From hand-finished fluted ceramic vessels and warm diffused table lamps to basalt stone water features and stonewashed European flax linens, every item in our edit is chosen to bring effortless tactile harmony to modern rooms.
                </p>
              </div>

              <div className="pt-6 border-t border-[#e5e5e5] flex flex-wrap items-center gap-8 text-xs uppercase tracking-[0.2em] text-[#737373]">
                <div>
                  <span className="block font-serif text-2xl text-[#111111] normal-case tracking-tight mb-0.5">
                    Handpicked
                  </span>
                  <span>Small-Batch Aesthetics</span>
                </div>
                <div className="h-8 w-px bg-[#e5e5e5]" />
                <div>
                  <span className="block font-serif text-2xl text-[#111111] normal-case tracking-tight mb-0.5">
                    Timeless
                  </span>
                  <span>Organic Earth Palette</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Values / Philosophy Cards Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#737373] font-semibold block mb-3">
              What Guides Every Edit
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#111111]">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((value) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl border border-[#e5e5e5] shadow-[0_8px_30px_-10px_rgba(0,0,0,0.06)] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
                >
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#faf9f6] border border-[#e5e5e5] mb-6">
                      <IconComponent className="w-5 h-5 text-[#111111] stroke-[1.6]" />
                    </div>
                    <span className="block text-[10px] uppercase tracking-[0.22em] text-[#8c7b6c] font-semibold mb-2">
                      {value.eyebrow}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-[#111111] tracking-tight mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#525252] font-light leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Bold Centered Call to Action */}
      <section className="pb-24 sm:pb-32 pt-4">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="bg-[#111111] text-white rounded-3xl px-8 sm:px-14 py-16 sm:py-20 text-center shadow-[0_24px_55px_-16px_rgba(17,17,17,0.35)] border border-[#262626]">
            <span className="inline-block text-[11px] uppercase tracking-[0.26em] text-[#c2b29d] font-medium mb-4">
              Begin Your Curation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white max-w-2xl mx-auto leading-[1.15]">
              Discover Pieces That Bring Calm to Every Room
            </h2>
            <p className="mt-5 text-sm sm:text-base text-[#a3a3a3] font-light max-w-xl mx-auto leading-relaxed">
              Browse our curated atmospheres—from sculptural ceramics and warm ambient lighting to natural linen essentials.
            </p>
            <div className="mt-9 flex justify-center">
              <Link
                href="/categories"
                className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-[#faf9f6] hover:bg-white text-[#111111] text-xs sm:text-sm uppercase tracking-[0.2em] font-medium transition-all shadow-lg active:scale-[0.98]"
              >
                <span>Explore Categories</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
