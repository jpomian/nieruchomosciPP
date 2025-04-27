// app/api/authenticate/route.ts
import { NextResponse } from 'next/server';

// Use environment variable for the password
const CORRECT_PASSWORD = 'barhan';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password === CORRECT_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('auth', 'true', { 
      path: '/', 
      maxAge: 60 * 60 * 24, // 1 day
      httpOnly: true, // More secure
      sameSite: 'strict', // More secure
      secure: process.env.NODE_ENV === 'production' // HTTPS in production
    });
    return response;
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}