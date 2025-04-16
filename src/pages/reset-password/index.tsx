import React, { useState } from 'react';
import {
  Box,
  FormControlLabel,
  Switch,
  Tooltip,
  Typography,
  IconButton
} from '@mui/material';
import {
  TextInput,
  Button,
  NotificationBar,
  LocationDetector,
  ProgressBar,
  Footer
} from '@components';
import { getWixClient } from '@lib/wixClient';
import { SeverityStatus } from '@lib/enums';
import { isValidEmail, parseJSON } from '@lib/utils';
import { LocalNotifProps } from '@lib/types';

const wixClient = getWixClient();

export default function ResetPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [notifParams, setNotifParams] = useState<LocalNotifProps>({
    message: '',
    severity: SeverityStatus.INFO
  });
  const [email, setEmail] = useState<string>('');

  const isFormValid =
    email.trim().length >= 12 &&
    isValidEmail(email);

  const resetState = () => {
    setLoading(false);
    setNotifParams({
      message: '',
      severity: SeverityStatus.INFO
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(false);

    try {
      await wixClient.auth.sendPasswordResetEmail(
        email,
        window.location.origin
      );

      setNotifParams(prev => ({
        ...prev,
        message: 'Successfully reset your password. Please check your email.',
        severity: SeverityStatus.SUCCESS,
      }));
      resetState();
    } catch (error: any) {
      const parsed = parseJSON(error?.message);
      setNotifParams(prev => ({
        ...prev,
        message: parsed?.message ? parsed.message.replace(': UNKNOWN', '') : 'Failed to reset your password. Please try again',
        severity: SeverityStatus.ERROR,
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col min-h-[95vh]'>
      <ProgressBar loading={loading} />
      <main className='bg-[#f7f7f7] pt-4 pb-2 flex-grow'>
        <div className='px-4 mb-8 md:mx-auto md:max-w-[40em]'>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='mb-4 mt-8 text-2xl'>Reset your password</h1>
            <span className='text-base text-center'>Enter the email address you used to create your account.</span>
          </div>
          <Box
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={submit}
            className='flex flex-col flex-grow mt-4 gap-2'
          >
            {notifParams.message !== '' && (
              <p className={`border border-[#e7e7e7] p-4 mt-4 mb-4 text-sm text-center ${notifParams.severity === SeverityStatus.SUCCESS ? 'text-green-700' : 'text-[#cb2323]'}`}>
                {notifParams.message}
              </p>
            )}
            <TextInput
              id='outlined-email'
              type='email'
              label='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className='flex justify-center'>
              <Button
                label='Submit'
                borderColor='#05f'
                backgroundColor='#05f'
                fontColor='white'
                disabled={!isFormValid || loading}
              />
            </div>
          </Box>
        </div>
      </main>
      <Footer />
    </div>
  )
}
