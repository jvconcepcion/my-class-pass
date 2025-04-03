import { useState, JSX } from 'react';
import Svg from './Svg';

interface NoticeProps {
  children?: string | JSX.Element | JSX.Element;
}
const Notice: React.FC<NoticeProps> = ({
  children
}) => {
  const [open, setOpen] = useState<boolean>(true);

  const handleNotice = () => {
    setOpen(false);
  }
  return open && (
    <div className="bg-[#fce172] py-2 text-sm flex items-center justify-between px-4 font-medium min-h-[48px]">
      <span className="flex-1 text-center">
        {children}
      </span>
      <button 
        aria-label="Close"
        onClick={handleNotice}
      >
        <span className="svg" data-component="Icon">
          <Svg component='close' />
        </span>
      </button>
    </div>
  )
}

export default Notice