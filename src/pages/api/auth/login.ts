import { NextRequest, NextResponse } from 'next/server';
import { getWixClient } from '@/lib/wixClient';

export async function POST(req: NextRequest) {
  // try {
  //   const { email, password } = await req.json();
  //   const wixClient = getWixClient();

  //   // Authenticate using Wix
  //   const { accessToken, refreshToken } = await wixClient.auth.login({ email, password });

  //   const response = NextResponse.json({ accessToken, refreshToken });

  //   // Store tokens in cookies
  //   response.cookies.set('wixSession', JSON.stringify({ accessToken, refreshToken }), {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'strict',
  //     path: '/',
  //   });

  //   return response;
  // } catch (error) {
  //   return NextResponse.json({ error: 'Invalid login credentials' }, { status: 401 });
  // }
}
