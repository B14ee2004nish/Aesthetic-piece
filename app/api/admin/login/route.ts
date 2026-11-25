import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, signAdminSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    const adminEmail = process.env.ADMIN_EMAIL?.trim();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Admin credentials are not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file.',
        },
        { status: 500 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Please enter both email and password.' },
        { status: 400 }
      );
    }

    const isEmailMatch = email.toLowerCase() === adminEmail.toLowerCase();
    const isPasswordMatch = password === adminPassword;

    if (!isEmailMatch || !isPasswordMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password. Access denied.' },
        { status: 401 }
      );
    }

    const token = await signAdminSession(adminEmail);

    const response = NextResponse.json({
      success: true,
      message: 'Authenticated successfully.',
      redirectTo: '/admin/add-product',
      user: { email: adminEmail },
    });

    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Unable to process login request.' },
      { status: 500 }
    );
  }
}
