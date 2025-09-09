'use client';

import useCarouselTimer from './hooks/useCarouselTimer';
import Slide from './Slide';
import {
  CarouselContainer,
  CarouselPagination,
  CarouselPaginationButton,
} from './styles';

interface CarouselProps {
  children: React.ReactNode[];
}
const Carousel: React.FC<React.PropsWithChildren<CarouselProps>> = ({
  children,
}) => {
  const { slideIndex, setCurrentSlide } = useCarouselTimer(children.length);

  return (
    <CarouselContainer>
      {children.map((child, index) => (
        <Slide key={index} isActive={index === slideIndex}>
          {child}
        </Slide>
      ))}
      <CarouselPagination>
        {children.map((_, index) => (
          <CarouselPaginationButton
            key={index}
            onClick={() => setCurrentSlide(index)}
            $isActive={index === slideIndex}
          />
        ))}
      </CarouselPagination>
    </CarouselContainer>
  );
};

export default Carousel;
