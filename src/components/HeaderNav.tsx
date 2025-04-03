import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useContext } from 'react';
import { HeaderNavProps } from '@lib/types';
import { MenuContext } from '@lib/context';

const HeaderNav: React.FC<HeaderNavProps> = ({ pathname, children }) => {
  const menuContext = useContext(MenuContext);

  if (!menuContext) {
    throw new Error("MenuContext is missing in the component tree");
  }

  const { isMenuOpen, toggleMenu } = menuContext;

  return (
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
          <IconButton aria-label="menu" className='pr-4'>
            <MenuIcon />
          </IconButton>
        </div>
        <div className='flex text-2xl leading-[1.1111111111] items-center'>
          <Link href='/' className='ml-4 hidden md:block'>classpass</Link>
          {pathname === '/search' && (
            <section className='p-4 flex w-full'>
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
  )
}

export default HeaderNav;