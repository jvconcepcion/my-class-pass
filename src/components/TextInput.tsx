import React, { useState } from 'react';
import clsx from 'clsx';
import { OutlinedInput, InputLabel, FormControl, InputAdornment } from '@mui/material';
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
      padding: '8px 8px 8px',
    },
    '& .MuiFormLabel-root': {
      top: '-6px'
    }
  },
  autoFocus = false,
  className = '',
  autoComplete = '',
  value,
  onChange,
  endAdornment,
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
    <FormControl sx={sx} variant='outlined'>
      <InputLabel htmlFor='outlined-textfield'>{label}</InputLabel>
      <OutlinedInput
        id={id}
        label={label}
        type={type}
        autoFocus={autoFocus}
        className={clsx(className)}
        autoComplete={autoComplete}
        value={isControlled ? value : text}
        onChange={handleChange}
        endAdornment={
          endAdornment ?
            <InputAdornment position='end'>
              {endAdornment}
            </InputAdornment>
            : <></>
        }
      />
    </FormControl>
  )
}

export default TextInput;