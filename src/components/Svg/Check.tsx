import { SvgComponentProps } from '@lib/types';

const Check: React.FC<SvgComponentProps> = ({
  color = 'none'
}) => {
  return (
    <>
      <svg width='24' height='25' fill={color} xmlns='http://www.w3.org/2000/svg'>
        <path d='m6.5 12.65 4 3.5 7-7' stroke='#000' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'></path>
      </svg>
    </>
  )
}

export default Check