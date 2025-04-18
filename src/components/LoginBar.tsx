import { useState, useEffect, useContext } from 'react';
import { getWixClient } from '@lib/wixClient';
import { LoggedInMemberContext } from '@lib/context';
import Link from 'next/link';

const wixClient = getWixClient();

const LoginBar: React.FC = () => {
  const [user, setUser] = useState<string | null>('Guest');

  const loggedInMemberContext = useContext(LoggedInMemberContext);

  if (!loggedInMemberContext) {
    throw new Error('LoggedInMemberContext is missing in the component tree');
  }
    const { loggedInMember } = loggedInMemberContext;

  const logout = async () => {
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    // delete session cookies
    await fetch('/api/set-session', {
      method: 'DELETE',
    });
    
    window.location.href = logoutUrl;
  };

  useEffect(() => {
    if (loggedInMember && loggedInMember.profile) {
      setUser(loggedInMember.profile.nickname || loggedInMember.profile.slug || '');
    } else {
      setUser('Guest');
    }
  }, [loggedInMember])
  
  return (
    <>
      <Link href='/search'>Find classes & appointments</Link>
      <Link href='#'>How credits work</Link>
      <p className='font-poppins font-semibold italic'>Hello {user}</p>
      {loggedInMember ? <span className='cursor-pointer' onClick={() => logout()}>Log out</span> : <Link href='/login'>Log in</Link>}
      <Link href='/walkthrough/getclasspass' className='bg-blue-600 text-white font-medium pt-2 pr-4 pb-2 pl-4 rounded-full'>Try for ₱50</Link>
    </>
  )
};

export default LoginBar;