import React, { createContext, useContext, useState } from 'react';

const AnimationContext = createContext();

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export const AnimationProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    animationSpeed: 3,
    particleDensity: 1,
    mouseEffect: true,
    autoAnimate: true,
    currentEffect: 'gradient'
  });

  const [currentColors, setCurrentColors] = useState({
    color1: '#ff6b6b',
    color2: '#4ecdc4',
    color3: '#45b7d1'
  });

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateColors = (colors) => {
    setCurrentColors(colors);
  };

  const value = {
    settings,
    currentColors,
    updateSettings,
    updateColors
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};