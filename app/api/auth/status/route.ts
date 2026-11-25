import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '@/lib/auth';
import { hasAdminAccount } from '@/lib/admin-store';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = await verifyAdminSession(token);

  return NextResponse.json({
    configured: hasAdminAccount(),
    authenticated: Boolean(session),
    email: session?.email ?? null,
  });
}
