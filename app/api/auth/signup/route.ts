import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, signAdminSession } from '@/lib/auth';
import { createSingleAdminAccount, hasAdminAccount } from '@/lib/admin-store';

export async function POST(request: NextRequest) {
  try {
    if (hasAdminAccount()) {
      return NextResponse.json(
        {
          success: false,
          error: 'An admin account has already been created. Please sign in on the login page.',
        },
        { status: 409 }
      );
    }

    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const account = createSingleAdminAccount(email, password);
    const token = await signAdminSession(account.email);

    const response = NextResponse.json({
      success: true,
      message: 'Admin account created and signed in.',
      user: { email: account.email },
    });

    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Unable to create admin account.' },
      { status: 500 }
    );
  }
}
