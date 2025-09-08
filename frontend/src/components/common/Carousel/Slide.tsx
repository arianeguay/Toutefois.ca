import { SlideContainer } from './styles';

interface SlideProps {
  isActive: boolean;
}

const Slide: React.FC<React.PropsWithChildren<SlideProps>> = ({
  isActive,
  children,
}) => {
  return <SlideContainer $isCurrent={isActive}>{children}</SlideContainer>;
};

export default Slide;
