import React, { useState, useMemo, useEffect } from 'react';
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
  EyeOff,
  Filter,
  Star,
  Lock,
  LogOut,
  Menu,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Music2,
  Compass,
  TrendingUp,
  Gift,
  ChevronDown,
  Cake,
  Lightbulb,
  Palette,
  Tag
} from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryGrid, { defaultCategories, CategoryItem } from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';
import ProductCard, { ProductType } from '@/components/ProductCard';
import AdminProductForm from '@/components/AdminProductForm';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import SparkleCursor from '@/components/SparkleCursor';

// Initial curated home decor items including Home Décor category and atmosphere picks
const INITIAL_PRODUCTS: ProductType[] = [
  {
    id: 'prod_hd_1',
    name: 'Decorative Vases',
    category: 'Home Décor',
    description: 'Sculptural fluted ceramic vessel with a matte chalk finish, designed for displaying dry stems or making a quiet architectural statement on consoles.',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=decorative+vases+home+decor&tag=aestheticpiece-20',
    price: 68.0,
    featured: true,
  },
  {
    id: 'prod_hd_2',
    name: 'Tabletop Fountains',
    category: 'Home Décor',
    description: 'Handcrafted natural basalt stone indoor water fountain with gentle cascading stream, bringing calming acoustic ambiance to living sanctuaries.',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=tabletop+water+fountains+indoor&tag=aestheticpiece-20',
    price: 145.0,
    featured: true,
  },
  {
    id: 'prod_hd_3',
    name: 'Decorative Lamps',
    category: 'Home Décor',
    description: 'Mid-century modern dome table luminaire with warm ambient diffused LED illumination, featuring a weighted metal base and satin cashmere lacquer.',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=decorative+mushroom+table+lamps&tag=aestheticpiece-20',
    price: 110.0,
    featured: true,
  },
  {
    id: 'prod_hd_4',
    name: 'Wall Decorations',
    category: 'Home Décor',
    description: 'Hand-sculpted textured plaster relief canvas and slim arched brass mantle accent crafted for serene living spaces and entryways.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=modern+aesthetic+wall+decorations&tag=aestheticpiece-20',
    price: 185.0,
    featured: true,
  },
  {
    id: 'prod_hd_5',
    name: 'Artificial Flowers',
    category: 'Home Décor',
    description: 'Naturally dried neutral pampas plumes and lifelike silk botanical stems adding soft movement, tactile richness, and organic texture to quiet corners.',
    imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=artificial+flowers+dried+botanicals&tag=aestheticpiece-20',
    price: 38.0,
    featured: false,
  },
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
  const [currentView, setCurrentView] = useState<'home' | 'categories' | 'trending' | 'gift-ideas' | 'about' | 'category' | 'admin-login' | 'admin-add-product' | 'admin' | 'code' | 'product'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string>('prod_1');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [products, setProducts] = useState<ProductType[]>(INITIAL_PRODUCTS);
  const [wishlist, setWishlist] = useState<string[]>(['prod_1', 'prod_5']);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [homeSearchInput, setHomeSearchInput] = useState<string>('');
  const [activeHomeSearch, setActiveHomeSearch] = useState<string>('');
  const [trendingFilter, setTrendingFilter] = useState<'All Trending' | 'Vases' | 'Lighting' | 'Textiles'>('All Trending');
  const [trendingSort, setTrendingSort] = useState<'popular' | 'newest'>('popular');
  const [giftFilter, setGiftFilter] = useState<string>('All Gift Picks');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductType | null>(null);
  const [registeredAdmin] = useState<{ email: string; password: string } | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem('ap_preview_admin_account');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminLoginEmail, setAdminLoginEmail] = useState<string>('');
  const [adminLoginPassword, setAdminLoginPassword] = useState<string>('');
  const [showAdminPassword, setShowAdminPassword] = useState<boolean>(false);
  const [adminLoginError, setAdminLoginError] = useState<string>('');

  // Ensure any leftover persistent storage is wiped on mount
  useEffect(() => {
    try {
      localStorage.removeItem('isAdminAuthenticated');
      localStorage.removeItem('adminEmail');
      localStorage.removeItem('ap_preview_admin_session');
      sessionStorage.removeItem('isAdminAuthenticated');
      sessionStorage.removeItem('adminEmail');
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Logout on navigate: leaving admin views immediately ends the session
  useEffect(() => {
    if (currentView !== 'admin' && currentView !== 'admin-add-product') {
      setIsAdminLoggedIn(false);
      setAdminLoginPassword('');
    }
  }, [currentView]);

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

  // Filter products for homepage prominent search bar
  const homeSearchResults = useMemo(() => {
    const trimmed = activeHomeSearch.trim();
    if (!trimmed) return [];
    const q = trimmed.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [activeHomeSearch, products]);

  // Filter & sort products for Trending view
  const trendingProducts = useMemo(() => {
    const filtered = products.filter((item) => {
      if (trendingFilter === 'All Trending') return true;
      const combined = `${item.name} ${item.category} ${item.description}`.toLowerCase();
      if (trendingFilter === 'Vases') {
        return combined.includes('vase') || combined.includes('vessel') || combined.includes('planter');
      }
      if (trendingFilter === 'Lighting') {
        return combined.includes('light') || combined.includes('lamp');
      }
      if (trendingFilter === 'Textiles') {
        return (
          combined.includes('textile') ||
          combined.includes('linen') ||
          combined.includes('cushion') ||
          combined.includes('throw') ||
          combined.includes('sheet')
        );
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (trendingSort === 'newest') {
        return products.indexOf(a) - products.indexOf(b);
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, trendingFilter, trendingSort]);

  // Gift Ideas curated 5-item set
  const giftProducts = useMemo(() => {
    const tagRotation = [
      'Birthday Celebrations',
      'Christmas & Holiday Wonders',
      'Under $30 Sweet Spots',
      'Creative & Open Play',
      'STEM & Mind Boosters',
    ] as const;
    return products.slice(0, 5).map((item, idx) => ({
      ...item,
      price: idx === 0 || idx === 2 ? Math.min(Number(item.price || 28), 29) : item.price,
      retailer: idx % 2 === 0 ? ('AMAZON' as const) : ('ALIEXPRESS' as const),
      giftTag: tagRotation[idx % tagRotation.length],
    }));
  }, [products]);

  const filteredGiftProducts = useMemo(() => {
    if (giftFilter === 'All Gift Picks') return giftProducts;
    if (giftFilter === 'Under $30 Sweet Spots') {
      return giftProducts.filter(
        (p) => p.giftTag === 'Under $30 Sweet Spots' || (p.price !== undefined && p.price !== null && p.price <= 30)
      );
    }
    return giftProducts.filter((p) => p.giftTag === giftFilter);
  }, [giftProducts, giftFilter]);

  // Wishlist products
  const wishlistProducts = useMemo(() => {
    return products.filter((p) => wishlist.includes(p.id));
  }, [wishlist, products]);

  // Active Category Meta
  const currentCategoryMeta = defaultCategories.find((c) => c.slug === selectedCategorySlug);

  return (
    <div className="min-h-screen bg-transparent text-[#111111] flex flex-col font-sans selection:bg-[#111111] selection:text-white">
      <SparkleCursor />
      {/* Top Banner Notice */}
      <div className="bg-[#111111] text-[#ededed] px-4 py-2 text-center text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3">
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
      <header className="sticky top-0 z-40 bg-[#faf9f6]/92 backdrop-blur-md border-b border-[#e5e5e5] transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-24">
            {/* Logo & Tagline */}
            <div className="flex flex-col cursor-pointer" onClick={handleBackToStorefront}>
              <div className="group inline-flex items-baseline gap-2.5">
                <span className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#111111] transition-colors group-hover:text-black">
                  Aesthetic Piece
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#111111]" />
              </div>
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#737373] font-medium mt-1">
                Curated Living & Style
              </span>
            </div>

            {/* Center Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm tracking-wide text-[#525252]">
              <button
                type="button"
                onClick={handleBackToStorefront}
                className={`transition-colors cursor-pointer whitespace-nowrap ${
                  currentView === 'home' ? 'text-[#111111] font-medium' : 'hover:text-[#111111]'
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentView('categories');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`transition-colors cursor-pointer whitespace-nowrap ${
                  currentView === 'categories' ? 'text-[#111111] font-medium' : 'hover:text-[#111111]'
                }`}
              >
                Categories
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentView('trending');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`transition-colors cursor-pointer whitespace-nowrap ${
                  currentView === 'trending' ? 'text-[#111111] font-medium' : 'hover:text-[#111111]'
                }`}
              >
                Trending
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentView('gift-ideas');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`transition-colors cursor-pointer whitespace-nowrap ${
                  currentView === 'gift-ideas' ? 'text-[#111111] font-medium' : 'hover:text-[#111111]'
                }`}
              >
                Gift Ideas
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`transition-colors cursor-pointer whitespace-nowrap ${
                  currentView === 'about' ? 'text-[#111111] font-medium' : 'hover:text-[#111111]'
                }`}
              >
                About
              </button>
            </nav>

            {/* Right Action Icons & Admin CTA */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Search Icon */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search curated decor"
                className="p-2.5 rounded-full text-[#111111] hover:bg-[#efede8] transition-colors cursor-pointer"
              >
                <Search className="w-5 h-5 stroke-[1.6]" />
              </button>

              {/* Heart / Wishlist Icon */}
              <button
                type="button"
                onClick={() => setIsWishlistOpen(true)}
                aria-label="View saved pieces"
                className="relative p-2.5 rounded-full text-[#111111] hover:bg-[#efede8] transition-colors cursor-pointer"
              >
                <Heart className="w-5 h-5 stroke-[1.6]" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-semibold text-white bg-[#111111] rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Admin & Manage Button */}
              <button
                type="button"
                onClick={() => {
                  setAdminLoginError('');
                  setAdminLoginEmail('');
                  setAdminLoginPassword('');
                  setIsAdminLoggedIn(false);
                  setCurrentView('admin-login');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium tracking-wide rounded-full border transition-all cursor-pointer ${
                  currentView === 'admin-login' || currentView === 'admin-add-product' || currentView === 'admin'
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#111111] border-[#e5e5e5] hover:bg-[#111111] hover:text-white hover:border-[#111111] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 opacity-70" />
                <span className="hidden sm:inline">Admin & Manage</span>
                <span className="sm:hidden">Admin</span>
              </button>

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

          {isMobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-[#e5e5e5] flex flex-col gap-3 text-sm text-[#525252]">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleBackToStorefront();
                }}
                className="py-1.5 text-left text-[#111111] font-medium cursor-pointer"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setCurrentView('categories');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-1.5 text-left hover:text-[#111111] cursor-pointer"
              >
                Categories
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setCurrentView('trending');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-1.5 text-left hover:text-[#111111] cursor-pointer"
              >
                Trending
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setCurrentView('gift-ideas');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-1.5 text-left hover:text-[#111111] cursor-pointer"
              >
                Gift Ideas
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setCurrentView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-1.5 text-left hover:text-[#111111] cursor-pointer"
              >
                About
              </button>
            </nav>
          )}
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

            {/* Hero Statistics Section */}
            <section aria-label="Curated highlights" className="w-full bg-[#faf9f6] border-b border-[#e5e5e5]">
              <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8 sm:py-10">
                <div className="flex flex-wrap items-start justify-start gap-10 sm:gap-16 lg:gap-20">
                  <div>
                    <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#111111] tracking-tight">
                      100%
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-[#737373] font-light">
                      Curated Quality
                    </p>
                  </div>

                  <div>
                    <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#111111] tracking-tight">
                      12+
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-[#737373] font-light">
                      Design Categories
                    </p>
                  </div>

                  <div>
                    <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#111111] tracking-tight">
                      0 Fee
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-[#737373] font-light">
                      Zero-Cost Discovery
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Browse Categories Grid Section */}
            <section id="categories-section" className="pt-20 sm:pt-28 pb-4 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 w-full">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.24em] text-[#737373] font-semibold block mb-2">
                    Curated Atmospheres
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-normal tracking-tight">
                    Browse Categories
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('categories');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-[#111111] hover:underline self-start sm:self-end shrink-0 cursor-pointer"
                >
                  <span>View All Categories</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {defaultCategories.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => handleCategorySelect(category.slug)}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#ece8e1] shadow-[0_6px_24px_-6px_rgba(0,0,0,0.08)] flex items-end p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_14px_32px_-8px_rgba(0,0,0,0.16)] text-left cursor-pointer"
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
                    <div className="relative z-10 w-full flex items-end justify-between gap-2">
                      <h3 className="font-serif text-lg sm:text-xl font-normal text-white leading-snug">
                        {category.name}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-white/80 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Prominent Search Section */}
            <section id="search-section" className="pt-16 sm:pt-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 w-full">
              <div className="bg-white border border-[#e5e5e5] shadow-[0_6px_30px_-8px_rgba(0,0,0,0.06)] rounded-3xl p-8 sm:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faf9f6] border border-[#e5e5e5] text-[11px] uppercase tracking-[0.22em] text-[#525252] font-medium mb-5">
                    <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
                    <span>Find Your Aesthetic Piece</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#111111] leading-[1.15]">
                    What are you looking for today?
                  </h2>
                </div>

                {/* Search Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setActiveHomeSearch(homeSearchInput.trim());
                    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-8 max-w-2xl mx-auto"
                >
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-2 rounded-2xl sm:rounded-full bg-[#faf9f6] border border-[#e5e5e5] focus-within:border-[#111111] transition-colors shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center flex-1 pl-4 pr-2">
                      <Search className="w-5 h-5 text-[#737373] shrink-0" />
                      <input
                        type="text"
                        value={homeSearchInput}
                        onChange={(e) => {
                          setHomeSearchInput(e.target.value);
                          if (!e.target.value.trim()) {
                            setActiveHomeSearch('');
                          }
                        }}
                        placeholder="Search sculptural vases, ambient lamps, linen..."
                        aria-label="Search curated decor"
                        className="w-full bg-transparent pl-3 pr-2 py-2.5 text-sm sm:text-base text-[#111111] placeholder:text-[#a3a3a3] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-7 py-3 rounded-xl sm:rounded-full bg-[#111111] text-white text-sm font-medium tracking-wide hover:bg-black transition-colors cursor-pointer shrink-0"
                    >
                      Search
                    </button>
                  </div>
                </form>

                {/* Popular Shortcuts */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                  <span className="text-xs uppercase tracking-[0.18em] text-[#737373] mr-1">
                    Popular:
                  </span>
                  {['Vases', 'Lighting', 'Textiles', 'Wall Art', 'Candles'].map((term) => {
                    const isActive = activeHomeSearch.trim().toLowerCase() === term.toLowerCase();
                    return (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setHomeSearchInput(term);
                          setActiveHomeSearch(term);
                          document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`px-4 py-1.5 rounded-full text-xs sm:text-sm border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-white text-[#525252] border-[#e5e5e5] hover:border-[#111111] hover:text-[#111111] hover:bg-[#faf9f6]'
                        }`}
                      >
                        {term}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Category Stacked Sections */}
            <div id="products-section" className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 w-full space-y-24 sm:space-y-32">
              {activeHomeSearch.trim() ? (
                <section>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-14">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <span className="text-[11px] uppercase tracking-[0.24em] text-[#737373] font-semibold">
                          Curated Search Results
                        </span>
                        <span className="text-[#a3a3a3]">&middot;</span>
                        <span className="text-xs text-[#8c7b6c] font-medium">
                          {homeSearchResults.length}{' '}
                          {homeSearchResults.length === 1 ? 'Piece' : 'Pieces'} Found
                        </span>
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-normal tracking-tight">
                        Results for &ldquo;{activeHomeSearch.trim()}&rdquo;
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setHomeSearchInput('');
                        setActiveHomeSearch('');
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#e5e5e5] text-xs uppercase tracking-wider font-medium text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-all self-start sm:self-end shrink-0 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.04)] cursor-pointer"
                    >
                      <span>Clear Search</span>
                    </button>
                  </div>

                  {homeSearchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                      {homeSearchResults.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          isWishlisted={wishlist.includes(product.id)}
                          onToggleWishlist={handleToggleWishlist}
                          onQuickView={(p) => setQuickViewProduct(p)}
                          onProductClick={handleProductSelect}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="py-16 text-center bg-white border border-[#e5e5e5] rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] p-8">
                      <p className="font-serif text-xl text-[#111111]">
                        No aesthetic pieces matched &ldquo;{activeHomeSearch.trim()}&rdquo;.
                      </p>
                      <p className="mt-2 text-sm text-[#737373] font-light">
                        Try another keyword or explore one of our popular shortcuts above.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setHomeSearchInput('');
                          setActiveHomeSearch('');
                        }}
                        className="inline-block mt-5 px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors cursor-pointer"
                      >
                        View All Products
                      </button>
                    </div>
                  )}
                </section>
              ) : (
                <>
              {defaultCategories.map((category) => {
                const catProducts = products.filter((p) => {
                  const pCat = (p.category || '').toLowerCase().trim();
                  const cName = category.name.toLowerCase().trim();
                  return pCat === cName || pCat.includes(cName) || pCat.replace(/[^a-z0-9]+/g, '-') === category.slug;
                });

                if (catProducts.length === 0) return null;

                return (
                  <section key={category.slug}>
                    {/* Category Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-14">
                      <div>
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <span className="text-[11px] uppercase tracking-[0.24em] text-[#737373] font-semibold">
                            Atmosphere Curation
                          </span>
                          <span className="text-[#a3a3a3]">&middot;</span>
                          <span className="text-xs text-[#8c7b6c] font-medium">
                            {catProducts.length} {catProducts.length === 1 ? 'Piece' : 'Pieces'}
                          </span>
                        </div>

                        {/* Large Category Heading */}
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-normal tracking-tight">
                          {category.name}
                        </h2>

                        {category.description && (
                          <p className="mt-3 text-sm sm:text-base text-[#525252] font-light max-w-2xl leading-relaxed">
                            {category.description}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCategorySelect(category.slug)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#e5e5e5] text-xs uppercase tracking-wider font-medium text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-all self-start sm:self-end shrink-0 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.04)] cursor-pointer"
                      >
                        <span>Explore {category.name}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Responsive Grid: grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                      {catProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          isWishlisted={wishlist.includes(product.id)}
                          onToggleWishlist={handleToggleWishlist}
                          onQuickView={(p) => setQuickViewProduct(p)}
                          onProductClick={handleProductSelect}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
                </>
              )}
            </div>
          </div>
        )}

        {/* VIEW: CATEGORIES DIRECTORY (app/categories/page.tsx simulation) */}
        {currentView === 'categories' && (
          <div className="min-h-screen bg-[#faf9f6] text-[#111111] py-14 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
              <div className="mb-10">
                <button
                  type="button"
                  onClick={handleBackToStorefront}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#737373] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </button>
              </div>

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

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {defaultCategories.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => handleCategorySelect(category.slug)}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#ece8e1] shadow-[0_6px_24px_-6px_rgba(0,0,0,0.08)] flex items-end p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_14px_32px_-8px_rgba(0,0,0,0.16)] text-left cursor-pointer"
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
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: TRENDING PAGE (app/trending/page.tsx simulation) */}
        {currentView === 'trending' && (
          <div className="min-h-screen bg-[#faf9f6] text-[#111111] py-10 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
              {/* Back Breadcrumb */}
              <div className="mb-8">
                <button
                  type="button"
                  onClick={handleBackToStorefront}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#737373] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </button>
              </div>

              {/* 1. Hero Banner */}
              <section className="rounded-3xl bg-gradient-to-br from-[#fdf3ea] via-[#faf9f6] to-[#f8e7d8] border border-[#eadfd3] px-6 py-12 sm:px-12 sm:py-16 lg:py-20 shadow-[0_6px_30px_-10px_rgba(0,0,0,0.05)]">
                <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-[#eadfd3] text-xs font-medium tracking-wide text-[#111111] shadow-2xs mb-6">
                    <span>🔥 Trending Curations</span>
                  </div>

                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#111111] leading-[1.12]">
                    What&apos;s Hot Right Now
                  </h1>

                  <p className="mt-5 text-base sm:text-lg text-[#525252] font-light leading-relaxed max-w-2xl">
                    Discover the most-loved, best-reviewed, and highest-demand pieces inspiring intentional living right now.
                  </p>

                  <p className="mt-7 text-xs sm:text-sm tracking-wide text-[#737373] font-medium">
                    Updated Daily &bull; Verified Retailer Picks &bull; Curator Approved
                  </p>
                </div>
              </section>

              {/* 2. Filter and Sort Bar */}
              <section className="mt-12 sm:mt-14 pb-6 border-b border-[#e5e5e5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  {(['All Trending', 'Vases', 'Lighting', 'Textiles'] as const).map((option) => {
                    const isActive = trendingFilter === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setTrendingFilter(option)}
                        className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                            : 'bg-white text-[#525252] border-[#e5e5e5] hover:border-[#111111] hover:text-[#111111]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                <div className="relative self-start sm:self-auto">
                  <select
                    value={trendingSort}
                    onChange={(e) => setTrendingSort(e.target.value as 'popular' | 'newest')}
                    aria-label="Sort trending products"
                    className="appearance-none bg-white border border-[#e5e5e5] rounded-full pl-5 pr-10 py-2.5 text-xs sm:text-sm font-medium text-[#111111] focus:outline-none focus:border-[#111111] transition-colors cursor-pointer shadow-2xs"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#737373] pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </section>

              {/* 3. Product Grid */}
              <section className="mt-10 sm:mt-12">
                {trendingProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trendingProducts.map((product) => (
                      <article
                        key={product.id}
                        className="group relative flex flex-col bg-white border border-[#e5e5e5]/80 rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_14px_30px_-8px_rgba(0,0,0,0.1)] transition-all duration-300"
                      >
                        <button
                          type="button"
                          onClick={() => handleProductSelect(product.id)}
                          className="relative aspect-[4/5] w-full overflow-hidden bg-[#f4f2ee] block cursor-pointer text-left"
                        >
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                          <span className="absolute top-3.5 left-3.5 bg-[#111111]/90 backdrop-blur-xs text-white text-[10px] tracking-[0.18em] uppercase font-medium px-3 py-1 rounded-full z-10">
                            Trending
                          </span>

                          <span className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-xs text-[#111111] border border-[#e5e5e5] text-[10px] tracking-[0.14em] uppercase font-semibold px-3 py-1 rounded-full shadow-xs z-10">
                            Save 20%
                          </span>
                        </button>

                        <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                          <div>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#737373]">
                              {product.category}
                            </span>

                            <div className="mt-1.5 flex items-baseline justify-between gap-3">
                              <button
                                type="button"
                                onClick={() => handleProductSelect(product.id)}
                                className="font-serif text-lg font-medium text-[#111111] group-hover:text-black line-clamp-1 hover:underline decoration-1 underline-offset-4 text-left cursor-pointer"
                              >
                                {product.name}
                              </button>
                              {product.price !== undefined && product.price !== null && product.price > 0 && (
                                <span className="font-serif text-base font-medium text-[#111111] shrink-0">
                                  ${Number(product.price).toFixed(2)}
                                </span>
                              )}
                            </div>

                            <p className="mt-2.5 text-xs text-[#525252] leading-relaxed line-clamp-2 font-light">
                              {product.description}
                            </p>
                          </div>

                          <div className="mt-5 pt-4 border-t border-[#f2efe9] flex items-center justify-between gap-3">
                            <button
                              type="button"
                              onClick={() => handleProductSelect(product.id)}
                              className="text-xs text-[#737373] hover:text-[#111111] transition-colors font-medium cursor-pointer"
                            >
                              View Details
                            </button>

                            <a
                              href={product.affiliateLink || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wide text-white bg-[#111111] hover:bg-black rounded-full active:scale-[0.98] transition-all cursor-pointer"
                            >
                              <span>Shop Now</span>
                              <ExternalLink className="w-3 h-3 stroke-[1.75]" />
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center bg-white border border-[#e5e5e5] rounded-2xl p-8">
                    <p className="font-serif text-xl text-[#111111]">
                      No trending pieces found for &ldquo;{trendingFilter}&rdquo;.
                    </p>
                    <button
                      type="button"
                      onClick={() => setTrendingFilter('All Trending')}
                      className="mt-5 px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors cursor-pointer"
                    >
                      Show All Trending
                    </button>
                  </div>
                )}
              </section>
            </div>
          </div>
        )}

        {/* VIEW: GIFT IDEAS PAGE (app/gift-ideas/page.tsx simulation) */}
        {currentView === 'gift-ideas' && (
          <div className="min-h-screen bg-[#faf9f6] text-[#111111] py-10 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
              <div className="mb-8">
                <button
                  type="button"
                  onClick={handleBackToStorefront}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#737373] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </button>
              </div>

              {/* 1. Hero Banner */}
              <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#fdf1f5] via-[#faf9f6] to-[#fbe6ee] border border-[#efdce3] px-6 py-12 sm:px-12 sm:py-16 lg:py-20 shadow-[0_6px_30px_-10px_rgba(0,0,0,0.05)]">
                <Gift
                  aria-hidden="true"
                  className="w-14 h-14 sm:w-20 sm:h-20 text-[#cfa1b3]/35 absolute top-6 right-6 sm:top-8 sm:right-10 pointer-events-none stroke-[1.25]"
                />

                <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#efdce3] text-[11px] sm:text-xs font-semibold tracking-[0.14em] uppercase text-[#111111] shadow-2xs mb-6">
                    <span>🎁 MAGICAL GIFT IDEAS GUIDE</span>
                  </div>

                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#111111] leading-[1.12]">
                    Unbox Pure Wonder &amp; Joy
                  </h1>

                  <p className="mt-5 text-base sm:text-lg text-[#525252] font-light leading-relaxed max-w-2xl">
                    Find the perfect surprise for birthday parties, Christmas stockings, milestone celebrations, and everyday smiles. Curated with love, tested for wonder, and gentle on parent budgets.
                  </p>

                  <p className="mt-7 text-xs sm:text-sm tracking-wide text-[#737373] font-medium">
                    {giftProducts.length} Gift Recommendations Available &bull; Age-Appropriate &bull; Direct Affiliate Links
                  </p>
                </div>
              </section>

              {/* 2. Filter Pills */}
              <section className="mt-12 sm:mt-14 pb-6 border-b border-[#e5e5e5]">
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setGiftFilter('All Gift Picks')}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide border transition-all cursor-pointer ${
                      giftFilter === 'All Gift Picks'
                        ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                        : 'bg-white text-[#525252] border-[#e5e5e5] hover:border-[#111111] hover:text-[#111111]'
                    }`}
                  >
                    <span>All Gift Picks ({giftProducts.length})</span>
                  </button>

                  {[
                    { label: 'Birthday Celebrations', icon: Cake },
                    { label: 'Christmas & Holiday Wonders', icon: Sparkles },
                    { label: 'STEM & Mind Boosters', icon: Lightbulb },
                    { label: 'Creative & Open Play', icon: Palette },
                    { label: 'Under $30 Sweet Spots', icon: Tag },
                  ].map(({ label, icon: Icon }) => {
                    const isActive = giftFilter === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setGiftFilter(label)}
                        className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                            : 'bg-white text-[#525252] border-[#e5e5e5] hover:border-[#111111] hover:text-[#111111]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* 3. Product Grid */}
              <section className="mt-8 sm:mt-10">
                <p className="text-xs sm:text-sm text-[#737373] font-light mb-6">
                  Showing {filteredGiftProducts.length} thoughtfully curated{' '}
                  {filteredGiftProducts.length === 1 ? 'gift idea' : 'gift ideas'}
                </p>

                {filteredGiftProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredGiftProducts.map((product) => (
                      <article
                        key={product.id}
                        className="group relative flex flex-col bg-white border border-[#e5e5e5]/80 rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_14px_30px_-8px_rgba(0,0,0,0.1)] transition-all duration-300"
                      >
                        <button
                          type="button"
                          onClick={() => handleProductSelect(product.id)}
                          className="relative aspect-[4/5] w-full overflow-hidden bg-[#f4f2ee] block cursor-pointer text-left"
                        >
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                          <span
                            className={`absolute top-3.5 left-3.5 text-white text-[10px] tracking-[0.16em] uppercase font-semibold px-3 py-1 rounded-full shadow-xs z-10 ${
                              product.retailer === 'AMAZON' ? 'bg-[#ff9900]' : 'bg-[#e62e04]'
                            }`}
                          >
                            {product.retailer}
                          </span>

                          <span className="absolute top-3.5 right-3.5 bg-emerald-600 text-white text-[10px] tracking-[0.12em] uppercase font-semibold px-3 py-1 rounded-full shadow-xs z-10">
                            Save 23%
                          </span>
                        </button>

                        <div className="p-5 flex flex-col flex-grow justify-between bg-white">
                          <div>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#737373]">
                              {product.category}
                            </span>

                            <div className="mt-1.5 flex items-baseline justify-between gap-2.5">
                              <button
                                type="button"
                                onClick={() => handleProductSelect(product.id)}
                                className="font-serif text-lg font-medium text-[#111111] group-hover:text-black line-clamp-1 hover:underline decoration-1 underline-offset-4 text-left cursor-pointer"
                              >
                                {product.name}
                              </button>
                              {product.price !== undefined && product.price !== null && product.price > 0 && (
                                <span className="font-serif text-base font-medium text-[#111111] shrink-0">
                                  ${Number(product.price).toFixed(2)}
                                </span>
                              )}
                            </div>

                            <p className="mt-2 text-xs text-[#525252] leading-relaxed line-clamp-2 font-light">
                              {product.description}
                            </p>
                          </div>

                          <div className="mt-5 pt-4 border-t border-[#f2efe9] flex items-center justify-between gap-3">
                            <button
                              type="button"
                              onClick={() => handleProductSelect(product.id)}
                              className="text-xs text-[#737373] hover:text-[#111111] transition-colors font-medium cursor-pointer"
                            >
                              View Details
                            </button>

                            <a
                              href={product.affiliateLink || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wide text-white bg-[#111111] hover:bg-black rounded-full active:scale-[0.98] transition-all cursor-pointer"
                            >
                              <span>Shop Gift</span>
                              <ExternalLink className="w-3 h-3 stroke-[1.75]" />
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center bg-white border border-[#e5e5e5] rounded-2xl p-8">
                    <p className="font-serif text-xl text-[#111111]">
                      No gift ideas matched &ldquo;{giftFilter}&rdquo;.
                    </p>
                    <button
                      type="button"
                      onClick={() => setGiftFilter('All Gift Picks')}
                      className="mt-5 px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors cursor-pointer"
                    >
                      Show All Gift Picks
                    </button>
                  </div>
                )}
              </section>
            </div>
          </div>
        )}

        {/* VIEW: ABOUT PAGE (app/about/page.tsx simulation) */}
        {currentView === 'about' && (
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
                  <div className="lg:col-span-6">
                    <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#ece8e1] border border-[#e5e5e5] shadow-[0_20px_50px_-14px_rgba(0,0,0,0.14)]">
                      <img
                        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                        alt="Warm minimalist living room styled with natural textiles and sculptural accents"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>

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
                  {[
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
                  ].map((value) => {
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
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentView('categories');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-[#faf9f6] hover:bg-white text-[#111111] text-xs sm:text-sm uppercase tracking-[0.2em] font-medium transition-all shadow-lg active:scale-[0.98] cursor-pointer"
                    >
                      <span>Explore Categories</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start pb-24">
                  {/* Left Column (Image): Medium-sized container with soft shadow & rounded corners */}
                  <div className="lg:col-span-5 flex justify-center lg:justify-start">
                    <div className="w-full max-w-[440px]">
                      <div className="relative aspect-square w-full bg-white rounded-2xl p-8 sm:p-10 flex items-center justify-center shadow-[0_10px_35px_-10px_rgba(0,0,0,0.08)] overflow-hidden">
                        <img
                          src={currentProduct.imageUrl}
                          alt={currentProduct.name}
                          className="w-full h-full max-h-[360px] object-contain object-center transition-transform duration-500 ease-out hover:scale-104"
                        />
                        {currentProduct.featured && (
                          <div className="absolute top-5 left-5 bg-[#111111] text-white text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-full z-10 shadow-xs">
                            Featured Pick
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Information): Spacious typography & full-width charcoal Shop Now CTA */}
                  <div className="lg:col-span-7 flex flex-col space-y-8">
                    <div>
                      <button
                        type="button"
                        onClick={() => handleCategorySelect(categorySlug)}
                        className="inline-block text-[11px] uppercase tracking-[0.25em] text-[#737373] hover:text-[#111111] font-semibold transition-colors cursor-pointer text-left"
                      >
                        {currentProduct.category}
                      </button>

                      <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111] mt-3 leading-[1.14] tracking-tight">
                        {currentProduct.name}
                      </h1>

                      <div className="mt-5 pb-7 border-b border-[#e5e5e5]">
                        <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight">
                          ${currentProduct.price !== undefined && currentProduct.price !== null && currentProduct.price > 0
                            ? Number(currentProduct.price).toFixed(2)
                            : '0.00'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#111111] block">
                        Description
                      </span>
                      <p className="text-base sm:text-lg text-[#525252] leading-relaxed font-light">
                        {currentProduct.description}
                      </p>
                    </div>

                    {/* Full-Width Charcoal Shop Now CTA + Wishlist secondary action */}
                    <div className="pt-4 space-y-3">
                      <a
                        href={currentProduct.affiliateLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-3 px-10 py-4.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs sm:text-sm uppercase tracking-widest font-medium transition-all duration-300 shadow-[0_8px_24px_-6px_rgba(17,17,17,0.35)] hover:shadow-[0_12px_30px_-6px_rgba(17,17,17,0.5)] active:scale-[0.99] cursor-pointer"
                      >
                        <span>Shop Now</span>
                        <ExternalLink className="w-4 h-4 stroke-[2]" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleToggleWishlist(currentProduct.id)}
                        className="w-full py-3.5 rounded-full text-xs uppercase tracking-wider font-medium text-[#111111] border border-[#e5e5e5] bg-white hover:border-[#111111] transition-colors cursor-pointer text-center"
                      >
                        {wishlist.includes(currentProduct.id) ? 'Saved in Wishlist ✓' : 'Save to Wishlist ♡'}
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

        {/* VIEW 3: ADMIN LOGIN (/admin/login) & ADD PRODUCT (/admin/add-product) */}
        {(currentView === 'admin-login' || ((currentView === 'admin-add-product' || currentView === 'admin') && !isAdminLoggedIn)) && (
          <div className="min-h-[calc(100vh-140px)] bg-[#faf9f6] flex items-center justify-center px-6 py-16">
            <div className="w-full max-w-md">
              <button
                type="button"
                onClick={handleBackToStorefront}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#737373] hover:text-[#111111] transition-colors mb-8 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Storefront</span>
              </button>

              <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)] p-8 sm:p-10">
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="w-11 h-11 rounded-full bg-[#faf9f6] border border-[#e5e5e5] flex items-center justify-center mb-4">
                    <Lock className="w-4 h-4 text-[#111111]" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#737373] font-semibold">
                    Aesthetic Piece &middot; /admin/login
                  </span>
                  <h1 className="font-serif text-3xl text-[#111111] font-normal mt-1.5 tracking-tight">
                    Admin Sign In
                  </h1>
                  <p className="text-xs text-[#737373] font-light mt-2 leading-relaxed">
                    Sign in with your authorized administrator email and password to access Add Product.
                  </p>
                </div>

                {adminLoginError && (
                  <div className="mb-6 p-3.5 rounded-xl bg-[#fef2f2] border border-[#fecaca] text-xs text-[#991b1b] text-center">
                    {adminLoginError}
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setAdminLoginError('');
                    const trimmedEmail = adminLoginEmail.trim().toLowerCase();

                    if (!trimmedEmail || !adminLoginPassword) {
                      setAdminLoginError('Please enter both your email and password.');
                      return;
                    }

                    const expectedEmail = (registeredAdmin?.email || 'admin@aestheticpiece.com').toLowerCase();
                    const expectedPassword = registeredAdmin?.password || 'change-this-secure-password';

                    if (trimmedEmail !== expectedEmail || adminLoginPassword !== expectedPassword) {
                      setAdminLoginError('Invalid email or password. Access denied.');
                      return;
                    }

                    setIsAdminLoggedIn(true);
                    setAdminLoginPassword('');
                    setCurrentView('admin-add-product');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="preview-admin-email"
                      className="block text-[11px] uppercase tracking-[0.2em] text-[#525252] font-semibold mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="preview-admin-email"
                      type="email"
                      required
                      value={adminLoginEmail}
                      onChange={(e) => setAdminLoginEmail(e.target.value)}
                      placeholder="admin@aestheticpiece.com"
                      className="w-full px-4 py-3 text-sm bg-[#faf9f6] border border-[#e5e5e5] rounded-xl text-[#111111] placeholder-[#a3a3a3] focus:outline-none focus:border-[#111111] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="preview-admin-password"
                      className="block text-[11px] uppercase tracking-[0.2em] text-[#525252] font-semibold mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="preview-admin-password"
                        type={showAdminPassword ? 'text' : 'password'}
                        required
                        value={adminLoginPassword}
                        onChange={(e) => setAdminLoginPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-4 py-3 pr-11 text-sm bg-[#faf9f6] border border-[#e5e5e5] rounded-xl text-[#111111] placeholder-[#a3a3a3] focus:outline-none focus:border-[#111111] focus:bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAdminPassword((prev) => !prev)}
                        aria-label={showAdminPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#737373] hover:text-[#111111] transition-colors cursor-pointer"
                      >
                        {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-[#111111] hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-sm active:scale-[0.99] cursor-pointer mt-2"
                  >
                    Login
                  </button>
                </form>

                <div className="mt-6 pt-5 border-t border-[#f0ede6] text-center text-[11px] text-[#737373] font-light">
                  Redirects directly to <span className="font-mono text-[#111111]">/admin/add-product</span> upon sign-in.
                </div>
              </div>
            </div>
          </div>
        )}

        {(currentView === 'admin-add-product' || currentView === 'admin') && isAdminLoggedIn && (
          <div className="py-12 sm:py-16 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Navigation & Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#e5e5e5]">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#737373] mb-2">
                    <button
                      type="button"
                      onClick={handleBackToStorefront}
                      className="hover:text-[#111111] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Storefront</span>
                    </button>
                    <span>/</span>
                    <span className="text-[#111111] font-medium">
                      {currentView === 'admin-add-product' ? 'Add Product' : 'Administration'}
                    </span>
                  </div>
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal flex flex-wrap items-center gap-3">
                    <span>{currentView === 'admin-add-product' ? 'Add New Product' : 'Admin & Product Management'}</span>
                    <span className="text-xs font-sans tracking-widest uppercase bg-[#111111] text-white px-2.5 py-1 rounded-full">
                      {currentView === 'admin-add-product' ? '/admin/add-product' : 'SQLite · Prisma'}
                    </span>
                  </h1>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentView(currentView === 'admin-add-product' ? 'admin' : 'admin-add-product')
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs uppercase tracking-wider text-[#111111] bg-white border border-[#e5e5e5] rounded-full hover:bg-[#f5f3ef] transition-colors cursor-pointer"
                  >
                    <span>
                      {currentView === 'admin-add-product' ? 'Admin Dashboard' : '+ Add Product'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentView('code')}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs uppercase tracking-wider text-[#111111] bg-white border border-[#e5e5e5] rounded-full hover:bg-[#f5f3ef] transition-colors cursor-pointer"
                  >
                    <FileCode className="w-3.5 h-3.5 text-[#737373]" />
                    <span>View Next.js Files</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminLoggedIn(false);
                      setAdminLoginEmail('');
                      setAdminLoginPassword('');
                      setCurrentView('admin-login');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs uppercase tracking-wider text-white bg-[#111111] hover:bg-black rounded-full transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
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
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#242424] border border-[#3a3a3a] text-[#d4d4d4] hover:bg-[#faf9f6] hover:text-[#111111] hover:border-[#faf9f6] transition-all"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com/aestheticpiece"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title="Facebook"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#242424] border border-[#3a3a3a] text-[#d4d4d4] hover:bg-[#faf9f6] hover:text-[#111111] hover:border-[#faf9f6] transition-all"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://tiktok.com/@aestheticpiece"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    title="TikTok"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#242424] border border-[#3a3a3a] text-[#d4d4d4] hover:bg-[#faf9f6] hover:text-[#111111] hover:border-[#faf9f6] transition-all"
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
                onClick={() => {
                  setAdminLoginError('');
                  setAdminLoginEmail('');
                  setAdminLoginPassword('');
                  setIsAdminLoggedIn(false);
                  setCurrentView('admin-login');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
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

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
