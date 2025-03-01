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
  children?: React.JSX.Element | React.JSX.Element[]
}