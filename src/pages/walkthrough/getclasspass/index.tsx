import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Controller } from 'swiper/modules';
import type { Swiper as SwiperCore } from 'swiper';
import { aboutSlide } from '@lib/data';
import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';

export default function GetClassPass() {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const swiperMainRef = useRef<SwiperCore | null>(null);
  const swiperImageRef = useRef<SwiperCore | null>(null);

  const router = useRouter();
  const bgColors = ['#E6F3FF', '#d2e9ff', '#c0e0ff'];

  const handleSwiperChange = useCallback((swiper: SwiperCore) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  const handleNext = useCallback(() => {
    const isLastSlide = activeIndex === aboutSlide.length - 1;
  
    if (isLastSlide) {
      router.push('/member-signup/getclasspass');
      return;
    }
  
    if (swiperMainRef.current && !swiperMainRef.current.isEnd) {
      swiperMainRef.current.slideNext();
    }
  }, [activeIndex, router]);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Update swiper when activeIndex changes
  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;

    if (swiperMainRef.current && swiperMainRef.current.activeIndex !== activeIndex) {
      swiperMainRef.current.slideTo(activeIndex);
    }
    if (isDesktop && swiperImageRef.current && swiperImageRef.current.activeIndex !== activeIndex) {
      swiperImageRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  return (
    <main className='grid grid-cols-1 md:grid-cols-2 mt-[-20px] overflow-hidden touch-none'>
      {/* Left Image Section */}
      <div
        className='transition-all duration-500 ease-in-out hidden md:block md:h-screen mt-[-2.6rem]'
        style={{ backgroundColor: bgColors[activeIndex] }}
      >
        {isClient &&
          <Swiper
            pagination={{ clickable: false, enabled: false }}
            modules={[Controller]}
            onSwiper={(swiper) => (swiperImageRef.current = swiper)}
            controller={{ control: swiperMainRef.current }}
            className='w-full h-full'
            resistanceRatio={0}
          >
            {aboutSlide.map(({ image }, i) => (
              <SwiperSlide key={i}>
                <div className='h-full'>
                  <Image src={image} width={1356} height={1258} alt='Slide Image' className='h-full' />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        }
      </div>

      {/* Right Swiper Section */}
      <div
        className='h-screen relative transition-all duration-500 ease-in-out overflow-hidden mt-[-2.6rem]'
        style={{ backgroundColor: bgColors[activeIndex] }}
      >
        <div className='h-full w-full flex flex-col justify-between'>
          {/* Swiper Section */}
          <div className='flex flex-col flex-grow justify-center min-h-0'>
            {isClient &&
              <Swiper
                pagination={{ clickable: true, el: '.custom-pagination' }}
                onSwiper={(swiper) => (swiperMainRef.current = swiper)}
                onSlideChange={handleSwiperChange}
                modules={[Pagination, Controller]}
                controller={{ control: swiperImageRef.current }}
                className='w-full'
                resistanceRatio={0}
              >
                {aboutSlide.map(({ title, description, subDesc }, i) => (
                  <SwiperSlide key={i}>
                    <div className='px-6 md:px-40'>
                      <h1 className='text-xs text-[#111] mb-4'>{title}</h1>
                      <div className='text-[1.375rem] leading-[1.4] font-medium text-[#111]'>
                        <p>{description}</p>
                        <p className='mt-5'>{subDesc}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            }
          </div>

          {/* Footer Section */}
          <footer className='flex flex-col items-center text-center px-6 pb-6'>
            {/* Swiper Pagination */}
            <div className='custom-pagination flex justify-center space-x-1 mb-4 w-full'></div>

            {/* Next/Continue Button */}
            <button
              onClick={handleNext}
              className={clsx(
                'w-full md:w-[25%] font-medium py-3 rounded-full max-w-[400px] mb-4 transition-all duration-300',
                activeIndex === aboutSlide.length - 1 ? 'bg-white text-black' : 'bg-black text-white'
              )}
            >
              {activeIndex === aboutSlide.length - 1 ? 'Continue' : 'Next'}
            </button>

            {/* Skip to Sign Up / Learn More */}
            <span>
              <Link href='/member-signup/getclasspass' className='text-[#111] font-medium underline text-sm'>
                {activeIndex === aboutSlide.length - 1 ? 'Learn how credits work' : 'Skip straight to sign up'}
              </Link>
            </span>
          </footer>
        </div>
      </div>
    </main>
  );
}
