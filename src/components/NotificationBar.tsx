import React, { useState } from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { NotificationBarProps } from '@lib/types';
import Alert from '@mui/material/Alert';
import { SeverityStatus } from '@lib/enums';

const NotificationBar: React.FC<NotificationBarProps> = ({
  open,
  autoHideDuration,
  handleNotif,
  message = 'Put your message here',
  severity = SeverityStatus.INFO,
  sx = { width: '100%' }
}) => {

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    handleNotif(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant='filled'
        sx={sx}
        className='uppercase text-xs'
      >
        {message}
      </Alert>
    </Snackbar>
  )
};

export default NotificationBar;