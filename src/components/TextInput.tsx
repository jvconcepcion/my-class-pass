import React, { useState } from 'react';
import clsx from 'clsx';
import { SxProps, TextField, Theme } from '@mui/material';
import { TextInputProps } from '@lib/types';

const TextInput: React.FC<TextInputProps> = ({
  id = 'outline-id',
  label = 'Label',
  type = 'text',
  sx = {
    '& .MuiOutlinedInput-root': {
      padding: '0',
    },
    '& .MuiInputBase-input': {
      padding: '11px 8px 8px',
    },
    '& .MuiFormLabel-root': {
      top: '-4px'
    }
  },
  autoFocus = false,
  className = '',
  autoComplete = '',
  value,
  onChange,
}) => {
  const [text, setText] = useState<string>('');

  // Determine whether to use controlled or internal state
  const isControlled = value !== undefined && onChange !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isControlled) {
      onChange(e);
    } else {
      setText(e.target.value);
    }
  };

  return (
    <TextField
      id={id}
      label={label}
      type={type}
      sx={sx}
      autoFocus={autoFocus}
      className={clsx(className)}
      autoComplete={autoComplete}
      value={isControlled ? value : text}
      onChange={handleChange}
    />
  )
}

export default TextInput;