import { NextRequest, NextResponse } from 'next/server';
import { getWixClient } from '@/lib/wixClient';

export async function middleware(req: NextRequest) {
  console.log("Middleware running...");

  const sessionCookie = req.cookies.get('session');

  if (!sessionCookie) {
    console.log("No session found, generating visitor tokens...");
    const response = NextResponse.next();
    const wixClient = getWixClient();

    try {
      const visitorTokens = await wixClient.auth.generateVisitorTokens();

      response.cookies.set({
        name: 'session',
        value: JSON.stringify(visitorTokens),
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      console.log("Visitor session set successfully.");
    } catch (error) {
      console.error("Failed to generate Wix visitor tokens:", error);
    }

    return response;
  }

  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: '/:path*', // Adjust based on your needs
};
