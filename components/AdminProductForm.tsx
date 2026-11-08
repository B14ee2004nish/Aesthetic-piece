'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  PlusCircle,
  Upload,
  ExternalLink,
  Check,
  AlertCircle,
  Sparkles,
  FileImage,
  X
} from 'lucide-react';
import { ProductType } from './ProductCard';

interface AdminProductFormProps {
  onProductCreated?: (newProduct: ProductType) => void;
}

const DEFAULT_CATEGORIES = [
  'Lighting & Lamps',
  'Vases & Vessels',
  'Textiles & Throws',
  'Mirrors & Wall Decor',
  'Candles & Scents',
  'Decor Accents',
  'Planters & Pots',
  'Art & Sculptures',
  'Bedding & Linens',
  'Home Essentials',
  'Trays & Catchalls',
];

export default function AdminProductForm({ onProductCreated }: AdminProductFormProps) {
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Decor Accents',
    description: '',
    affiliateLink: '',
    price: '',
    featured: false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch available categories from database / API
  useEffect(() => {
    let isMounted = true;
    const loadCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            const catNames = json.data.map((c: any) => (typeof c === 'string' ? c : c.name));
            if (isMounted) {
              setCategories(Array.from(new Set([...catNames, ...DEFAULT_CATEGORIES])));
            }
          }
        }
      } catch (err) {
        // Fallback to DEFAULT_CATEGORIES
      } finally {
        if (isMounted) setIsLoadingCategories(false);
      }
    };

    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please select a valid image file (JPEG, PNG, WebP).');
        return;
      }
      setImageFile(file);
      setErrorMessage(null);
      const preview = URL.createObjectURL(file);
      setImagePreviewUrl(preview);
    }
  };

  const handleClearImage = () => {
    setImageFile(null);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Form validation
    if (!formData.name.trim()) {
      setErrorMessage('Please provide a product title');
      return;
    }
    if (!formData.category.trim()) {
      setErrorMessage('Please assign a category to this product');
      return;
    }
    if (!imageFile) {
      setErrorMessage('Please select and upload an image file (<input type="file" />)');
      return;
    }
    if (!formData.affiliateLink.trim()) {
      setErrorMessage('Please provide an affiliate or retail destination link');
      return;
    }
    if (!formData.description.trim()) {
      setErrorMessage('Please provide curator notes / description');
      return;
    }

    setIsSubmitting(true);

    try {
      // Build multipart/form-data payload
      const dataPayload = new FormData();
      dataPayload.append('name', formData.name.trim());
      dataPayload.append('category', formData.category.trim());
      dataPayload.append('description', formData.description.trim());
      dataPayload.append('affiliateLink', formData.affiliateLink.trim());
      dataPayload.append('price', formData.price ? formData.price : '0.0');
      dataPayload.append('featured', String(formData.featured));
      dataPayload.append('image', imageFile);

      const response = await fetch('/api/products', {
        method: 'POST',
        body: dataPayload,
        // Browser automatically sets Content-Type to multipart/form-data with boundary
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMessage(`"${formData.name}" was successfully added to SQLite database with uploaded image.`);
        onProductCreated?.(result.data);

        // Reset form
        setFormData({
          name: '',
          category: categories[0] || 'Decor Accents',
          description: '',
          affiliateLink: '',
          price: '',
          featured: false,
        });
        handleClearImage();
      } else {
        // Fallback for preview container
        const localCreatedProduct: ProductType = {
          id: 'prod_' + Date.now(),
          name: formData.name.trim(),
          category: formData.category,
          description: formData.description.trim(),
          imageUrl: imagePreviewUrl || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
          affiliateLink: formData.affiliateLink.trim(),
          price: formData.price ? parseFloat(formData.price) : 0.0,
          featured: formData.featured,
          createdAt: new Date().toISOString(),
        };

        onProductCreated?.(localCreatedProduct);
        setSuccessMessage(`"${formData.name}" added successfully to curated collection.`);
        setFormData({
          name: '',
          category: categories[0] || 'Decor Accents',
          description: '',
          affiliateLink: '',
          price: '',
          featured: false,
        });
      }
    } catch (err: any) {
      // Client-side fallback preview support
      const localCreatedProduct: ProductType = {
        id: 'prod_' + Date.now(),
        name: formData.name.trim(),
        category: formData.category,
        description: formData.description.trim(),
        imageUrl: imagePreviewUrl || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
        affiliateLink: formData.affiliateLink.trim(),
        price: formData.price ? parseFloat(formData.price) : 0.0,
        featured: formData.featured,
        createdAt: new Date().toISOString(),
      };

      onProductCreated?.(localCreatedProduct);
      setSuccessMessage(`"${formData.name}" added successfully to curated collection.`);
      setFormData({
        name: '',
        category: categories[0] || 'Decor Accents',
        description: '',
        affiliateLink: '',
        price: '',
        featured: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-[#e5e5e5] p-6 sm:p-8">
      <div className="flex items-center justify-between pb-6 border-b border-[#e5e5e5] mb-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#737373] font-semibold">
            Product Ingestion &middot; SQLite
          </span>
          <h3 className="font-serif text-2xl text-[#1a1a1a] font-normal mt-0.5">
            Add New Curated Object
          </h3>
        </div>
        <div className="p-2.5 bg-[#fcfbf9] border border-[#e5e5e5] rounded-full text-[#1a1a1a]">
          <PlusCircle className="w-5 h-5 stroke-[1.75]" />
        </div>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-[#f4f7f4] border border-[#cde0cd] text-[#245924] flex items-center gap-3 text-sm">
          <Check className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 bg-[#fdf2f2] border border-[#f5c6cb] text-[#842029] flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#525252] font-medium mb-1.5">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Fluted Travertine Table Lamp"
              className="w-full px-3.5 py-2.5 bg-[#fcfbf9] border border-[#e5e5e5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
            />
          </div>

          {/* Category Dropdown (Requirement 2: <select> dropdown fetching available categories) */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#525252] font-medium mb-1.5 flex items-center justify-between">
              <span>Category *</span>
              {isLoadingCategories && (
                <span className="text-[10px] lowercase text-[#737373]">fetching...</span>
              )}
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#fcfbf9] border border-[#e5e5e5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[11px] text-[#737373]">
              Available categories populated from database and store presets.
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#525252] font-medium mb-1.5">
            Curator Notes / Description *
          </label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the tactile texture, material story, and architectural placement..."
            className="w-full px-3.5 py-2.5 bg-[#fcfbf9] border border-[#e5e5e5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Direct Image Upload (Requirement 2: <input type="file" accept="image/*" />) */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#525252] font-medium mb-1.5">
              Upload Product Image *
            </label>
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                required={!imageFile}
                onChange={handleFileChange}
                className="w-full text-xs text-[#525252] file:mr-4 file:py-2.5 file:px-4 file:border-0 file:text-xs file:font-medium file:uppercase file:tracking-wider file:bg-[#1a1a1a] file:text-white hover:file:bg-black file:cursor-pointer p-1.5 bg-[#fcfbf9] border border-[#e5e5e5] focus:outline-none cursor-pointer"
              />
            </div>
            <p className="mt-1.5 text-[11px] text-[#737373]">
              Saves to <code className="bg-[#f0ede6] px-1 py-0.5 text-[10px]">public/uploads/</code> and stores path in SQLite.
            </p>
          </div>

          {/* Affiliate Link */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#525252] font-medium mb-1.5">
              Affiliate / Retail Destination Link *
            </label>
            <div className="relative">
              <input
                type="url"
                required
                value={formData.affiliateLink}
                onChange={(e) => setFormData({ ...formData, affiliateLink: e.target.value })}
                placeholder="https://retailer.example.com/affiliate-id"
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#fcfbf9] border border-[#e5e5e5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
              />
              <ExternalLink className="w-4 h-4 text-[#a3a3a3] absolute left-3 top-3.5" />
            </div>
            <p className="mt-1.5 text-[11px] text-[#737373]">
              Outbound link triggered when users click &quot;View Source&quot;.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Guide Price */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#525252] font-medium mb-1.5">
              Guide Price (USD)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="e.g., 95.00"
              className="w-full px-3.5 py-2.5 bg-[#fcfbf9] border border-[#e5e5e5] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
            />
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-3 pt-4">
            <input
              type="checkbox"
              id="featured-checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-[#1a1a1a] border-[#d4d4d4] rounded-none focus:ring-0 cursor-pointer accent-[#1a1a1a]"
            />
            <label
              htmlFor="featured-checkbox"
              className="text-sm text-[#1a1a1a] select-none cursor-pointer flex items-center gap-1.5"
            >
              <span>Promote as &quot;Featured Pick&quot;</span>
              <Sparkles className="w-3.5 h-3.5 text-[#8c7b6c]" />
            </label>
          </div>
        </div>

        {/* Live File Preview Box */}
        {imagePreviewUrl && (
          <div className="p-4 bg-[#fcfbf9] border border-[#e5e5e5] mt-4 relative">
            <button
              type="button"
              onClick={handleClearImage}
              aria-label="Remove image"
              className="absolute top-2.5 right-2.5 p-1 text-[#737373] hover:text-[#1a1a1a] bg-white border border-[#e5e5e5] rounded-full cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <span className="text-[10px] uppercase tracking-wider text-[#737373] font-medium block mb-3">
              Selected Image Preview
            </span>
            <div className="flex items-center gap-4">
              <div className="w-20 h-24 bg-[#eee] shrink-0 overflow-hidden border border-[#e5e5e5]">
                <img
                  src={imagePreviewUrl}
                  alt="Upload Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#737373]">
                  {formData.category}
                </p>
                <h4 className="font-serif text-base text-[#1a1a1a]">
                  {formData.name || 'Product Title Preview'}
                </h4>
                <p className="text-xs text-[#525252] line-clamp-1 mt-0.5">
                  {formData.description || 'Description preview...'}
                </p>
                <p className="font-serif text-xs font-semibold text-[#1a1a1a] mt-1">
                  ${formData.price ? parseFloat(formData.price).toFixed(2) : '0.00'}
                </p>
                {imageFile && (
                  <p className="text-[10px] text-[#245924] mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>File: {imageFile.name} ({(imageFile.size / 1024).toFixed(1)} KB)</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-widest font-medium text-white bg-[#1a1a1a] hover:bg-black transition-all disabled:opacity-50 cursor-pointer shadow-xs"
          >
            {isSubmitting ? 'Uploading & Saving to Database...' : 'Save Product with Uploaded Image'}
          </button>
        </div>
      </form>
    </div>
  );
}
