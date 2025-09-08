import useCarouselTimer from './hooks/useCarouselTimer';
import Slide from './Slide';
import { CarouselContainer } from './styles';

interface CarouselProps {
  children: React.ReactNode[];
}
const Carousel: React.FC<React.PropsWithChildren<CarouselProps>> = ({
  children,
}) => {
  const { slideIndex, startTimer, stopTimer } = useCarouselTimer(
    children.length,
  );

  return (
    <CarouselContainer>
      {children.map((child, index) => (
        <Slide key={index} isActive={index === slideIndex}>
          {child}
        </Slide>
      ))}
    </CarouselContainer>
  );
};

export default Carousel;
