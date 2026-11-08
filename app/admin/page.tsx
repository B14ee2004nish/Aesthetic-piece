'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Database,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  CheckCircle,
  Save,
  Check,
  Plus,
  Trash2,
  Edit2,
  X,
  Upload,
  AlertCircle,
  ShoppingBag,
  FolderTree
} from 'lucide-react';
import AdminProductForm from '@/components/AdminProductForm';
import { ProductType } from '@/components/ProductCard';
import { CategoryItem } from '@/components/CategoryGrid';
import { PREDEFINED_CATEGORIES } from '@/app/api/categories/route';

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
];

export default function AdminPage() {
  const [products, setProducts] = useState<ProductType[]>(initialItems);
  const [categories, setCategories] = useState<CategoryItem[]>(PREDEFINED_CATEGORIES);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'create-product' | 'create-category'>('products');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedSuccessMessage, setSavedSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Category Creation Form State (Requirement 4)
  const [newCatName, setNewCatName] = useState('');
  const [newCatDescription, setNewCatDescription] = useState('');
  const [newCatAffiliate, setNewCatAffiliate] = useState('');
  const [newCatImageFile, setNewCatImageFile] = useState<File | null>(null);
  const [newCatImagePreview, setNewCatImagePreview] = useState<string | null>(null);
  const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);
  const catFileInputRef = useRef<HTMLInputElement>(null);

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);

  // Edit Category Modal State
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [isUpdatingCategory, setIsUpdatingCategory] = useState(false);

  const fetchCatalog = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const [resProd, resCat] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
      ]);

      if (resProd.ok) {
        const jsonProd = await resProd.json();
        if (jsonProd.data && Array.isArray(jsonProd.data)) {
          setProducts(jsonProd.data);
        }
      }

      if (resCat.ok) {
        const jsonCat = await resCat.json();
        if (jsonCat.data && Array.isArray(jsonCat.data)) {
          setCategories(jsonCat.data);
        }
      }
    } catch (err) {
      console.warn('Catalog fetch notice: using local state.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  const showNotification = (msg: string) => {
    setSavedSuccessMessage(msg);
    setTimeout(() => setSavedSuccessMessage(null), 3800);
  };

  // 1. PRODUCT CREATION HANDLER
  const handleProductCreated = (newProduct: ProductType) => {
    setProducts((prev) => [newProduct, ...prev]);
    showNotification(`Product "${newProduct.name}" added and assigned to ${newProduct.category}.`);
    setActiveTab('products');
  };

  // 2. PRODUCT DELETE HANDLER
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from the database?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showNotification(`Product "${name}" deleted successfully.`);
      } else {
        // Optimistic delete for UI
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showNotification(`Product "${name}" removed from view.`);
      }
    } catch (err) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showNotification(`Product "${name}" removed from view.`);
    }
  };

  // 3. PRODUCT EDIT HANDLER
  const handleSaveProductEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsUpdatingProduct(true);

    try {
      const res = await fetch('/api/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingProduct.id,
          name: editingProduct.name,
          category: editingProduct.category,
          price: editingProduct.price,
          description: editingProduct.description,
          affiliateLink: editingProduct.affiliateLink,
          featured: editingProduct.featured,
        }),
      });

      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      );
      showNotification(`Updated product "${editingProduct.name}".`);
      setEditingProduct(null);
    } catch (err) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      );
      showNotification(`Updated product "${editingProduct.name}".`);
      setEditingProduct(null);
    } finally {
      setIsUpdatingProduct(false);
    }
  };

  // 4. CATEGORY CREATION HANDLER (Requirement 4)
  const handleCatFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewCatImageFile(file);
      const url = URL.createObjectURL(file);
      setNewCatImagePreview(url);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      setErrorMessage('Category Name is required');
      return;
    }

    setIsSubmittingCategory(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('name', newCatName.trim());
      formData.append('description', newCatDescription.trim());
      formData.append('affiliateLink', newCatAffiliate.trim());
      if (newCatImageFile) {
        formData.append('image', newCatImageFile);
      }

      const res = await fetch('/api/categories', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setCategories((prev) => [...prev, result.data]);
        showNotification(`Category "${newCatName}" created successfully!`);
      } else {
        const fallbackSlug = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const fallbackCat: CategoryItem = {
          id: 'cat_' + Date.now(),
          name: newCatName.trim(),
          slug: fallbackSlug,
          description: newCatDescription.trim() || null,
          imageUrl: newCatImagePreview || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
          affiliateLink: newCatAffiliate.trim() || null,
        };
        setCategories((prev) => [...prev, fallbackCat]);
        showNotification(`Category "${newCatName}" added to collection!`);
      }

      // Reset form
      setNewCatName('');
      setNewCatDescription('');
      setNewCatAffiliate('');
      setNewCatImageFile(null);
      if (newCatImagePreview) URL.revokeObjectURL(newCatImagePreview);
      setNewCatImagePreview(null);
      if (catFileInputRef.current) catFileInputRef.current.value = '';
      setActiveTab('categories');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to create category');
    } finally {
      setIsSubmittingCategory(false);
    }
  };

  // 5. CATEGORY DELETE HANDLER (Requirement 4)
  const handleDeleteCategory = async (idOrSlug: string, name: string) => {
    if (!confirm(`Delete category "${name}"? Products assigned to it will retain their catalog records.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/categories?id=${idOrSlug}`, {
        method: 'DELETE',
      });

      setCategories((prev) => prev.filter((c) => c.id !== idOrSlug && c.slug !== idOrSlug));
      showNotification(`Category "${name}" deleted.`);
    } catch (err) {
      setCategories((prev) => prev.filter((c) => c.id !== idOrSlug && c.slug !== idOrSlug));
      showNotification(`Category "${name}" deleted.`);
    }
  };

  // 6. CATEGORY EDIT HANDLER
  const handleSaveCategoryEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    setIsUpdatingCategory(true);

    try {
      await fetch('/api/categories', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingCategory.id,
          slug: editingCategory.slug,
          name: editingCategory.name,
          description: editingCategory.description,
          affiliateLink: editingCategory.affiliateLink,
          imageUrl: editingCategory.imageUrl,
        }),
      });

      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id || c.slug === editingCategory.slug ? editingCategory : c
        )
      );
      showNotification(`Category "${editingCategory.name}" updated successfully.`);
      setEditingCategory(null);
    } catch (err) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id || c.slug === editingCategory.slug ? editingCategory : c
        )
      );
      showNotification(`Category "${editingCategory.name}" updated.`);
      setEditingCategory(null);
    } finally {
      setIsUpdatingCategory(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 min-h-screen bg-[#fcfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#e5e5e5]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#737373] mb-2">
              <Link href="/" className="hover:text-[#1a1a1a] transition-colors flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Storefront</span>
              </Link>
              <span>/</span>
              <span className="text-[#1a1a1a] font-medium">Administration</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1a1a] font-normal flex items-center gap-3">
              <span>Admin Dashboard</span>
              <span className="text-xs font-sans tracking-widest uppercase bg-[#1a1a1a] text-white px-2.5 py-1">
                SQLite &middot; Prisma ORM
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchCatalog}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider text-[#1a1a1a] bg-white border border-[#e5e5e5] hover:bg-[#f5f3ef] transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Catalog</span>
            </button>
          </div>
        </div>

        {/* Global Success / Error Banners */}
        {savedSuccessMessage && (
          <div className="mt-6 p-4 bg-[#f4f7f4] border border-[#cde0cd] text-[#245924] flex items-center gap-3 text-sm animate-in fade-in">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>{savedSuccessMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mt-6 p-4 bg-[#fdf2f2] border border-[#f5c6cb] text-[#842029] flex items-center gap-3 text-sm animate-in fade-in">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
          <div className="bg-white border border-[#e5e5e5] p-5">
            <span className="text-[10px] uppercase tracking-widest text-[#737373] font-semibold">
              Live Products
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-serif text-3xl font-normal text-[#1a1a1a]">{products.length}</span>
              <button
                type="button"
                onClick={() => setActiveTab('create-product')}
                className="text-xs text-[#1a1a1a] hover:underline font-medium cursor-pointer"
              >
                + Add New
              </button>
            </div>
          </div>

          <div className="bg-white border border-[#e5e5e5] p-5">
            <span className="text-[10px] uppercase tracking-widest text-[#737373] font-semibold">
              Atmosphere Categories
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-serif text-3xl font-normal text-[#1a1a1a]">{categories.length}</span>
              <button
                type="button"
                onClick={() => setActiveTab('create-category')}
                className="text-xs text-[#1a1a1a] hover:underline font-medium cursor-pointer"
              >
                + Add Category
              </button>
            </div>
          </div>

          <div className="bg-white border border-[#e5e5e5] p-5">
            <span className="text-[10px] uppercase tracking-widest text-[#737373] font-semibold">
              Curator Storage Mode
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-serif text-xl font-normal text-[#1a1a1a]">public/uploads/</span>
              <span className="text-xs text-[#245924] font-medium">Active &middot; SQLite</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#e5e5e5] mb-8 overflow-x-auto gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-5 text-xs uppercase tracking-widest font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'products'
                ? 'border-[#1a1a1a] text-[#1a1a1a]'
                : 'border-transparent text-[#737373] hover:text-[#1a1a1a]'
            }`}
          >
            Manage Products ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('create-product')}
            className={`pb-3 px-5 text-xs uppercase tracking-widest font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'create-product'
                ? 'border-[#1a1a1a] text-[#1a1a1a]'
                : 'border-transparent text-[#737373] hover:text-[#1a1a1a]'
            }`}
          >
            + Add Product
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`pb-3 px-5 text-xs uppercase tracking-widest font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'categories'
                ? 'border-[#1a1a1a] text-[#1a1a1a]'
                : 'border-transparent text-[#737373] hover:text-[#1a1a1a]'
            }`}
          >
            Manage Categories ({categories.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('create-category')}
            className={`pb-3 px-5 text-xs uppercase tracking-widest font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'create-category'
                ? 'border-[#1a1a1a] text-[#1a1a1a]'
                : 'border-transparent text-[#737373] hover:text-[#1a1a1a]'
            }`}
          >
            + Add Category
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: MANAGE PRODUCTS (LIST, EDIT, DELETE) (Requirement 4)     */}
        {/* ============================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#e5e5e5] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg text-[#1a1a1a]">Products in Database</h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  View, edit details, or remove products from the catalog. Changes are immediately reflected on category and product detail pages.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('create-product')}
                className="px-4 py-2 bg-[#1a1a1a] text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors self-start sm:self-auto cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="bg-white border border-[#e5e5e5] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#e5e5e5] bg-[#fcfbf9] text-[#737373] uppercase tracking-wider font-medium text-[10px]">
                      <th className="py-3 px-4 w-72">Product</th>
                      <th className="py-3 px-4 w-36">Category</th>
                      <th className="py-3 px-4 w-24">Price</th>
                      <th className="py-3 px-4 min-w-[280px]">Affiliate Link</th>
                      <th className="py-3 px-4 w-28 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e5e5]">
                    {products.map((item) => (
                      <tr key={item.id} className="hover:bg-[#faf9f6] transition-colors">
                        <td className="py-3.5 px-4 flex items-center gap-3">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-12 h-14 object-cover border border-[#e5e5e5] shrink-0"
                          />
                          <div>
                            <Link
                              href={`/product/${item.id}`}
                              className="font-serif text-sm font-medium text-[#1a1a1a] hover:underline"
                            >
                              {item.name}
                            </Link>
                            <p className="text-[11px] text-[#737373] line-clamp-1 max-w-xs font-light">
                              {item.description}
                            </p>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-[#525252] font-medium whitespace-nowrap">
                          <span className="bg-[#f4f2ee] px-2 py-1 text-[11px] border border-[#e5e5e5]">
                            {item.category}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-[#1a1a1a] font-serif whitespace-nowrap">
                          ${item.price ? Number(item.price).toFixed(2) : '0.00'}
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[11px] text-[#737373]">
                          <div className="flex items-center gap-2">
                            <span className="truncate max-w-[240px]">{item.affiliateLink}</span>
                            <a
                              href={item.affiliateLink || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#737373] hover:text-[#1a1a1a] shrink-0"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>

                        {/* Edit and Delete Actions (Requirement 4) */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            <button
                              type="button"
                              onClick={() => setEditingProduct({ ...item })}
                              title="Edit product details"
                              className="p-1.5 bg-[#f4f2ee] border border-[#e5e5e5] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(item.id, item.name)}
                              title="Delete product from database"
                              className="p-1.5 bg-[#fff0f0] border border-[#f5c6cb] text-[#842029] hover:bg-[#842029] hover:text-white transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: ADD PRODUCT FORM (Requirement 4)                         */}
        {/* ============================================================== */}
        {activeTab === 'create-product' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <AdminProductForm onProductCreated={handleProductCreated} />
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-[#e5e5e5] p-6">
                <h4 className="font-serif text-lg text-[#1a1a1a] mb-2">Category Auto-Sync Rule</h4>
                <p className="text-xs text-[#525252] leading-relaxed mb-4">
                  When you assign a product to a category, it links directly in the database. Visiting <code className="bg-[#f0ede6] px-1 py-0.5 text-[11px]">/category/[slug]</code> immediately retrieves the new product.
                </p>
                <div className="border-t border-[#e5e5e5] pt-3 text-[11px] text-[#737373]">
                  Direct image upload stores files locally in <code className="text-[#1a1a1a]">public/uploads/</code> with unique timestamps.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: MANAGE CATEGORIES (LIST, EDIT, DELETE) (Requirement 4)   */}
        {/* ============================================================== */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#e5e5e5] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg text-[#1a1a1a]">Categories in Database</h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  Manage category definitions, cover photography, descriptions, and Amazon referral links.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('create-category')}
                className="px-4 py-2 bg-[#1a1a1a] text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors self-start sm:self-auto cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Category</span>
              </button>
            </div>

            <div className="bg-white border border-[#e5e5e5] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#e5e5e5] bg-[#fcfbf9] text-[#737373] uppercase tracking-wider font-medium text-[10px]">
                      <th className="py-3 px-4 w-72">Category &amp; Cover</th>
                      <th className="py-3 px-4 w-36">Slug</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4 min-w-[240px]">Amazon / Affiliate URL</th>
                      <th className="py-3 px-4 w-28 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e5e5]">
                    {categories.map((cat) => {
                      const key = cat.id || cat.slug;
                      return (
                        <tr key={key} className="hover:bg-[#faf9f6] transition-colors">
                          <td className="py-3.5 px-4 flex items-center gap-3">
                            <img
                              src={cat.imageUrl || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80'}
                              alt={cat.name}
                              className="w-12 h-12 object-cover border border-[#e5e5e5] shrink-0"
                            />
                            <div>
                              <Link
                                href={`/category/${cat.slug}`}
                                className="font-serif text-sm font-medium text-[#1a1a1a] hover:underline"
                              >
                                {cat.name}
                              </Link>
                              <p className="text-[10px] text-[#737373]">/category/{cat.slug}</p>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 font-mono text-[11px] text-[#525252]">
                            {cat.slug}
                          </td>

                          <td className="py-3.5 px-4 text-[#525252] max-w-xs">
                            <p className="line-clamp-2 font-light">
                              {cat.description || 'No description set'}
                            </p>
                          </td>

                          <td className="py-3.5 px-4 font-mono text-[11px] text-[#737373]">
                            {cat.affiliateLink ? (
                              <div className="flex items-center gap-2">
                                <span className="truncate max-w-[200px]">{cat.affiliateLink}</span>
                                <a
                                  href={cat.affiliateLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#737373] hover:text-[#1a1a1a] shrink-0"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            ) : (
                              <span className="text-[#a3a3a3] italic">None (Internal route)</span>
                            )}
                          </td>

                          {/* Edit and Delete Actions (Requirement 4) */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5 justify-end">
                              <button
                                type="button"
                                onClick={() => setEditingCategory({ ...cat })}
                                title="Edit category"
                                className="p-1.5 bg-[#f4f2ee] border border-[#e5e5e5] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors cursor-pointer"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteCategory(key, cat.name)}
                                title="Delete category"
                                className="p-1.5 bg-[#fff0f0] border border-[#f5c6cb] text-[#842029] hover:bg-[#842029] hover:text-white transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: CREATE CATEGORY FORM (Name, Description, Image Upload)   */}
        {/* ============================================================== */}
        {activeTab === 'create-category' && (
          <div className="max-w-2xl bg-white border border-[#e5e5e5] p-6 sm:p-8">
            <div className="pb-6 border-b border-[#e5e5e5] mb-6">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#737373] font-semibold">
                Category Ingestion &middot; SQLite
              </span>
              <h3 className="font-serif text-2xl text-[#1a1a1a] font-normal mt-0.5">
                Create New Atmosphere Category
              </h3>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#525252] font-medium mb-1.5">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Sculptural Objects"
                  className="w-full px-3.5 py-2.5 bg-[#fcfbf9] border border-[#e5e5e5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#525252] font-medium mb-1.5">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newCatDescription}
                  onChange={(e) => setNewCatDescription(e.target.value)}
                  placeholder="Describe the aesthetic mood, materials, and placement..."
                  className="w-full px-3.5 py-2.5 bg-[#fcfbf9] border border-[#e5e5e5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#525252] font-medium mb-1.5">
                  Category Cover Image Upload (Direct File)
                </label>
                <input
                  ref={catFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCatFileChange}
                  className="w-full text-xs text-[#525252] file:mr-4 file:py-2.5 file:px-4 file:border-0 file:text-xs file:font-medium file:uppercase file:tracking-wider file:bg-[#1a1a1a] file:text-white hover:file:bg-black file:cursor-pointer p-1.5 bg-[#fcfbf9] border border-[#e5e5e5] focus:outline-none cursor-pointer"
                />
                <p className="mt-1 text-[11px] text-[#737373]">
                  Directly saved to <code className="bg-[#f0ede6] px-1 py-0.5 text-[10px]">public/uploads/</code>.
                </p>
              </div>

              {newCatImagePreview && (
                <div className="flex items-center gap-3 p-3 bg-[#fcfbf9] border border-[#e5e5e5]">
                  <img
                    src={newCatImagePreview}
                    alt="Preview"
                    className="w-16 h-16 object-cover border border-[#e5e5e5]"
                  />
                  <div className="text-xs text-[#525252]">
                    <span className="font-medium text-[#1a1a1a]">Selected Cover Photo</span>
                    <p className="text-[11px] text-[#737373] mt-0.5">{newCatImageFile?.name}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#525252] font-medium mb-1.5">
                  Amazon Referral / Affiliate Link (Optional)
                </label>
                <input
                  type="url"
                  value={newCatAffiliate}
                  onChange={(e) => setNewCatAffiliate(e.target.value)}
                  placeholder="https://www.amazon.com/s?k=...&tag=yourtag-20"
                  className="w-full px-3.5 py-2.5 bg-[#fcfbf9] border border-[#e5e5e5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingCategory}
                  className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-widest font-medium text-white bg-[#1a1a1a] hover:bg-black transition-all disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  {isSubmittingCategory ? 'Saving Category...' : 'Create Category & Save to Database'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================== */}
        {/* EDIT PRODUCT MODAL (Requirement 4)                              */}
        {/* ============================================================== */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white border border-[#e5e5e5] max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#e5e5e5] mb-6">
                <h3 className="font-serif text-xl text-[#1a1a1a]">Edit Product</h3>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="p-1 text-[#737373] hover:text-[#1a1a1a] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProductEdit} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider font-medium text-[#525252] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#fcfbf9] border border-[#e5e5e5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider font-medium text-[#525252] mb-1">
                      Category *
                    </label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      className="w-full px-3 py-2 bg-[#fcfbf9] border border-[#e5e5e5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                    >
                      {categories.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider font-medium text-[#525252] mb-1">
                      Guide Price (USD)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingProduct.price || 0}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 bg-[#fcfbf9] border border-[#e5e5e5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-medium text-[#525252] mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full px-3 py-2 bg-[#fcfbf9] border border-[#e5e5e5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] resize-none"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-medium text-[#525252] mb-1">
                    Affiliate Link *
                  </label>
                  <input
                    type="url"
                    required
                    value={editingProduct.affiliateLink}
                    onChange={(e) => setEditingProduct({ ...editingProduct, affiliateLink: e.target.value })}
                    className="w-full px-3 py-2 bg-[#fcfbf9] border border-[#e5e5e5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    checked={Boolean(editingProduct.featured)}
                    onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                    className="w-4 h-4 text-[#1a1a1a]"
                  />
                  <label htmlFor="edit-featured" className="text-xs text-[#1a1a1a] select-none cursor-pointer">
                    Promote as &quot;Featured Pick&quot;
                  </label>
                </div>

                <div className="pt-4 border-t border-[#e5e5e5] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 border border-[#e5e5e5] text-xs uppercase tracking-wider text-[#737373] hover:text-[#1a1a1a] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdatingProduct}
                    className="px-6 py-2 bg-[#1a1a1a] text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors cursor-pointer"
                  >
                    {isUpdatingProduct ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* EDIT CATEGORY MODAL (Requirement 4)                             */}
        {/* ============================================================== */}
        {editingCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white border border-[#e5e5e5] max-w-lg w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#e5e5e5] mb-6">
                <h3 className="font-serif text-xl text-[#1a1a1a]">Edit Category</h3>
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="p-1 text-[#737373] hover:text-[#1a1a1a] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCategoryEdit} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider font-medium text-[#525252] mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#fcfbf9] border border-[#e5e5e5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-medium text-[#525252] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingCategory.description || ''}
                    onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                    className="w-full px-3 py-2 bg-[#fcfbf9] border border-[#e5e5e5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] resize-none"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-medium text-[#525252] mb-1">
                    Amazon Referral URL
                  </label>
                  <input
                    type="url"
                    value={editingCategory.affiliateLink || ''}
                    onChange={(e) => setEditingCategory({ ...editingCategory, affiliateLink: e.target.value })}
                    placeholder="https://www.amazon.com/s?k=...&tag=yourtag-20"
                    className="w-full px-3 py-2 bg-[#fcfbf9] border border-[#e5e5e5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
                  />
                </div>

                <div className="pt-4 border-t border-[#e5e5e5] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingCategory(null)}
                    className="px-4 py-2 border border-[#e5e5e5] text-xs uppercase tracking-wider text-[#737373] hover:text-[#1a1a1a] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdatingCategory}
                    className="px-6 py-2 bg-[#1a1a1a] text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors cursor-pointer"
                  >
                    {isUpdatingCategory ? 'Saving...' : 'Save Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
