import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { getWixClient } from '@/lib/wixClient';
import {
  Backdrop,
  IconButton
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { HeaderNavProps } from '@lib/types';
import { LoggedInMemberContext, MenuContext } from '@lib/context';
import { Button, Svg } from '@components';

const wixClient = getWixClient();

const HeaderNav: React.FC<HeaderNavProps> = ({ pathname, children }) => {
  const menuContext = useContext(MenuContext);
  const loggedInMemberContext = useContext(LoggedInMemberContext);
  const router = useRouter();
  
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>('Guest');

  if (!menuContext) {
    throw new Error('MenuContext is missing in the component tree');
  }

  if (!loggedInMemberContext) {
    throw new Error('LoggedInMemberContext is missing in the component tree');
  }

  const { isMenuOpen, toggleMenu } = menuContext;
  const { loggedInMember } = loggedInMemberContext;

  const handleClose = () => {
    setOpenNav(false);
  };

  const handleOpen = () => {
    setOpenNav(true);
  };

  const logout = async () => {
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    // delete session cookies
    await fetch('/api/set-session', {
      method: 'DELETE',
    });
    
    window.location.href = logoutUrl;
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setTimeout(() => setOpenNav(false), 1000);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    if (loggedInMember && loggedInMember.profile) {
      setUser(loggedInMember.profile.nickname || loggedInMember.profile.slug || '');
    } else {
      setUser('Guest');
    }
  }, [loggedInMember])

  return (
    <>
      <header className='sticky top-0 z-[15] bg-white min-h-16 h-[64px]'>
        <div className='w-full h-full flex flex-col sm:flex-row sm:items-center justify-between'>
          <div className='flex justify-between md:hidden ml-4 pt-4'>
            <div className='w-[41px]'>
              <Link href='/'>
                <Image
                  src='https://cdn9.classpass.com/dist/gfe-v2/_next/static/media/logo.b2777700.svg'
                  width={41}
                  height={64}
                  alt=''
                />
              </Link>
            </div>
            <IconButton aria-label='menu' className='pr-4' onClick={handleOpen}>
              <MenuIcon />
            </IconButton>
          </div>
          <div className='flex text-2xl leading-[1.1111111111] items-center'>
            <Link href='/' className='ml-4 hidden md:block'>classpass</Link>
            {pathname === '/search' && (
              <section className='p-4 flex w-full bg-white'>
                <SearchBar />
                <button
                  className='flex items-center sm:hidden bg-white border border-[#d6d6d6] rounded-[20px] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] h-10 leading-none ml-2 min-w-[60px] px-4 text-[#05f] text-sm font-semibold'
                  onClick={toggleMenu}
                >{isMenuOpen ? 'List' : 'Map'}
                </button>
              </section>
            )}
          </div>
          <div className='mr-4 hidden md:flex items-center text-sm gap-6'>
            {children}
          </div>
        </div>
      </header>
      {openNav &&
        <Backdrop
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: 'white',
            alignItems: 'baseline',
            justifyContent: 'flex-start',
            padding: '0 16px'
          }}
          open={openNav}
        >
          <span className='absolute top-4 left-4'>
            <Link href='/'>
              <Image
                src='https://cdn9.classpass.com/dist/gfe-v2/_next/static/media/logo.b2777700.svg'
                width={41}
                height={64}
                alt=''
              />
            </Link>
          </span>

          <button
            className='absolute top-[1.5rem]  right-4 text-2xl font-bold text-gray-600 hover:text-black'
            onClick={handleClose}
            aria-label='Close'
          >
            <Svg component='close' />
          </button>

          {/* as follows */}
          <ul className='text-left mt-14 text-lg w-full'>
            <li className='border-b border-b-[#e7e7e7] p-4'>
              <Link href='/search'>Find classes & appointments</Link>
            </li>
            <li className='border-b border-b-[#e7e7e7] p-4'>
              How credits work
            </li>
            <li className='border-b border-b-[#e7e7e7] p-4'>
              Hello {user}
            </li>
            <li className='border-b border-b-[#e7e7e7] p-4'>
              {loggedInMember ? <span className='cursor-pointer' onClick={() => logout()}>Log out</span> : <Link href='/login'>Log in</Link>}
            </li>
            <li className='px-4 mt-4'>
              <Button
                label='Try for ₱50'
                borderColor='#05f'
                backgroundColor='#05f'
                fontColor='white'
                className='!rounded-full'
                onClick={() => router.push('/member-signup/getclasspass')}
              />
            </li>
          </ul> 
        </Backdrop>
      }
    </>
  )
}

export default HeaderNav;