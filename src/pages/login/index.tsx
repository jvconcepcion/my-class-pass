import { useState } from 'react';
import { useRouter } from 'next/router';
import { getWixClient } from '@/lib/wixClient';
import { Footer, Svg, Button } from '@components';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // const loginWithGoogle = async () => {
  //   const wixClient = getWixClient();
    
  //   const redirectUri = `${window.location.origin}/login-callback`; // This must match Wix settings
  //   const data = wixClient.auth.generateOAuthData(redirectUri, window.location.href);
  
  //   localStorage.setItem('oauthRedirectData', JSON.stringify(data));
  
  //   const { authUrl } = await wixClient.auth.getAuthUrl({
  //     ...data,
  //     provider: 'google', // Specifies Google Sign-In
  //   });
  
  //   window.location.href = authUrl; // Redirect user to Google login via Wix
  // };

  return (
    <>
      <main>
        <div className='bg-[#f7f7f7]'>
          <div className='grid grid-cols-1 md:grid-cols-2 md:flex md:items-center md:mx-auto md:max-w-[62em] md:min-h-[calc(100vh-64px)] md:p-4'>
            <div className='bg-white my-0 mx-4 md:px-10 md:shadow-[0_4px_12px_rgba(0,0,0,0.24)] md:w-1/2'>
              <div className='max-w-[350px] py-8 md:py-12 px-4 mx-auto'>
                <h3 className='mb-4 text-center text-2xl font-medium'>Welcome Back</h3>
                <Button label= 'Sign in with Apple' borderColor='black' backgroundColor='black' fontColor='white'>
                  <span className='ml-4 flex-shrink-0'>
                    <Svg component='ios' color='white' />
                  </span>
                </Button>
                <Button 
                  label= 'Sign in with Google' 
                  borderColor='black' 
                  backgroundColor='white' 
                  fontColor='black'
                  // onClick={loginWithGoogle}
                >
                  <span className='ml-4 flex-shrink-0'>
                    <Svg component='google' />
                  </span>
                </Button>
                {/* divider */}
                <div className='flex items-center justify-center my-5 mx-0'>
                  <hr className='border-b border-[#e7e7e7] flex-1' />
                  <span className='bg-white py-0 px-2'>
                    <span>or</span>
                  </span>
                  <hr className='border-b border-[#e7e7e7] flex-1' />
                </div>

                <form className='form' noValidate>
                  <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                      <label className='text-[#555]'>Email address</label>
                      <input type='text' name='email' className='border border-[#e7e7e7] rounded-[3px] shadow-none text-[16px] p-[11px_8px_8px] align-middle w-full' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label className='text-[#555]'>Password</label>
                      <input type='text' name='password' className='border border-[#e7e7e7] rounded-[3px] shadow-none text-[16px] p-[11px_8px_8px] align-middle w-full' />
                    </div>
                    <Button label='Log in' borderColor='#05f' backgroundColor='#05f' fontColor='white' className='py-4' />
                  </div>
                </form>

                <p className='mb-6 text-[#05f] font-light text-[15px] text-center mt-6'><Link href='#'>Forgot your password?</Link></p>
                <p className='mb-6 font-light text-[15px] text-center mt-6'>Looking for Facebook Sign In or having trouble logging in? Reach out to <Link href='#' className='text-[#05f]'>support</Link>.</p>
                <hr className='mb-6 border-b border-[#e7e7e7]' />
                <p className='mb-6 text-[#05f] font-light text-[15px] text-center mt-6'><Link href='#'>Partner Dashboard login</Link></p>
              </div>
            </div>
            <div className="mx-auto max-w-[350px] py-10 px-4 flex flex-col items-center text-center">
              <span className="mb-4">
                <Svg component="planet" />
              </span>
              <h3 className="text-2xl font-bold font-poppins leading-[1.36] my-4">
                New to ClassPass?
              </h3>
              <p className="text-lg font-medium leading-[1.33] mb-4">
                Become a member for worldwide access to thousands of top-rated gyms, fitness studios, salons, and spas.
              </p>
              <Button label='Get started for free' borderColor='#05f' backgroundColor='transparent' fontColor='#05f' />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
