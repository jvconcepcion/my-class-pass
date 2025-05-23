import React from 'react';
import { SvgComponentProps } from '@lib/types';

const Close: React.FC<SvgComponentProps> = ({
  color = 'none'
}) => {

  return (
    <>
      <svg width='24' height='24' fill={color} xmlns='http://www.w3.org/2000/svg'>
        <path d='M18.295 7.115a.997.997 0 1 0-1.41-1.41L12 10.59 7.115 5.705a.997.997 0 0 0-1.41 1.41L10.59 12l-4.885 4.885a.997.997 0 0 0 1.41 1.41L12 13.41l4.885 4.885a.997.997 0 1 0 1.41-1.41L13.41 12l4.885-4.885Z' fill='currentColor' />
      </svg>
    </>
  )
};

export default Close;