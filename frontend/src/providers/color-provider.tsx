'use client';

import React, { createContext, useContext, useState } from 'react';

interface ColorContextType {
  mainColor: string;
  setMainColor: (color: string) => void;
}

// Create the context with default values
const ColorContext = createContext<ColorContextType>({
  mainColor: '',
  setMainColor: () => {},
});

// Export the provider component
export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [mainColor, setMainColor] = useState('');

  return (
    <ColorContext.Provider value={{ mainColor, setMainColor }}>
      {children}
    </ColorContext.Provider>
  );
};

// Custom hook for using the color context
export const useColorContext = () => useContext(ColorContext);
