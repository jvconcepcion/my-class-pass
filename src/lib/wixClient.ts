import { createClient, OAuthStrategy } from '@wix/sdk';
import { availabilityCalendar, services } from '@wix/bookings';
import { redirects } from '@wix/redirects';
import { members } from '@wix/members';
import Cookies from 'js-cookie';

export const getWixClient = () => {
  return createClient({
    modules: { services, availabilityCalendar, redirects, members },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: typeof window !== "undefined" && Cookies.get('session') 
        ? JSON.parse(Cookies.get('session') as string) 
        : undefined, // Prevent issues in middleware (server-side)
    }),
  });
};
