import React from 'react';
import clsx from 'clsx';
import { ButtonProps } from '@lib/types';

const Button: React.FC<ButtonProps> = ({
  label = 'Outlined',
  borderColor = 'black',
  backgroundColor = 'black',
  fontColor = 'white',
  className,
  children
}) => {

  return (
    <button 
      className={clsx('w-full border text-sm rounded-sm flex items-center justify-center mt-2 leading-none py-3', className)}
      style={{ borderColor, backgroundColor, color: fontColor }}
    >
      {children}
      <span className='flex-1 text-center'>{label}</span>
    </button>
  )
}

export default Button