import Check from './Check';
import Apple from './Apple';
import Google from './Google';
import ArrowDown from './ArrowDown';
import DlOnAppstore from './DlOnAppstore';
import DLOnPlaystore from './DLOnPlaystore';
import Facebook from './Facebook';
import Twitter from './Twitter';
import Instagram from './Instagram';
import Pinterest from './Pinterest';
import Spotify from './Spotify';
import clsx from 'clsx';
import Planet from './Planet';

interface SvgProps {
  component: string;
  className?: string;
  color?: string;
}
const Svg: React.FC<SvgProps> = ({
  component,
  className,
  color,
}) => {

  return (
    <div className={clsx(className)}>
      {component === 'check' && <Check color={color} />}
      {component === 'ios' && <Apple color={color} />}
      {component === 'google' && <Google />}
      {component === 'arrowdown' && <ArrowDown color={color} />}
      {component === 'dlonappstore' && <DlOnAppstore />}
      {component === 'dlonplaystore' && <DLOnPlaystore />}
      {component === 'facebook' && <Facebook color={color} />}
      {component === 'twitter' && <Twitter color={color} />}
      {component === 'instagram' && <Instagram color={color} />}
      {component === 'pinterest' && <Pinterest color={color} />}
      {component === 'spotify' && <Spotify color={color} />}
      {component === 'planet' && <Planet />}
    </div>
  )
}

export default Svg;