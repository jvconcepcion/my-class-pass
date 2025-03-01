import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const HeaderNav: React.FC = () => {
  return (
    <header className='sticky top-0 z-[15] bg-white min-h-16 h-[64px]'>
      <div className='w-full h-full flex items-center justify-between'>
        <div className='w-[41px] flex ml-4 md:hidden'>
          <Link href='/'>
            <Image
              src='https://cdn9.classpass.com/dist/gfe-v2/_next/static/media/logo.b2777700.svg'
              width={41}
              height={64}
              alt=''
            />
          </Link>
        </div>
        <div className='ml-4 hidden md:block text-2xl leading-[1.1111111111]'>
          <Link href='/'>classpass</Link>
        </div>
        <div className='mr-4 hidden md:flex items-center text-sm gap-6'>
          <Link href='#'>Find classes & appointments</Link>
          <Link href='#'>Plans</Link>
          <Link href='#'>How credits work</Link>
          <Link href='/login'>Log in</Link>
          <Link href='/walkthrough/getclasspass' className='bg-blue-600 text-white font-medium pt-3 pr-4 pb-2 pl-4 rounded-full'>Try for ₱50</Link>
        </div>
      </div>
    </header>
  )
}

export default HeaderNav;