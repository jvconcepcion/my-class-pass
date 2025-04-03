import { useState, useEffect } from 'react';
import { getWixClient } from '@lib/wixClient';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { availabilityCalendar, services } from '@wix/bookings';
import { redirects } from '@wix/redirects';
import { members } from '@wix/members';
import Link from 'next/link';
import Cookies from 'js-cookie';

const wixClient = getWixClient();

const LoginBar: React.FC = () => {
  const [user, setUser] = useState<string | null>('Guest');
  const [member, setMember] = useState<any>(null);

  const fetchMembers = async () => {
    const { member } = wixClient.auth.loggedIn() ? await wixClient.members.getCurrentMember() : {};
    const test = await wixClient.members.listMembers();
    console.log(test);
    setMember(member ?? null);
  };
  

  const login = async () => {
    const data = wixClient.auth.generateOAuthData(`${window.location.origin}/login-callback`, window.location.href);
    localStorage.setItem('oauthRedirectData', JSON.stringify(data));
    const { authUrl } = await wixClient.auth.getAuthUrl(data);

    window.location.href = authUrl;
  };

  const logout = async () => {
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    Cookies.remove('session');
    
    window.location.href = logoutUrl;
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (wixClient.auth.loggedIn() && member && member.profile) {
      setUser(member.profile.nickname || member.profile.slug || '');
    } else {
      setUser('Guest');
    }
  }, [member]);
  
  console.log(member)
  return (
    <>
      <Link href='/search'>Find classes & appointments</Link>
      <Link href='#'>How credits work</Link>
      <p className='font-poppins font-semibold italic'>Hello {user}</p>
      {member !== null && <button onClick={() => (wixClient.auth?.loggedIn() ? logout() : login())}>
          {wixClient.auth?.loggedIn() ? "Log out" : "Log in"}
        </button>}
      {/* <Link href='/login'>Log in</Link> */}
      <Link href='/walkthrough/getclasspass' className='bg-blue-600 text-white font-medium pt-3 pr-4 pb-2 pl-4 rounded-full'>Try for ₱50</Link>
      {/* <span 
        className='cursor-pointer bg-blue-600 text-white font-medium pt-3 pr-4 pb-2 pl-4 rounded-full'
        onClick={login}
      >Try for ₱50</span> */}
    </>
  )
};

export default LoginBar;