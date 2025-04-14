import React from 'react';
import { ProgressBarProps } from '@lib/types';
import { LinearProgress } from '@mui/material';

const ProgressBar: React.FC<ProgressBarProps> = ({
  loading = true
}) => {
  return (
    <div className="relative">
      {loading && (
        <div
          className={`transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <LinearProgress />
        </div>
      )}
    </div>
  )
}

export default ProgressBar;