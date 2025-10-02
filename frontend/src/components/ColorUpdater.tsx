'use client';

import { useColorContext } from '@/providers/color-provider';
import { useEffect } from 'react';

interface ColorUpdaterProps {
  color?: string;
}

// This client component updates the color context when a page loads
const ColorUpdater = ({ color }: ColorUpdaterProps) => {
  const { setMainColor } = useColorContext();
  
  useEffect(() => {
    // Set the color in context
    setMainColor(color || '');
  }, [color, setMainColor]);
  
  // This component doesn't render anything visible
  return null;
};

export default ColorUpdater;
