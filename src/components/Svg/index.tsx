import Check from './Check';
import Apple from './Apple';
import ArrowDown from './ArrowDown';
import DlOnAppstore from './DlOnAppstore';
import DLOnPlaystore from './DLOnPlaystore';
import Facebook from './Facebook';
import Twitter from './Twitter';
import Instagram from './Instagram';
import Pinterest from './Pinterest';
import Spotify from './Spotify';
import clsx from 'clsx';

interface SvgProps {
  component: string;
  className?: string;
}
const Svg: React.FC<SvgProps> = ({
  component,
  className,
}) => {

  return (
    <div className={clsx(className)}>
      {component === 'check' && <Check />}
      {component === 'ios' && <Apple />}
      {component === 'arrowdown' && <ArrowDown />}
      {component === 'dlonappstore' && <DlOnAppstore />}
      {component === 'dlonplaystore' && <DLOnPlaystore />}
      {component === 'facebook' && <Facebook />}
      {component === 'twitter' && <Twitter />}
      {component === 'instagram' && <Instagram />}
      {component === 'pinterest' && <Pinterest />}
      {component === 'spotify' && <Spotify />}
    </div>
  )
}

export default Svg;