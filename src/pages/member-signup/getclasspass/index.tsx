import React, { useState } from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import { TextInput, Button, LocationDetector } from '@components';
import { getWixClient } from '@lib/wixClient';
import { ServiceListProps } from '@lib/types';
import Link from 'next/link';
import CheckIcon from '@mui/icons-material/Check';

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
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [options, setOptions] = useState<RegistrationProps>({
    contactInfo: {
      firstName: '',
      lastName: '',
    },
    privacyStatus: ''
  });

  const handleToggleStatus = () => {
    setIsPublic((prev) => !prev);
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
    console.log(e)
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
            <li><CheckIcon className='mr-2 text-sm' /> Get 28 credits to visit a selection of our best studios & gyms one time each.</li>
            <li><CheckIcon className='mr-2 text-sm' /> Credits expire at the end of your trial.</li>
            <li><CheckIcon className='mr-2 text-sm' /> We'll send you an email reminder before your trial ends. Cancel anytime.</li>
            <li><CheckIcon className='mr-2 text-sm' /> Upgrade anytime to unlock access to salons & spas as well as repeat bookings.</li>
          </ul>
        </div>
      </div>

      <div className='rounded flex flex-col p-6 bg-white gap-y-5 h-[569px]'>
        <Box
          component='form'
          noValidate
          autoComplete='off'
        >
          <div className='flex flex-col gap-y-4 text-sm'>
            <TextInput id='outlined-email' type='email' label='Email Address' />
            <TextInput id='outlined-password' type='password' label='Password' autoComplete='current-password' />
            <TextInput id='outlined-fname' label='Firstname' />
            <TextInput id='outlined-lname' label='Lastname' />
            <FormControlLabel
              control={
                <Switch
                  checked={isPublic}
                  onChange={handleToggleStatus}
                  color='primary'
                />
              }
              label={isPublic ? 'Public' : 'Private'}
            />
            <div className='flex justify-center'>
              <Button label='Sign up' borderColor='#05f' backgroundColor='#05f' fontColor='white' />
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