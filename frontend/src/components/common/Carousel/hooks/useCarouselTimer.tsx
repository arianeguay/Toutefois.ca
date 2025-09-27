'use client';

import { useEffect, useState } from 'react';

const useCarouselTimer = (slides: number, durationMs: number) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [timerSeed, setTimerSeed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides);
    }, durationMs);

    return () => clearInterval(interval);
    // Restart interval whenever duration, slides, or seed changes
  }, [slides, durationMs, timerSeed]);

  const setCurrentSlide = (index: number) => setSlideIndex(index);
  const resetTimer = () => setTimerSeed((s) => s + 1);

  return { slideIndex, setCurrentSlide, resetTimer, timerSeed };
};

export default useCarouselTimer;
