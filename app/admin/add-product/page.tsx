'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboardClient from '@/components/AdminDashboardClient';
import { getInMemoryAdminSession } from '@/lib/admin-memory-auth';

export default function AdminAddProductPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    const session = getInMemoryAdminSession();
    if (!session.authenticated) {
      router.replace('/admin/login');
      return;
    }

    setAdminEmail(session.email || undefined);
    setIsAuthorized(true);
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-[#faf9f6] flex items-center justify-center px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-[#737373]">
          Redirecting to administrator sign in...
        </p>
      </div>
    );
  }

  return <AdminDashboardClient adminEmail={adminEmail} initialTab="create-product" />;
}
