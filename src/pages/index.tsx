
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Checkbox from '@mui/material/Checkbox';
import { Notice, CountdownTimer, Svg } from '@components';

export default function Home() {
  return (
    <div className='bg-[#f7f7f7] text-black min-h-screen'>
      {/* Top Banner */}
      <Notice>🛑 LAST CALL to get 1 month for P50! 🛑</Notice>

      {/* Main Section */}
      <main className='max-w-md md:max-w-[1030px] mx-auto px-4 py-12 md:pt-40 md:pb-20 text-center'>
        <div className='mx-auto px-3 grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div className=''>
            <div className='text-[0.875rem] leading-[1.4286] font-[500] flex items-center gap-20 self-stretch mb-4'>
              Offer expires in<CountdownTimer />
            </div>
            {/* <h1 className='text-xl font-bold text-left '> */}
            <h1 className='text-[1.75rem] leading-[1.1429] font-poppins font-bold text-left mb-2'>
              <span className='text-black'>{`{sender_name}`}</span> sent you <span className='text-blue-600'>20 bonus credits!</span>
            </h1>
            <p className='text-gray-600 text-sm mb-10 text-left max-w-[720px]'>
              Last call to kick the year off with 20 credits more than our usual offer to book thousands of top-rated fitness classes at studios near you.
            </p>
            <div className='w-[95%] -mb-[70px] mx-auto mt-0'>
              <Image
                src='/images/generic-page-hero.png'
                width={1032}
                height={537}
                alt=''
                className='hidden md:block'
              />
            </div>
          </div>

          {/* Offer Card */}
          <div className='md:w-[80%]'>
            <div className='w-[95%] -mb-[70px] mx-auto mt-0'>
              <Image
                src='/images/generic-page-hero.png'
                width={1032}
                height={537}
                alt=''
                className='md:hidden'
              />
            </div>
            <div className='bg-white rounded-lg p-6 mt-4 shadow-md relative flex flex-col gap-5'>
              <header className='flex flex-col items-center justify-center absolute right-1/2 left-1/2 top-[-4rem]'>
                <h2 className='bg-white p-6 rounded-[50px] text-[54px] leading-[1.1428571429] font-poppins font-bold'>
                  ₱50
                </h2>
              </header>
              <div className='border border-[#e7e7e7] rounded-lg w-full mt-6'>
                <h2 className='bg-[#c0e0ff] rounded-t-lg text-sm leading-[1.43] font-semibold p-1'>1 MONTH TRIAL</h2>
                <div className='flex flex-col p-[16px_16px_12px] items-start self-stretch m-0'>
                  <ul className='text-sm text-black mt-2'>
                    <li className='flex text-left py-1 px-0'>
                      <label className='mr-2'><Svg component='check' /></label>
                      <label>
                        {`{strikethrough_default_credits} `}
                        <span className='font-semibold'>48 credits</span>
                      </label>
                    </li>
                    <li className='flex text-left py-1 px-0'>
                      <label className='mr-2'><Svg component='check' /></label>
                      <label className='font-semibold'>Book classes, gym time, & more</label>
                    </li>
                  </ul>
                  <p className='text-[.875rem] leading-[1.4285714286] text-left mt-3 pt-3 border-t border-[#e7e7e7]'>
                    Cancel anytime! We’ll send you a reminder email 2 days before your trial ends.
                  </p>
                </div>
              </div>
              {/* Call to Action */}
              <div>
                <input type='email' placeholder='Enter your email' className='w-full border p-2 rounded-lg' />
                <div className='text-[.75rem] leading-[1.3333333333] text-left my-6'>
                  <label className='flex items-start space-x-2 text-sm text-gray-900'>
                    <Checkbox sx={{ padding: 0 }} />
                    <span className='leading-tight'>
                      Yes, please send me ClassPass emails with news, offers and other info.
                    </span>
                  </label>
                </div>
                <button className='w-full bg-blue-600 text-white font-medium py-2 rounded-full mt-2'>Claim 28 credits for ₱50</button>
                <p className='text-sm mt-4'>or</p>
                <button className='w-full border border-[#d6d6d6] bg-white text-black font-medium py-2 rounded-full flex items-center justify-center mt-2'>
                  <span className='mr-2'><Svg component='ios' /></span> Get started with Apple
                </button>

                <p className='text-xs mt-4'>
                  By getting started, you agree to our <Link href='#' className='text-blue-600'>Terms of Use</Link> and <Link href='#' className='text-blue-600'>Privacy Policy</Link>.
                </p>
              </div>

              {/* Offer Disclaimer */}
              <div className='text-[#999] text-xs leading-[1.3333333333] flex flex-col gap-4'>
                <p>After your trial, you’ll auto-enroll in our ₱2,490.00/month plan. You can change or cancel any time during your trial. Late cancel or missed class
                  <span className='text-[#05f]'> fees apply</span>.</p>
                <p>Offer is available to new trialers only. Spa and salon appointments are available after trial.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

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

    </div>
  );
}
