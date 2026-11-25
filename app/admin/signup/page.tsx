'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  UserPlus,
  CheckCircle,
} from 'lucide-react';

export default function AdminSignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [alreadyConfigured, setAlreadyConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/auth/status')
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data?.authenticated) {
          router.replace('/admin');
          return;
        }
        setAlreadyConfigured(Boolean(data?.configured));
      })
      .catch(() => {
        // Allow form rendering if status check cannot be reached
      })
      .finally(() => {
        if (isMounted) setIsCheckingStatus(false);
      });

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (confirmPassword && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (response.status === 409) {
          setAlreadyConfigured(true);
        }
        setError(data.error || 'Unable to create admin account.');
        setIsLoading(false);
        return;
      }

      // Automatically logged in via HTTP-only cookie; go to Admin Dashboard
      router.push('/admin');
      router.refresh();
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
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#737373] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </Link>
        </div>

        {/* Minimal Editorial Sign-Up Card */}
        <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#faf9f6] border border-[#e5e5e5] mb-4">
              <UserPlus className="w-5 h-5 text-[#111111] stroke-[1.5]" />
            </div>
            <span className="block text-[11px] uppercase tracking-[0.25em] text-[#737373] font-medium">
              Aesthetic Piece &middot; First-Time Setup
            </span>
            <h1 className="font-serif text-3xl text-[#111111] font-normal mt-2 tracking-tight">
              Create Admin Account
            </h1>
            <p className="mt-2 text-xs text-[#737373] font-light leading-relaxed">
              Register your single administrator credentials to secure your dashboard and log in automatically.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-[#fdf2f2] border border-[#f5c6cb] text-[#842029] flex items-start gap-2.5 text-xs leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {isCheckingStatus ? (
            <div className="py-10 text-center text-xs text-[#737373]">
              Checking administrator setup...
            </div>
          ) : alreadyConfigured ? (
            <div className="text-center space-y-5 py-2">
              <div className="p-4 rounded-xl bg-[#faf9f6] border border-[#e5e5e5] text-xs text-[#525252] leading-relaxed flex flex-col items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#111111] stroke-[1.5]" />
                <p>
                  An administrator account is already registered for Aesthetic Piece. For security, only one admin account is permitted.
                </p>
              </div>
              <Link
                href="/admin/login"
                className="block w-full py-3.5 px-6 rounded-full bg-[#111111] hover:bg-black text-white text-xs uppercase tracking-[0.22em] font-medium transition-all text-center shadow-sm"
              >
                Go to Admin Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-[11px] uppercase tracking-[0.18em] text-[#525252] font-medium mb-2"
                >
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#a3a3a3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="signup-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@aestheticpiece.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf9f6] border border-[#e5e5e5] text-sm text-[#111111] placeholder-[#a3a3a3] focus:outline-none focus:border-[#111111] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-[11px] uppercase tracking-[0.18em] text-[#525252] font-medium mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#a3a3a3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
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

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="block text-[11px] uppercase tracking-[0.18em] text-[#525252] font-medium mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#a3a3a3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="signup-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf9f6] border border-[#e5e5e5] text-sm text-[#111111] placeholder-[#a3a3a3] focus:outline-none focus:border-[#111111] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-full bg-[#111111] hover:bg-black text-white text-xs uppercase tracking-[0.22em] font-medium transition-all disabled:opacity-50 cursor-pointer shadow-sm"
              >
                {isLoading ? 'Creating Account...' : 'Create Account & Enter Dashboard'}
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-[#f0ede6] text-center text-xs text-[#737373] font-light">
            Already registered?{' '}
            <Link href="/admin/login" className="text-[#111111] font-medium hover:underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
