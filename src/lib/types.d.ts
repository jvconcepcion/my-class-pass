import { ChangeEvent } from 'react';
import { services } from '@wix/bookings';

export interface HeaderNavProps {
  pathname: string;
  children?: React.JSX.Element | React.JSX.Element[];
}

export interface AboutSlideProps {
  title: string;
  description: string;
  subDesc: string;
  image: string;
}

export interface SvgComponentProps {
  color?: string;
}

export interface ButtonProps {
  label: string;
  borderColor?: string;
  backgroundColor?: string;
  fontColor?: string;
  className?: string;
  onClick?: any;
  children?: React.JSX.Element | React.JSX.Element[];
  disabled?: boolean;
}

export interface ServiceListProps {
  [key: string]: any;
}

export interface AvailabilityListProps {
  [key: string]: any;
}

export interface CardProps {
  [key: string]: any;
}

export interface MapProps {
  [key: string]: any;
}

export interface ImageCardProps {
  url: string;
  width: number;
  height: number;
  className?: string;
};

export interface LocationData {
  formatted: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  sx?: SxProps<Theme>;
  autoFocus?: boolean;
  className?: string;
  autoComplete?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  endAdornment?: React.JSX.Element | React.JSX.Element[];
}

type AlertColor = 'error' | 'info' | 'success' | 'warning';

export interface NotificationBarProps {
  open: boolean;
  autoHideDuration?: number;
  handleNotif: React.Dispatch<React.SetStateAction<boolean>>;
  message?: string;
  severity?: AlertColor;
  sx?: SxProps<Theme>;
};

export interface NormalizedLocation {
  lat: number;
  lng: number;
  title: string;
};

export interface StudioAddressCardProps {
  data?: any;
  width: number;
  height: number;
  className?: string;
};

export interface ScheduleCardProps {
  [key: string]: any;
};

export interface SlotAvailability {
  slot: {
    resource: {
      name: string;
    };
  };
}

export interface TruncateResult {
  text: string;
  isTruncated: boolean;
};

export interface TruncatedTextProps {
  text: string;
  maxSentences?: number;
  withReadMore?: boolean;
};

export interface ProgressBarProps {
  loading: boolean;
}

export interface RegistrationProps {
  contactInfo: {
    [key: string]: string;
  },
  privacyStatus: string;
};