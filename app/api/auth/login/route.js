import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();

    const res = await fetch('ttps://grabdeal-server.vercel.app/api/v1/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data?.message || 'Login failed' },
        { status: res.status }
      );
    }

    const token = data?.data?.token;
    const user = data?.data?.user;

    const response = NextResponse.json({
      status: 'success',
      message: 'Logged in successfully',
      user,
    });

    response.cookies.set('grabdeal_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}