import React from 'react';
import { SvgComponentProps } from '@lib/types';

const Magnifier: React.FC<SvgComponentProps> = ({
  color = 'none'
}) => {
  return (
    <>
      <svg width='24' height='24' fill={color} xmlns='http://www.w3.org/2000/svg'>
        <path fillRule='evenodd' clipRule='evenodd' d='M5.05 10.65a5.67 5.67 0 1 1 11.341 0 5.67 5.67 0 0 1-11.34 0m5.67-7.42a7.42 7.42 0 1 0 4.5 13.321q.063.136.175.248l2.762 2.763a.875.875 0 0 0 1.238-1.238l-2.763-2.762a1 1 0 0 0-.214-.157A7.42 7.42 0 0 0 10.72 3.23' fill='currentColor' />
      </svg>
    </>
  )
}

export default Magnifier