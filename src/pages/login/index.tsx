import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { getWixClient } from '@/lib/wixClient';
import { Footer, Svg, Button, TextInput, ProgressBar, NotificationBar } from '@components';
import {
  Box,
  IconButton
} from '@mui/material';
import { SeverityStatus } from '@lib/enums';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { isValidEmail, parseJSON } from '@lib/utils';
import { LoggedInMemberContext } from '@lib/context';
import { LocalNotifProps } from '@lib/types';
import Link from 'next/link';

const wixClient = getWixClient();

export default function Login() {
  const router = useRouter();
  const loggedInMemberContext = useContext(LoggedInMemberContext);

  if (!loggedInMemberContext) {
    throw new Error('LoggedInMemberContext is missing in the component tree');
  }
  const { loggedInMember, setLoggedInMember } = loggedInMemberContext;
  const [loading, setLoading] = useState<boolean>(false);
  const [openNotif, setOpenNotif] = useState<boolean>(false);
  const [notifParams, setNotifParams] = useState<LocalNotifProps>({
    message: '',
    severity: SeverityStatus.INFO
  });
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isFormValid =
  email.trim().length >= 12 &&
  isValidEmail(email) &&
  password.trim().length >= 10;

  const resetState = () => {
    setLoading(false);
    setShowPassword(false);
    setEmail('');
    setPassword('');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response: any = await wixClient.auth.login({
        email,
        password
      });

      const isSuccess = response.loginState === 'SUCCESS';
      const errorMessage = parseJSON(response?.error)?.message ?? 'Failed to Login. Please try again!';
      setNotifParams(prev => ({
        ...prev,
        message: isSuccess ? "Logged in Successfully." : errorMessage,
        severity: isSuccess ? SeverityStatus.SUCCESS : SeverityStatus.ERROR,
      }));

      setOpenNotif(true);

      if (isSuccess) {
        const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
          response.data.sessionToken!
        );
        // set current logged user session to cookies 
        await fetch('/api/set-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tokens),
        });
        wixClient.auth.setTokens(tokens);
        const { member } = wixClient.auth.loggedIn() ? await wixClient.members.getCurrentMember() : {};
        setLoggedInMember(member)
        resetState();
        setTimeout(() => {
          router.push('/');
        }, 1000);
        return response;
      }
    } catch (error) {
      setNotifParams(prev => ({
        ...prev,
        message: 'Connection Error. Please try again!',
        severity: SeverityStatus.ERROR,
      }));
      console.error('Connection Error. Please try again!', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ProgressBar loading={loading} />
      <main className='bg-[#f7f7f7]'>
        <div className='grid grid-cols-1 md:grid-cols-2 md:flex md:items-center md:mx-auto md:max-w-[62em] md:min-h-[calc(100vh-64px)] md:p-4'>
          <div className='bg-white mt-4 mx-4 md:px-10 md:shadow-[0_4px_12px_rgba(0,0,0,0.24)] md:w-1/2'>
            <div className='max-w-[350px] py-8 md:py-12 px-4 mx-auto'>
              <h3 className='mb-4 text-center text-2xl font-medium'>Welcome Back</h3>
              <Box
                component='form'
                noValidate
                autoComplete='off'
                onSubmit={submit}
              >
                <div className='flex flex-col gap-5'>
                  <TextInput
                    id='outlined-email'
                    type='email'
                    label='Email Address'
                    className='rounded-[3px] py-1'
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        padding: '0',
                      },
                      '& .MuiInputBase-input': {
                        padding: '8px 8px 8px',
                      },
                      '& .MuiFormLabel-root': {
                        top: '-4px'
                      }
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextInput
                    id='outlined-password'
                    type={showPassword ? 'text' : 'password'}
                    label='Password'
                    autoComplete='current-password'
                    className='rounded-[3px] py-1'
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        padding: '0',
                      },
                      '& .MuiInputBase-input': {
                        padding: '8px 8px 8px',
                      },
                      '& .MuiFormLabel-root': {
                        top: '-4px'
                      }
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={(
                      <IconButton
                        aria-label={
                          showPassword ? 'hide the password' : 'display the password'
                        }
                        sx={{
                          '&:hover': {
                            backgroundColor: 'transparent',
                          },
                        }}
                        onClick={() => setShowPassword((show) => !show)}
                        edge='end'
                        className='m-0'
                      >
                        {showPassword ? <VisibilityOff className='text-sm m-0' /> : <Visibility className='text-sm m-0' />}
                      </IconButton>
                    )}
                  />
                  <Button 
                    label='Log in' 
                    borderColor='#05f' 
                    backgroundColor='#05f' 
                    fontColor='white' 
                    className='py-4'
                    disabled={!isFormValid || loading}
                  />
                </div>
              </Box>

              <p className='mb-6 text-[#05f] font-light text-[15px] text-center mt-6'><Link href='/reset-password'>Forgot your password?</Link></p>
              <p className='mb-6 font-light text-[15px] text-center mt-6'>Looking for Facebook Sign In or having trouble logging in? Reach out to <Link href='#' className='text-[#05f]'>support</Link>.</p>
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
            <Button
              label='Get started for free'
              borderColor='#05f'
              backgroundColor='transparent'
              fontColor='#05f'
              onClick={() => router.push('/member-signup/getclasspass')}
            />
          </div>

        </div>
      </main>
      <NotificationBar
        open={openNotif}
        handleNotif={setOpenNotif}
        {...notifParams}
      />
      <Footer />
    </>
  )
}
