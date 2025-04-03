import React from 'react';
import { SvgComponentProps } from '@lib/types';

const Address: React.FC<SvgComponentProps> = ({
  color = 'none'
}) => {
  return (
    <>
      <svg width='24' height='24' fill={color} xmlns='http://www.w3.org/2000/svg'>
        <rect x='11.878' y='2.293' width='13.556' height='13.556' rx='2' transform='rotate(45 11.878 2.293)' stroke='currentColor' strokeWidth='2' />
        <path d='M13.878 10.878h-2.5a2.5 2.5 0 0 0-2.5 2.5v1' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        <path d='M16.525 10.524a.5.5 0 0 1 0 .707l-1.793 1.793a.5.5 0 0 1-.854-.353V9.085a.5.5 0 0 1 .854-.354z' fill='currentColor' />
      </svg>
    </>
  )
}

export default Address;