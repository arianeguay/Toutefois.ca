'use client';

import useCarouselTimer from './hooks/useCarouselTimer';
import Slide from './Slide';
import {
  CarouselContainer,
  CarouselPagination,
  CarouselPaginationButton,
  ProgressBar,
} from './styles';

interface CarouselProps {
  children: React.ReactNode[];
}
const DURATION_MS = 10000; // must match useCarouselTimer interval

const Carousel: React.FC<React.PropsWithChildren<CarouselProps>> = ({
  children,
}) => {
  const { slideIndex, setCurrentSlide, resetTimer, timerSeed } =
    useCarouselTimer(children.length, DURATION_MS);

  return (
    <CarouselContainer>
      {children.map((child, index) => (
        <Slide key={index} isActive={index === slideIndex}>
          {child}
        </Slide>
      ))}
      {/* Progress bar resets when slide changes or timer resets via key */}
      <ProgressBar
        key={`${slideIndex}-${timerSeed}`}
        $durationMs={DURATION_MS}
      />
      <CarouselPagination>
        {children.map((_, index) => (
          <CarouselPaginationButton
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              resetTimer();
            }}
            $isActive={index === slideIndex}
          />
        ))}
      </CarouselPagination>
    </CarouselContainer>
  );
};

export default Carousel;
