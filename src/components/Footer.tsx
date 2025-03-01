import React from 'react';
import Link from 'next/link';
import Svg from './Svg';

const Footer = () => {
  return (
    <footer className='bg-black text-white py-8 md:py-4 px-6 md:px-12'>
        <div className='md:max-w-[1230px] md:my-0 md:mx-auto'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 py-4'>
            {/* Company */}
            <div>
              <h5 className='font-semibold mt-8 md:mt-4 mb-4'>Company</h5>
              <ul className='space-y-2 text-sm'>
                <li><Link href='/walkthrough/getclasspass'>About us</Link></li>
                <li><Link href='#'>Why studio fitness</Link></li>
                <li><Link href='#'>Gifts</Link></li>
                <li><Link href='#'>Careers</Link></li>
                <li><Link href='#'>Press</Link></li>
                <li><Link href='#'>How it works</Link></li>
                <li className='mb-4'><Link href='#'>Corporate Memberships</Link></li>
              </ul>
            </div>

            {/* Support & Language */}
            <div>
              <h5 className='font-semibold mt-8 md:mt-4 mb-4'>Support</h5>
              <ul className='space-y-2 text-sm'>
                <li><Link href='#'>Contact Us</Link></li>
                <li className='mb-4'><Link href='#'>Help Center</Link></li>
              </ul>

              <h5 className='font-semibold mt-8 md:mt-4 mb-4'>Language</h5>
              <button className='flex text-left text-sm'>
                <span>English (United States)</span>
                <span className='ml-2'>
                  <Svg component='arrowdown' />
                </span>
              </button>
            </div>

            {/* Partners */}
            <div>
              <h5 className='font-semibold mt-8 md:mt-4 mb-4'>Partners</h5>
              <ul className='space-y-2 text-sm'>
                <li><Link href='#'>Become a Partner</Link></li>
                <li><Link href='#'>Integration API Docs</Link></li>
                <li className='mb-4'><Link href='#'>After Class Blog</Link></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h5 className='font-semibold mt-8 md:mt-4 mb-4'>Community</h5>
              <ul className='space-y-2 text-sm'>
                <li><Link href='#'>Refer a Friend</Link></li>
                <li><Link href='#'>Locations</Link></li>
                <li><Link href='#'>Blog</Link></li>
                <li><Link href='#'>Top 10 Lists</Link></li>
                <li><Link href='#'>Activities</Link></li>
                <li className='mb-4'><Link href='#'>Popular Studios</Link></li>
              </ul>
            </div>
          </div>

          <div className='text-left py-8 px-0 leading-[1.3333333333] grid grid-cols-1 md:grid-cols-2'>
            <div>
              <h5 className='font-semibold mt-0 mb-4 text-none leading-[1.3333]'>Enjoy fitness on the go</h5>
              <div className='flex'>
                <Svg component='dlonappstore' className='w-[35%] md:w-[25%] pr-6 pt-0 pb-4 pl-0'/>
                <Svg component='dlonplaystore' className='w-[35%] md:w-[25%] pr-6 pt-0 pb-4 pl-0'/>
              </div>
            </div>
            <div>
              <div className='my-4 mx-auto'>
                <ul className='flex items-center justify-start gap-5'>
                  <li className='pt-4'>
                    <Link href='#' target='_blank'><Svg component='facebook' /></Link>
                  </li>
                  <li className='pt-4'>
                    <Link href='#' target='_blank'><Svg component='twitter' /></Link>
                  </li>
                  <li className='pt-4'>
                    <Link href='#' target='_blank'><Svg component='instagram' /></Link>
                  </li>
                  <li className='pt-4'>
                    <Link href='#' target='_blank'><Svg component='pinterest' /></Link>
                  </li>
                  <li className='pt-4'>
                    <Link href='#' target='_blank'><Svg component='spotify' /></Link>
                  </li>
                </ul>
                <ul className='flex items-center justify-start gap-3 text-[0.8rem] leading-[1.4285714286] font-semibold'>
                  <li className='pt-4 whitespace-nowrap'>
                    <Link href='#' target='_blank'>Terms of Use</Link>
                  </li>
                  <li className='pt-4 whitespace-nowrap'>
                    <Link href='#' target='_blank'>Privacy Policy</Link>
                  </li>
                  <li className='pt-4 whitespace-nowrap'>
                    <Link href='#' target='_blank'>Cookies & ads</Link>
                  </li>
                  <li className='pt-4 whitespace-nowrap'>
                    <Link href='#' target='_blank'>Accessibility</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer