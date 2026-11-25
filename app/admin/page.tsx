'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboardClient from '@/components/AdminDashboardClient';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    const isAuth = localStorage.getItem('isAdminAuthenticated') === 'true';
    if (!isAuth) {
      router.replace('/admin/login');
      return;
    }

    setAdminEmail(localStorage.getItem('adminEmail') || undefined);
    setIsAuthorized(true);
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-[#faf9f6] flex items-center justify-center px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-[#737373]">
          Verifying administrator session...
        </p>
      </div>
    );
  }

  return <AdminDashboardClient adminEmail={adminEmail} initialTab="products" />;
}
