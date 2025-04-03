  import clsx from 'clsx';
import { StudioAddressCardProps } from '@lib/types';
import Map from './Map';

const StudioAddressCard: React.FC<StudioAddressCardProps> = ({
  data,
  className,
  width = 280,
  height = 200,
}) => {

  return (
    <div className={clsx(className, 'w-full transition-all duration-500 ease-in-out')}>
      <div style={{ height, width }}>
        <Map data={data?.locations[0]?.calculatedAddress} />
      </div>
    </div>
  )
}

export default StudioAddressCard;