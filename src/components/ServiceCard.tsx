import Link from 'next/link';
import { useState } from 'react';
import { CardProps } from '@lib/types';
import { media } from '@wix/sdk';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import TruncatedText from './TruncatedText';

const ServiceCard: React.FC<CardProps> = ({ service }) => {
  const [toggleBtn, setToggleBtn] = useState<boolean>(true);
  const image = media.getImageUrl(service.media.mainMedia.image);

  return (
    <section>
      <Card className='flex shadow-none'>
        <CardMedia
          component='img'
          className='w-[120px] md:w-[168px] rounded-lg'
          image={image.url}
          alt={service.name}
        />
        <Box className='flex flex-col md:mr-4'>
          <CardContent className='overflow-hidden'>
            <Link className='cursor-pointer' href={`/studios/${encodeURIComponent(service.mainSlug.name)}`}>
              <Typography component='div' variant='body1' className='text-xs text-gray-500 font-bold'>
                {service.name}
              </Typography>
            </Link>
            <Typography
              component='div'
              variant='h2'
              className='text-sm font-medium max-w-[60%] md:max-w-[240px] whitespace-nowrap overflow-hidden text-ellipsis'
            >
              {service.tagLine}
            </Typography>

            <Typography
              variant='body2'
              component='div'
              className='text-sm font-normal max-w-[60%] md:max-w-[240px] whitespace-nowrap overflow-hidden text-ellipsis'
            >
              {service.locations[0].calculatedAddress.formatted}
            </Typography>
            <div className='flex items-center text-sm text-gray-700 mt-1 md:hidden'>
              <button onClick={() => setToggleBtn(!toggleBtn)} className='text-blue-500 text-xs'>{!toggleBtn ? 'less info' : 'more info'}</button>
            </div>
          </CardContent>
        </Box>
        <Box className='hidden sm:block border-l'>
          <CardContent>
            <Typography component='div' variant='body1' className='text-sm text-gray-500'>
              <TruncatedText 
                text={service.description}
                maxSentences={3}
              />
            </Typography>
          </CardContent>
        </Box>
      </Card>
      {!toggleBtn && (
        <div className='mt-3 text-sm text-gray-700'>
          <h3 className='font-semibold'>Description:</h3>
          <p className='text-xs text-gray-600 mt-1'>
            {service.description}
          </p>
        </div>
      )}
    </section>
  );
};

export default ServiceCard;