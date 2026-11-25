import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, signAdminSession } from '@/lib/auth';
import { verifyAdminCredentials } from '@/lib/admin-store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Please enter both email and password.' },
        { status: 400 }
      );
    }

    const result = verifyAdminCredentials(email, password);

    if (!result.configured) {
      return NextResponse.json(
        {
          success: false,
          needsSetup: true,
          error: 'No admin account has been registered yet. Please complete Admin Sign-Up first.',
        },
        { status: 404 }
      );
    }

    if (!result.valid || !result.email) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password. Access denied.' },
        { status: 401 }
      );
    }

    const token = await signAdminSession(result.email);

    const response = NextResponse.json({
      success: true,
      message: 'Authenticated successfully.',
      user: { email: result.email },
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
