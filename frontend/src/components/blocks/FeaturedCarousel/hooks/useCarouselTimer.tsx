'use client';

import { useEffect, useState } from 'react';

const useCarouselTimer = (slides: number) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSlideIndex((prev) => (prev + 1) % slides);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [slides, isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);

  return { slideIndex, startTimer, stopTimer };
};

export default useCarouselTimer;
