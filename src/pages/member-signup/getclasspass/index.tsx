import React, { useState, useRef, useEffect } from 'react';
import { Box, FormControlLabel, Switch, Tooltip, Typography, IconButton  } from '@mui/material';
import { TextInput, Button, LocationDetector } from '@components';
import { getWixClient } from '@lib/wixClient';
import { ServiceListProps } from '@lib/types';
import { PrivacyStatus } from '@lib/enums';
import { Check, SpeakerNotes, Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';

const wixClient = getWixClient();

export interface RegistrationProps {
  contactInfo: {
    [key: string]: string;
  },
  privacyStatus: string;
};

export default function SignUpClassPass() {
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [serviceList, setServiceList] = useState<ServiceListProps[]>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [options, setOptions] = useState<RegistrationProps>({
    contactInfo: {
      firstName: '',
      lastName: '',
    },
    privacyStatus: 'PUBLIC'
  });

  const Note = (
    <div className='text-xs space-y-1'>
      <p>All fields are required:</p>
      <ul className='list-disc pl-5'>
        <li>Email Address must be at least 12 characters.</li>
        <li>Password must be at least 16 characters.</li>
        <li>First Name must be at least 4 characters.</li>
        <li>Last Name must be at least 4 characters.</li>
      </ul>
    </div>
  );
  const { contactInfo, privacyStatus } = options;
  const isFormValid =
    email.trim().length >= 12 &&
    password.trim().length >= 16 &&
    contactInfo.firstName.trim().length >= 4 &&
    contactInfo.lastName.trim().length >= 4;

  const handleToggleStatus = () => {
    setOptions(prevState => ({
      ...prevState,
      privacyStatus: prevState.privacyStatus === 'PRIVATE' ? 'PUBLIC' : 'PRIVATE',
    }))
  };

  const fetchServices = () => {
    try {
      const serviceData = wixClient.auth.register
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName } = contactInfo;

    try {
      //   const response = await wixClient.auth.register({
      //     email,
      //     password,
      //     profile: {
      //       firstName,
      //       lastName,
      //       privacyStatus: privacyStatus === 'PUBLIC' ? PrivacyStatus.PUBLIC : PrivacyStatus.PRIVATE,
      //     }
      //   });

      console.log({
        email,
        password,
        profile: {
          firstName,
          lastName,
          privacyStatus: privacyStatus === 'PUBLIC' ? PrivacyStatus.PUBLIC : PrivacyStatus.PRIVATE,
        }
      })
    } catch (error) {
      console.error('Failed to Register. Please try again! :', error);
    }
  };

  return (
    <main className='grid grid-cols-1 md:grid-cols-2 sm:gap-x-10 overflow-hidden touch-none bg-[#97ccfe] p-6 md:px-[36rem] md:py-36 min-h-[94vh]'>
      <div className='p-4'>
        <div className='flex flex-col gap-y-3 mb-5'>
          <h4 className='text-sm'>Quick recap</h4>
          <h3 className='text-xl font-semibold'>14 days for PHP 50</h3>
        </div>

        <div>
          <ul className='flex flex-col gap-y-5 text-sm'>
            <li><Check className='mr-2 text-sm' /> Get 28 credits to visit a selection of our best studios & gyms one time each.</li>
            <li><Check className='mr-2 text-sm' /> Credits expire at the end of your trial.</li>
            <li><Check className='mr-2 text-sm' /> We'll send you an email reminder before your trial ends. Cancel anytime.</li>
            <li><Check className='mr-2 text-sm' /> Upgrade anytime to unlock access to salons & spas as well as repeat bookings.</li>
          </ul>
        </div>
      </div>

      <div className='rounded flex flex-col p-6 bg-white gap-y-5 h-[582px]'>
        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={submit}
        >
          <div className='flex flex-col gap-y-4 text-sm'>
            <div className='border-b border-[#f4f4f4] flex items-center mb-2'>
              <Typography variant='caption'>
                Note
                <Tooltip key='note' title={Note} placement='right-start'>
                  <SpeakerNotes className='text-xs text-black/70 ml-1' />
                </Tooltip>
              </Typography>
            </div>
            <TextInput
              id='outlined-email'
              type='email'
              label='Email Address'
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              id='outlined-password'
              type={showPassword ? 'text' : 'password'}
              label='Password'
              autoComplete='current-password'
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
            <TextInput
              id='outlined-fname'
              label='Firstname'
              value={contactInfo.firstName}
              onChange={(e) => setOptions((prevState) => ({
                ...prevState,
                contactInfo: {
                  ...prevState.contactInfo,
                  firstName: e.target.value,
                },
              }))}
            />
            <TextInput
              id='outlined-lname'
              label='Lastname'
              value={contactInfo.lastName}
              onChange={(e) => setOptions((prevState) => ({
                ...prevState,
                contactInfo: {
                  ...prevState.contactInfo,
                  lastName: e.target.value,
                },
              }))}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={privacyStatus === 'PRIVATE'}
                  onChange={handleToggleStatus}
                  color='primary'
                />
              }
              label={
                <span className='capitalize'>
                  {options.privacyStatus.toLowerCase()}
                </span>
              }
            />
            <div className='flex justify-center'>
              <Button
                label='Sign up'
                borderColor='#05f'
                backgroundColor='#05f'
                fontColor='white'
                disabled={!isFormValid}
              />
            </div>
          </div>
        </Box>

        <div className='flex flex-col gap-y-4'>
          <p
            className='text-xs border-b pb-5'
          >By getting started, you agree to our <Link href='#' className='text-blue-500'>Terms of Use</Link> and <Link href='#' className='text-blue-500'>Privacy Policy</Link>.</p>
          <LocationDetector />
        </div>
      </div>
    </main>
  )
}