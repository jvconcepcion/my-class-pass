import React from 'react';
import clsx from 'clsx';
import { ButtonProps } from '@lib/types';

const Button: React.FC<ButtonProps> = ({
  label = 'Outlined',
  borderColor = 'black',
  backgroundColor = 'black',
  fontColor = 'white',
  className,
  onClick,
  children,
  disabled = false
}) => {

  return (
    <button 
      className={clsx('w-full border text-sm flex items-center justify-center mt-2 leading-none py-3', disabled && 'opacity-55 pointer-events-none', className)}
      style={{ borderColor, backgroundColor, color: fontColor }}
      onClick={onClick}
    >
      {children}
      <span className='flex-1 text-center'>{label}</span>
    </button>
  )
}

export default Button