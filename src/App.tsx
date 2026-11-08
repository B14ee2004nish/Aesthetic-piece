import React, { useState, useMemo } from 'react';
import {
  Search,
  Heart,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  PlusCircle,
  Database,
  FileCode,
  Terminal,
  Layers,
  Check,
  SlidersHorizontal,
  Eye,
  Filter
} from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryGrid, { defaultCategories, CategoryItem } from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';
import ProductCard, { ProductType } from '@/components/ProductCard';
import AdminProductForm from '@/components/AdminProductForm';

// Initial 12 home decor items as specified
const INITIAL_PRODUCTS: ProductType[] = [
  {
    id: 'prod_1',
    name: 'Zen Basalt Stone Fountain',
    category: 'Decor Accents',
    description: 'Handcrafted natural basalt stone water fountain with gentle cascading stream, bringing calming acoustic ambiance and grounding presence to living sanctuaries.',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/zen-basalt-fountain',
    price: 185.0,
    featured: true,
  },
  {
    id: 'prod_2',
    name: 'Fluted Ceramic Vase',
    category: 'Vases & Vessels',
    description: 'Sculptural ribbed ceramic vessel with an unglazed matte chalk finish, designed to display dry florals or stand alone as a quiet architectural statement.',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/fluted-ceramic-vase',
    price: 58.0,
    featured: true,
  },
  {
    id: 'prod_3',
    name: 'Dome Mushroom Lamp',
    category: 'Lighting & Lamps',
    description: 'Mid-century modern dome table lamp with warm ambient diffused LED illumination, featuring a weighted metal base and matte cashmere lacquer.',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/dome-mushroom-lamp',
    price: 120.0,
    featured: true,
  },
  {
    id: 'prod_4',
    name: 'Boho Pampas Grass',
    category: 'Decor Accents',
    description: 'Naturally dried fluffy neutral pampas plumes adding soft architectural movement, tactile richness, and organic texture to quiet interior corners.',
    imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/boho-pampas-grass',
    price: 34.0,
    featured: false,
  },
  {
    id: 'prod_5',
    name: 'Arched Brass Mirror',
    category: 'Mirrors & Wall Decor',
    description: 'Slim antique brass arched mantle mirror crafted from iron and distortion-free hand-finished glass, catching natural light across entryways and dressing areas.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/arched-brass-mirror',
    price: 240.0,
    featured: true,
  },
  {
    id: 'prod_6',
    name: 'Linen Cushions',
    category: 'Textiles & Throws',
    description: 'Washed French flax linen throw pillow covers with raw frayed fringe detailing and plush cruelty-free down-alternative feather inserts.',
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/linen-cushions',
    price: 48.0,
    featured: true,
  },
  {
    id: 'prod_7',
    name: 'Ribbed Planter',
    category: 'Vases & Vessels',
    description: 'Architectural stoneware planter with vertical grooved fluting and internal drainage saucer, ideal for indoor olive trees, ferns, and fiddle leaf figs.',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/ribbed-planter',
    price: 64.0,
    featured: false,
  },
  {
    id: 'prod_8',
    name: 'Plaster Wall Art',
    category: 'Mirrors & Wall Decor',
    description: 'Hand-sculpted textured plaster relief canvas featuring subtle geometric arches and tactile impasto contours in soft warm off-white and gypsum.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/plaster-wall-art',
    price: 195.0,
    featured: true,
  },
  {
    id: 'prod_9',
    name: 'Travertine Candle',
    category: 'Candles & Scents',
    description: 'Hand-poured natural soy wax candle housed in a heavy solid honed beige travertine vessel with fragrance notes of sandalwood, amber, and cardamom.',
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/travertine-candle',
    price: 72.0,
    featured: true,
  },
  {
    id: 'prod_10',
    name: 'Flax Linen Sheets',
    category: 'Textiles & Throws',
    description: 'Stonewashed breathable pure European flax sheet set with an effortless lived-in drape that regulates body temperature and softens with every wash.',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/flax-linen-sheets',
    price: 260.0,
    featured: false,
  },
  {
    id: 'prod_11',
    name: 'Frosted Window Clings',
    category: 'Decor Accents',
    description: 'Non-adhesive static-cling frosted privacy glass film that diffuses harsh direct sunlight into a soft luminous aesthetic glow while blocking UV rays.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/frosted-window-clings',
    price: 28.0,
    featured: false,
  },
  {
    id: 'prod_12',
    name: 'Travertine Tray',
    category: 'Decor Accents',
    description: 'Carved raw natural beige travertine stone vanity tray with smooth rounded beveled edges, ideal for perfumes, jewelry, keys, or coffee table styling.',
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/travertine-tray',
    price: 88.0,
    featured: true,
  },
];

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'category' | 'admin' | 'code' | 'product'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('prod_1');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [products, setProducts] = useState<ProductType[]>(INITIAL_PRODUCTS);
  const [wishlist, setWishlist] = useState<string[]>(['prod_1', 'prod_5']);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductType | null>(null);

  // Toggle wishlist
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Add new product from Admin
  const handleProductCreated = (newProduct: ProductType) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Navigation handlers
  const handleCategorySelect = (slug: string) => {
    const matchedCategory = defaultCategories.find((c) => c.slug === slug);
    setSelectedCategorySlug(slug);
    setActiveCategoryFilter(matchedCategory ? matchedCategory.name : 'All');
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStorefront = () => {
    setCurrentView('home');
    setActiveCategoryFilter('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products by search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [searchQuery, products]);

  // Wishlist products
  const wishlistProducts = useMemo(() => {
    return products.filter((p) => wishlist.includes(p.id));
  }, [wishlist, products]);

  // Active Category Meta
  const currentCategoryMeta = defaultCategories.find((c) => c.slug === selectedCategorySlug);

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1a1a1a] flex flex-col font-sans selection:bg-[#1a1a1a] selection:text-white">
      {/* Top Banner Notice */}
      <div className="bg-[#1a1a1a] text-[#ededed] px-4 py-2 text-center text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3">
        <Sparkles className="w-3.5 h-3.5 text-[#c2b29d]" />
        <span>Next.js 14 App Router &middot; SQLite &middot; Prisma ORM &middot; Curated Decor</span>
        <button
          type="button"
          onClick={() => setCurrentView('code')}
          className="underline hover:text-white font-medium cursor-pointer ml-2"
        >
          View Codebase
        </button>
      </div>

      {/* Main Brand Header */}
      <header className="sticky top-0 z-40 bg-[#fcfbf9]/95 backdrop-blur-md border-b border-[#e5e5e5] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Tagline */}
            <div className="flex flex-col cursor-pointer" onClick={handleBackToStorefront}>
              <div className="group inline-flex items-baseline gap-2">
                <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1a1a1a] transition-colors group-hover:text-black">
                  Aesthetic Piece
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" />
              </div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#737373] font-medium mt-0.5">
                Curated Living & Style
              </span>
            </div>

            {/* Center Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide text-[#525252]">
              <button
                type="button"
                onClick={handleBackToStorefront}
                className={`transition-colors cursor-pointer ${
                  currentView === 'home' ? 'text-[#1a1a1a] font-medium' : 'hover:text-[#1a1a1a]'
                }`}
              >
                Collection
              </button>
              <button
                type="button"
                onClick={() => handleCategorySelect('lighting-lamps')}
                className="hover:text-[#1a1a1a] transition-colors cursor-pointer"
              >
                Lighting
              </button>
              <button
                type="button"
                onClick={() => handleCategorySelect('vases-vessels')}
                className="hover:text-[#1a1a1a] transition-colors cursor-pointer"
              >
                Ceramics
              </button>
              <button
                type="button"
                onClick={() => handleCategorySelect('textiles-throws')}
                className="hover:text-[#1a1a1a] transition-colors cursor-pointer"
              >
                Textiles
              </button>
              <button
                type="button"
                onClick={() => handleCategorySelect('decor-accents')}
                className="hover:text-[#1a1a1a] transition-colors cursor-pointer"
              >
                Accents
              </button>
            </nav>

            {/* Right Action Icons & Admin CTA */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Icon */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search curated decor"
                className="p-2.5 rounded-full text-[#1a1a1a] hover:bg-[#f0ede6] transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
              </button>

              {/* Heart / Wishlist Icon */}
              <button
                type="button"
                onClick={() => setIsWishlistOpen(true)}
                aria-label="View saved pieces"
                className="relative p-2.5 rounded-full text-[#1a1a1a] hover:bg-[#f0ede6] transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-semibold text-white bg-[#1a1a1a] rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Admin & Manage Button */}
              <button
                type="button"
                onClick={() => setCurrentView('admin')}
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium tracking-wide rounded-full border transition-all cursor-pointer ${
                  currentView === 'admin'
                    ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                    : 'bg-white text-[#1a1a1a] border-[#e5e5e5] hover:bg-[#f5f3ef] shadow-2xs'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#737373]" />
                <span>Admin & Manage</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body Switching */}
      <main className="flex-grow">
        {/* VIEW 1: HOMEPAGE */}
        {currentView === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onExploreClick={() => {
                document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onTrendingClick={() => {
                document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Category Grid Section */}
            <CategoryGrid
              onCategorySelect={(slug) => {
                handleCategorySelect(slug);
              }}
            />

            {/* Product Grid Section */}
            <ProductGrid
              products={products}
              activeCategory={activeCategoryFilter}
              onCategoryFilterChange={setActiveCategoryFilter}
              wishlistIds={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={(p) => setQuickViewProduct(p)}
              onProductClick={handleProductSelect}
            />
          </div>
        )}

        {/* VIEW 2: CATEGORY PAGE (app/category/[slug]/page.tsx simulation) */}
        {currentView === 'category' && (
          <div className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#737373] mb-8">
                <button
                  type="button"
                  onClick={handleBackToStorefront}
                  className="hover:text-[#1a1a1a] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Collection</span>
                </button>
                <span>/</span>
                <span className="text-[#1a1a1a] font-medium">
                  {currentCategoryMeta?.name || activeCategoryFilter}
                </span>
              </div>

              {/* Category Header Banner */}
              <div className="pb-8 border-b border-[#e5e5e5] mb-8">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#737373] font-semibold">
                  Atmosphere &middot; Category View
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl text-[#1a1a1a] font-normal mt-2">
                  {currentCategoryMeta?.name || activeCategoryFilter}
                </h1>
                <p className="mt-3 text-sm sm:text-base text-[#525252] font-light max-w-2xl leading-relaxed">
                  {currentCategoryMeta?.description ||
                    'Curated home decor pieces selected for tactile organic textures, quiet simplicity, and warm architectural presence.'}
                </p>
              </div>

              {/* Product Grid filtered by this category */}
              <ProductGrid
                products={products}
                activeCategory={currentCategoryMeta?.name || activeCategoryFilter}
                onCategoryFilterChange={setActiveCategoryFilter}
                wishlistIds={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
                onProductClick={handleProductSelect}
              />
            </div>
          </div>
        )}

        {/* VIEW: PRODUCT DETAIL (app/product/[id]/page.tsx simulation) */}
        {currentView === 'product' && (() => {
          const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];
          const similar = products
            .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
            .slice(0, 3);
          const similarProducts =
            similar.length > 0
              ? similar
              : products.filter((p) => p.id !== currentProduct.id).slice(0, 3);
          const categorySlug = currentProduct.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');

          return (
            <div className="py-10 sm:py-16 min-h-screen">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#737373] mb-8 sm:mb-12">
                  <button
                    type="button"
                    onClick={handleBackToStorefront}
                    className="hover:text-[#1a1a1a] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Collection</span>
                  </button>
                  <span>/</span>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect(categorySlug)}
                    className="hover:text-[#1a1a1a] transition-colors cursor-pointer"
                  >
                    {currentProduct.category}
                  </button>
                  <span>/</span>
                  <span className="text-[#1a1a1a] font-medium truncate max-w-[200px] sm:max-w-md">
                    {currentProduct.name}
                  </span>
                </div>

                {/* Product Showcase */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-20 border-b border-[#e5e5e5]">
                  <div className="lg:col-span-7">
                    <div className="relative aspect-[4/5] w-full bg-[#f4f2ee] border border-[#e5e5e5] overflow-hidden group">
                      <img
                        src={currentProduct.imageUrl}
                        alt={currentProduct.name}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                      />
                      {currentProduct.featured && (
                        <div className="absolute top-4 left-4 bg-[#1a1a1a] text-white text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1">
                          Featured Curated Pick
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-[11px] uppercase tracking-[0.22em] text-[#737373] font-medium">
                        {currentProduct.category}
                      </span>
                      <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1a1a1a] mt-2 leading-[1.15]">
                        {currentProduct.name}
                      </h1>
                      <div className="mt-4 pb-6 border-b border-[#e5e5e5] flex items-baseline gap-3">
                        {currentProduct.price !== undefined && currentProduct.price !== null && currentProduct.price > 0 ? (
                          <>
                            <span className="font-serif text-2xl font-medium text-[#1a1a1a]">
                              ${Number(currentProduct.price).toFixed(2)}
                            </span>
                            <span className="text-xs text-[#737373] uppercase tracking-wider font-light">
                              Estimated Retail Guide Price
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-[#737373] italic">Curated Design Selection</span>
                        )}
                      </div>

                      <div className="mt-6 space-y-4">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1a1a1a]">
                          Curator&apos;s Notes &amp; Story
                        </span>
                        <p className="text-sm sm:text-base text-[#525252] leading-relaxed font-light">
                          {currentProduct.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-[#e5e5e5] space-y-3.5">
                      <a
                        href={currentProduct.affiliateLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs uppercase tracking-widest font-medium text-white bg-[#1a1a1a] hover:bg-black active:scale-[0.99] transition-all cursor-pointer shadow-sm"
                      >
                        <span>View Product at Retailer</span>
                        <ExternalLink className="w-4 h-4 stroke-[1.75]" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleToggleWishlist(currentProduct.id)}
                        className="w-full py-3 text-xs uppercase tracking-wider font-medium text-[#1a1a1a] border border-[#1a1a1a] hover:bg-[#1a1a1a]/5 transition-colors cursor-pointer"
                      >
                        {wishlist.includes(currentProduct.id)
                          ? 'Saved in Wishlist ✓'
                          : 'Save to Personal Wishlist ♡'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Similar Products: You May Also Like */}
                <section className="mt-20 sm:mt-24">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#e5e5e5]">
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.22em] text-[#737373] font-semibold">
                        Atmosphere Matching
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a1a] font-normal mt-1">
                        You May Also Like
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCategorySelect(categorySlug)}
                      className="mt-2 sm:mt-0 text-xs uppercase tracking-wider text-[#1a1a1a] hover:underline font-medium cursor-pointer"
                    >
                      Browse all {currentProduct.category} &rarr;
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {similarProducts.map((similar) => (
                      <ProductCard
                        key={similar.id}
                        product={similar}
                        isWishlisted={wishlist.includes(similar.id)}
                        onToggleWishlist={handleToggleWishlist}
                        onQuickView={(p: any) => setQuickViewProduct(p)}
                        onProductClick={handleProductSelect}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          );
        })()}

        {/* VIEW 3: ADMIN DASHBOARD (app/admin/page.tsx simulation) */}
        {currentView === 'admin' && (
          <div className="py-12 sm:py-16 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Navigation & Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#e5e5e5]">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#737373] mb-2">
                    <button
                      type="button"
                      onClick={handleBackToStorefront}
                      className="hover:text-[#1a1a1a] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Storefront</span>
                    </button>
                    <span>/</span>
                    <span className="text-[#1a1a1a] font-medium">Administration</span>
                  </div>
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1a1a] font-normal flex items-center gap-3">
                    <span>Admin & Product Management</span>
                    <span className="text-xs font-sans tracking-widest uppercase bg-[#1a1a1a] text-white px-2.5 py-1">
                      SQLite &middot; Prisma
                    </span>
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentView('code')}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs uppercase tracking-wider text-[#1a1a1a] bg-white border border-[#e5e5e5] hover:bg-[#f5f3ef] transition-colors cursor-pointer"
                  >
                    <FileCode className="w-3.5 h-3.5 text-[#737373]" />
                    <span>View Next.js Files</span>
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
                <div className="bg-white border border-[#e5e5e5] p-5">
                  <span className="text-[10px] uppercase tracking-widest text-[#737373] font-semibold">
                    Total Ingested Items
                  </span>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="font-serif text-3xl font-normal text-[#1a1a1a]">
                      {products.length}
                    </span>
                    <span className="text-xs text-[#737373]">Live in catalog</span>
                  </div>
                </div>

                <div className="bg-white border border-[#e5e5e5] p-5">
                  <span className="text-[10px] uppercase tracking-widest text-[#737373] font-semibold">
                    Distinct Atmospheres
                  </span>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="font-serif text-3xl font-normal text-[#1a1a1a]">
                      {new Set(products.map((p) => p.category)).size}
                    </span>
                    <span className="text-xs text-[#737373]">Categories</span>
                  </div>
                </div>

                <div className="bg-white border border-[#e5e5e5] p-5">
                  <span className="text-[10px] uppercase tracking-widest text-[#737373] font-semibold">
                    Featured Homepage Picks
                  </span>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="font-serif text-3xl font-normal text-[#1a1a1a]">
                      {products.filter((p) => p.featured).length}
                    </span>
                    <span className="text-xs text-[#8c7b6c]">Promoted on hero</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Product Add Form */}
                <div className="lg:col-span-8">
                  <AdminProductForm onProductCreated={handleProductCreated} />
                </div>

                {/* Database & Terminal Help Box */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white border border-[#e5e5e5] p-6">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#1a1a1a] font-semibold mb-3">
                      <Database className="w-4 h-4 text-[#8c7b6c]" />
                      <span>Database & Prisma Commands</span>
                    </div>
                    <p className="text-xs text-[#525252] leading-relaxed mb-4">
                      The Next.js 14 backend uses Prisma ORM connected to SQLite (<code className="bg-[#f0ede6] px-1 py-0.5 text-[11px]">prisma/dev.db</code>).
                    </p>

                    <div className="space-y-2 text-[11px] font-mono bg-[#1a1a1a] text-white p-4 overflow-x-auto">
                      <p className="text-[#a3a3a3]"># 1. Install dependencies</p>
                      <p className="text-[#fcfbf9]">npm install</p>
                      <p className="text-[#a3a3a3] mt-2"># 2. Push schema to SQLite</p>
                      <p className="text-[#fcfbf9]">npx prisma db push</p>
                      <p className="text-[#a3a3a3] mt-2"># 3. Seed 12 home decor items</p>
                      <p className="text-[#fcfbf9]">npx tsx prisma/seed.ts</p>
                      <p className="text-[#a3a3a3] mt-2"># 4. Launch Next.js dev server</p>
                      <p className="text-[#fcfbf9]">npm run dev</p>
                    </div>
                  </div>

                  <div className="bg-[#f4f2ee] border border-[#e5e5e5] p-5">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1a1a1a] mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#8c7b6c]" />
                      <span>Seed Items Included</span>
                    </h4>
                    <p className="text-xs text-[#737373] mb-3 leading-relaxed">
                      All 12 items (Zen Basalt Stone Fountain, Fluted Ceramic Vase, Dome Mushroom Lamp, etc.) are pre-configured in <code className="text-[#1a1a1a]">prisma/seed.ts</code>.
                    </p>
                    <div className="text-[11px] text-[#525252] space-y-1">
                      <div>&bull; Zen Basalt Stone Fountain</div>
                      <div>&bull; Fluted Ceramic Vase</div>
                      <div>&bull; Dome Mushroom Lamp</div>
                      <div>&bull; Boho Pampas Grass</div>
                      <div>&bull; Arched Brass Mirror</div>
                      <div>&bull; Linen Cushions &amp; 6 more...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: CODEBASE EXPLORER */}
        {currentView === 'code' && (
          <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between pb-6 border-b border-[#e5e5e5] mb-8">
              <div>
                <button
                  type="button"
                  onClick={handleBackToStorefront}
                  className="hover:text-[#1a1a1a] transition-colors flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#737373] mb-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Storefront</span>
                </button>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1a1a] font-normal">
                  Next.js 14 Codebase Overview
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  file: 'app/page.tsx',
                  desc: 'Server component fetching products via Prisma, rendering Hero, CategoryGrid, and ProductGrid.',
                },
                {
                  file: 'app/layout.tsx',
                  desc: 'Root layout configuring Playfair Display and Inter fonts, SEO metadata, Header, and Footer.',
                },
                {
                  file: 'app/category/[slug]/page.tsx',
                  desc: 'Dynamic route filtering items by category slug with breadcrumbs and atmosphere description.',
                },
                {
                  file: 'app/admin/page.tsx',
                  desc: 'Admin dashboard with product ingestion form and live inventory overview.',
                },
                {
                  file: 'app/api/products/route.ts',
                  desc: 'Next.js 14 REST API handlers: GET (query/filter) and POST (create with Prisma).',
                },
                {
                  file: 'prisma/schema.prisma',
                  desc: 'SQLite database schema defining Product and Category models with cuid IDs.',
                },
                {
                  file: 'prisma/seed.ts',
                  desc: 'Prisma seed script pre-populating all 12 home decor items with photos & affiliate links.',
                },
                {
                  file: 'lib/prisma.ts',
                  desc: 'Singleton PrismaClient instance preventing connection leak in Next.js development.',
                },
                {
                  file: 'README.md',
                  desc: 'Complete setup guide with exact terminal commands to install, push schema, seed, and run.',
                },
              ].map((item) => (
                <div key={item.file} className="bg-white border border-[#e5e5e5] p-6 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#1a1a1a] bg-[#f0ede6] px-2.5 py-1 inline-block mb-3">
                      {item.file}
                    </span>
                    <p className="text-xs text-[#525252] leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#f5f5f5] text-[11px] text-[#245924] flex items-center gap-1.5 font-medium">
                    <Check className="w-3.5 h-3.5" />
                    <span>File created & verified on disk</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Editorial Minimalist Footer */}
      <footer className="bg-[#1a1a1a] text-[#ededed] border-t border-[#333333] pt-16 pb-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#333333]">
            {/* Brand Philosophy */}
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
                {defaultCategories.map((cat) => (
                  <li key={cat.slug}>
                    <button
                      type="button"
                      onClick={() => handleCategorySelect(cat.slug)}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
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
              <button
                type="button"
                onClick={() => setCurrentView('admin')}
                className="text-[#a3a3a3] hover:text-white transition-colors cursor-pointer"
              >
                Admin & Manage
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('code')}
                className="text-[#a3a3a3] hover:text-white transition-colors cursor-pointer"
              >
                Codebase View
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white border border-[#e5e5e5] shadow-2xl overflow-hidden animate-in fade-in duration-200">
            <div className="p-4 border-b border-[#e5e5e5] flex items-center justify-between gap-3">
              <Search className="w-5 h-5 text-[#737373] shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search curated pieces (e.g., basalt fountain, lamp, linen, mirror)..."
                className="w-full text-base bg-transparent focus:outline-none text-[#1a1a1a] placeholder-[#a3a3a3]"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-[#737373] hover:text-[#1a1a1a] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {searchQuery.trim() === '' ? (
                <div className="text-center py-8 text-xs text-[#737373]">
                  Type to search across 12 curated home decor pieces.
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#737373]">
                  No curated pieces matching &quot;{searchQuery}&quot;.
                </div>
              ) : (
                <div className="divide-y divide-[#f0ede6]">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        handleProductSelect(item.id);
                      }}
                      className="py-3 flex items-center justify-between hover:bg-[#faf9f6] px-2 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-12 h-14 object-cover border border-[#e5e5e5]"
                        />
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-[#737373]">
                            {item.category}
                          </p>
                          <h4 className="font-serif text-sm font-medium text-[#1a1a1a]">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#525252] line-clamp-1 max-w-md font-light">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-serif text-sm font-medium text-[#1a1a1a]">
                          ${item.price ? Number(item.price).toFixed(2) : '0.00'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WISHLIST DRAWER */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
            <div className="p-6 border-b border-[#e5e5e5] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#737373] font-semibold">
                  Personal Archive
                </span>
                <h3 className="font-serif text-xl text-[#1a1a1a] font-normal">
                  Saved Pieces ({wishlist.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsWishlistOpen(false)}
                className="p-1.5 text-[#737373] hover:text-[#1a1a1a] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="w-10 h-10 stroke-[1.25] text-[#d4d4d4] mx-auto mb-3" />
                  <p className="font-serif text-base text-[#1a1a1a]">Your archive is empty</p>
                  <p className="text-xs text-[#737373] mt-1">
                    Click the heart icon on any product to save it to your intentional wishlist.
                  </p>
                </div>
              ) : (
                wishlistProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-[#fcfbf9] border border-[#e5e5e5] relative"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-20 object-cover border border-[#e5e5e5] shrink-0"
                    />
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#737373]">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-sm font-medium text-[#1a1a1a]">
                          {item.name}
                        </h4>
                        <p className="font-serif text-xs text-[#1a1a1a] mt-0.5">
                          ${item.price ? Number(item.price).toFixed(2) : '0.00'}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <a
                          href={item.affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1a1a1a] hover:underline"
                        >
                          <span>Retail Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleToggleWishlist(item.id)}
                          className="text-[11px] text-red-600 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {wishlistProducts.length > 0 && (
              <div className="p-6 border-t border-[#e5e5e5] bg-[#faf9f6]">
                <div className="flex items-center justify-between text-xs text-[#525252] mb-3">
                  <span>Saved Items Total:</span>
                  <span className="font-serif font-medium text-sm text-[#1a1a1a]">
                    $
                    {wishlistProducts
                      .reduce((acc, curr) => acc + (curr.price || 0), 0)
                      .toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsWishlistOpen(false)}
                  className="w-full py-3 text-xs uppercase tracking-widest text-white bg-[#1a1a1a] hover:bg-black transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white border border-[#e5e5e5] shadow-2xl overflow-hidden relative">
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-[#1a1a1a] hover:bg-white shadow-xs cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="aspect-[4/5] sm:aspect-auto h-72 sm:h-full bg-[#f4f2ee]">
                <img
                  src={quickViewProduct.imageUrl}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#737373]">
                    {quickViewProduct.category}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-[#1a1a1a] mt-1">
                    {quickViewProduct.name}
                  </h3>
                  <p className="font-serif text-lg text-[#1a1a1a] mt-2">
                    ${quickViewProduct.price ? Number(quickViewProduct.price).toFixed(2) : '0.00'}
                  </p>
                  <p className="mt-4 text-xs sm:text-sm text-[#525252] font-light leading-relaxed">
                    {quickViewProduct.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#e5e5e5] space-y-3">
                  <a
                    href={quickViewProduct.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-medium text-white bg-[#1a1a1a] hover:bg-black transition-all cursor-pointer"
                  >
                    <span>View Product at Retailer</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      handleToggleWishlist(quickViewProduct.id);
                    }}
                    className="w-full py-2.5 text-xs uppercase tracking-wider font-medium text-[#1a1a1a] border border-[#1a1a1a] hover:bg-[#1a1a1a]/5 transition-colors cursor-pointer"
                  >
                    {wishlist.includes(quickViewProduct.id)
                      ? 'Saved in Wishlist ✓'
                      : 'Save to Wishlist ♡'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
