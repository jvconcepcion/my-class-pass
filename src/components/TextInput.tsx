import React from 'react';
import clsx from 'clsx';
import { SxProps, TextField, Theme } from '@mui/material';
import { TextInputProps } from '@lib/types';

const TextInput: React.FC<TextInputProps> = ({
  id = 'outline-id',
  label = 'Label',
  type = '',
  sx = {
    '& .MuiOutlinedInput-root': {
      padding: '0',
    },
    '& .MuiInputBase-input': {
      padding: '11px 8px 8px',
    },
    '& .MuiFormLabel-root' : {
      top: '-4px'
    }
  },
  autoFocus = false,
  className = '',
  autoComplete = ''
}) => {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      sx={sx}
      autoFocus={autoFocus}
      className={clsx(className)}
      autoComplete={autoComplete}
    />
  )
}

export default TextInput;