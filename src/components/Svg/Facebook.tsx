import React from 'react';
import { SvgComponentProps } from '@lib/types';

const Facebook: React.FC<SvgComponentProps> = ({
  color = 'none'
}) => {
  return (
    <>
      <svg width='24' height='24' fill={color} xmlns='http://www.w3.org/2000/svg'>
        <title>Facebook</title>
        <path d='M17.113 9.203h-3.236V7.08c0-.797.528-.983.9-.983h2.284V2.593l-3.145-.012c-3.492 0-4.287 2.613-4.287 4.286v2.336H7.61v3.61h2.02v10.219h4.247V12.814h2.866l.37-3.611Z' fill='#fff' />
      </svg>
    </>
  )
}

export default Facebook;