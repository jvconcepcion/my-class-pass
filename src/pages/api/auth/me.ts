import { NextRequest, NextResponse } from 'next/server';
import { getWixClient } from '@/lib/wixClient';

export async function GET(req: NextRequest) {
  // const token = req.cookies.get('wixAccessToken');

  // if (!token) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  // try {
  //   const wixClient = getWixClient();
  //   wixClient.auth.setTokens({ accessToken: token });

  //   const user = await wixClient.auth.getCurrentUser();
  //   return NextResponse.json(user);
  // } catch (error) {
  //   return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  // }
}
