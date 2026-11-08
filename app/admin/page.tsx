'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Database, Plus, RefreshCw, ExternalLink, ShieldCheck, Sparkles, Layers, CheckCircle } from 'lucide-react';
import AdminProductForm from '@/components/AdminProductForm';
import { ProductType } from '@/components/ProductCard';

const initialItems: ProductType[] = [
  {
    id: 'prod_1',
    name: 'Zen Basalt Stone Fountain',
    category: 'Decor Accents',
    description: 'Handcrafted natural basalt stone water fountain with gentle cascading stream, bringing calming acoustic ambiance to living sanctuaries.',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://aestheticpiece.example.com/item/zen-basalt-fountain',
    price: 185.0,
    featured: true,
  },
  {
    id: 'prod_2',
    name: 'Fluted Ceramic Vase',
    category: 'Vases & Vessels',
    description: 'Sculptural ribbed ceramic vessel with an unglazed matte chalk finish, designed to display dry florals or make a quiet statement.',
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
    description: 'Slim antique brass arched mantle mirror crafted from iron and distortion-free hand-finished glass, catching natural light across entryways.',
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

export default function AdminPage() {
  const [products, setProducts] = useState<ProductType[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'inventory'>('create');

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setProducts(json.data);
        }
      }
    } catch (err) {
      console.warn('Using client-side fallback list for admin items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductCreated = (newProduct: ProductType) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const totalFeatured = products.filter((p) => p.featured).length;
  const categoriesCount = new Set(products.map((p) => p.category)).size;

  return (
    <div className="py-12 sm:py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#e5e5e5]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#737373] mb-2">
              <Link href="/" className="hover:text-[#1a1a1a] transition-colors flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Storefront</span>
              </Link>
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

          <button
            type="button"
            onClick={fetchProducts}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider text-[#1a1a1a] bg-white border border-[#e5e5e5] hover:bg-[#f5f3ef] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync Catalog</span>
          </button>
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
                {categoriesCount}
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
                {totalFeatured}
              </span>
              <span className="text-xs text-[#8c7b6c]">Promoted on hero</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#e5e5e5] mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('create')}
            className={`pb-3 px-6 text-xs uppercase tracking-widest font-medium transition-colors border-b-2 cursor-pointer ${
              activeTab === 'create'
                ? 'border-[#1a1a1a] text-[#1a1a1a]'
                : 'border-transparent text-[#737373] hover:text-[#1a1a1a]'
            }`}
          >
            Add New Product
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 px-6 text-xs uppercase tracking-widest font-medium transition-colors border-b-2 cursor-pointer ${
              activeTab === 'inventory'
                ? 'border-[#1a1a1a] text-[#1a1a1a]'
                : 'border-transparent text-[#737373] hover:text-[#1a1a1a]'
            }`}
          >
            Manage Existing Catalog ({products.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'create' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <AdminProductForm onProductCreated={handleProductCreated} />
            </div>

            {/* Side Information: Prisma & Terminal Commands */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-[#e5e5e5] p-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#1a1a1a] font-semibold mb-3">
                  <Database className="w-4 h-4 text-[#8c7b6c]" />
                  <span>Prisma & SQLite Setup</span>
                </div>
                <p className="text-xs text-[#525252] leading-relaxed mb-4">
                  The application uses Prisma ORM connected to local SQLite database (<code className="bg-[#f0ede6] px-1 py-0.5 text-[11px]">prisma/dev.db</code>).
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
                  <span>Curator Checklist</span>
                </h4>
                <ul className="text-xs text-[#525252] space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#245924] shrink-0 mt-0.5" />
                    <span>Upload image files directly to save locally into public/uploads/.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#245924] shrink-0 mt-0.5" />
                    <span>Valid affiliate URL or source link for user outbound clicks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#245924] shrink-0 mt-0.5" />
                    <span>Select from database categories via the assign dropdown.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* Inventory Table */
          <div className="bg-white border border-[#e5e5e5] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#e5e5e5] bg-[#fcfbf9] text-[#737373] uppercase tracking-wider font-medium text-[10px]">
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Featured</th>
                    <th className="py-3 px-4">Affiliate Destination</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e5e5]">
                  {products.map((item) => (
                    <tr key={item.id} className="hover:bg-[#faf9f6] transition-colors">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-10 h-10 object-cover border border-[#e5e5e5] shrink-0"
                        />
                        <div>
                          <p className="font-serif text-sm font-medium text-[#1a1a1a]">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-[#737373] line-clamp-1 max-w-xs font-light">
                            {item.description}
                          </p>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#525252] font-medium whitespace-nowrap">
                        {item.category}
                      </td>
                      <td className="py-3.5 px-4 text-[#1a1a1a] font-serif whitespace-nowrap">
                        ${item.price ? Number(item.price).toFixed(2) : '0.00'}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {item.featured ? (
                          <span className="inline-block bg-[#1a1a1a] text-white text-[9px] uppercase tracking-wider px-2 py-0.5">
                            Featured
                          </span>
                        ) : (
                          <span className="text-[#a3a3a3]">Standard</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <a
                          href={item.affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#1a1a1a] hover:underline"
                        >
                          <span className="truncate max-w-[160px]">{item.affiliateLink}</span>
                          <ExternalLink className="w-3 h-3 text-[#737373]" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
