'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, Mail, Eye, EyeOff, AlertCircle, ShieldCheck } from 'lucide-react';
import {
  clearInMemoryAdminSession,
  grantInMemoryAdminSession,
} from '@/lib/admin-memory-auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Always clear any prior session when opening /admin/login so credentials are required every time
  useEffect(() => {
    clearInMemoryAdminSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Invalid email or password.');
        setIsLoading(false);
        return;
      }

      grantInMemoryAdminSession(data.user?.email || email.trim());
      router.push(data.redirectTo || '/admin/add-product');
    } catch {
      setError('Unable to reach authentication server. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#faf9f6] flex flex-col items-center justify-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-md">
        {/* Back to Storefront */}
        <div className="mb-8 flex justify-center">
          <Link
            href="/"
            onClick={() => clearInMemoryAdminSession()}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#737373] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </Link>
        </div>

        {/* Minimal Editorial Login Card */}
        <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#faf9f6] border border-[#e5e5e5] mb-4">
              <ShieldCheck className="w-5 h-5 text-[#111111] stroke-[1.5]" />
            </div>
            <span className="block text-[11px] uppercase tracking-[0.25em] text-[#737373] font-medium">
              Aesthetic Piece &middot; Curator Access
            </span>
            <h1 className="font-serif text-3xl text-[#111111] font-normal mt-2 tracking-tight">
              Admin Sign In
            </h1>
            <p className="mt-2 text-xs text-[#737373] font-light leading-relaxed">
              Sign in with your authorized administrator email and password to access the dashboard.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-[#fdf2f2] border border-[#f5c6cb] text-[#842029] flex items-start gap-2.5 text-xs leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-[11px] uppercase tracking-[0.18em] text-[#525252] font-medium mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#a3a3a3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf9f6] border border-[#e5e5e5] text-sm text-[#111111] placeholder-[#a3a3a3] focus:outline-none focus:border-[#111111] focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-[11px] uppercase tracking-[0.18em] text-[#525252] font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#a3a3a3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#faf9f6] border border-[#e5e5e5] text-sm text-[#111111] placeholder-[#a3a3a3] focus:outline-none focus:border-[#111111] focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#111111] p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-full bg-[#111111] hover:bg-black text-white text-xs uppercase tracking-[0.22em] font-medium transition-all disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {isLoading ? 'Signing In...' : 'Login'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[11px] text-[#737373] font-light">
          Credentials are verified per visit and cleared automatically upon leaving admin pages.
        </p>
      </div>
    </div>
  );
}
