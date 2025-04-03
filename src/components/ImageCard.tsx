import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import { ImageCardProps } from '@lib/types';

const ImageCard: React.FC<ImageCardProps> = ({
  url,
  width,
  height,
  className,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={clsx(className, 'w-full transition-all duration-500 ease-in-out')}>
      {!loaded && (
        <Skeleton
          variant="rounded"
          width={width}
          height={height}
          className="transition-opacity duration-500 ease-in-out"
        />
      )}

      {url && (
        <Image
          src={url ?? ''}
          width={width}
          height={height}
          alt=''
          className={`w-full sm:rounded-sm transition-opacity duration-500 ease-in-out ${loaded ? "opacity-100" : "opacity-0"
            }`}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  )
}

export default ImageCard