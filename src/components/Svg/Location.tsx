import React from 'react';
import { SvgComponentProps } from '@lib/types';

const Location: React.FC<SvgComponentProps> = ({
  color = 'none'
}) => {
  return (
    <>
      <svg width='24' height='24' fill={color} xmlns='http://www.w3.org/2000/svg'>
        <path fillRule='evenodd' clipRule='evenodd' d='M18.232 10.078c0 3.198-3.979 7.41-5.518 8.92a.85.85 0 0 1-1.196 0C9.978 17.488 6 13.276 6 10.078 6 6.721 8.738 4 12.116 4s6.116 2.721 6.116 6.078m-3.892-.145c0 1.22-.996 2.21-2.224 2.21a2.217 2.217 0 0 1-2.224-2.21c0-1.22.996-2.21 2.224-2.21s2.224.99 2.224 2.21' fill='currentColor' />
      </svg>
    </>
  )
};

export default Location;