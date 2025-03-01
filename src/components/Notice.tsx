import { useState, JSX } from 'react';

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
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.295 7.115a.997.997 0 1 0-1.41-1.41L12 10.59 7.115 5.705a.997.997 0 0 0-1.41 1.41L10.59 12l-4.885 4.885a.997.997 0 0 0 1.41 1.41L12 13.41l4.885 4.885a.997.997 0 1 0 1.41-1.41L13.41 12l4.885-4.885Z" fill="currentColor" />
          </svg>
        </span>
      </button>
    </div>
  )
}

export default Notice