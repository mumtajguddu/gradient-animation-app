import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const useGradientAnimation = (initialColors) => {
  const [colors, setColors] = useState(initialColors);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);

  const colorPalettes = [
    { color1: '#ff6b6b', color2: '#4ecdc4', color3: '#45b7d1' },
    { color1: '#667eea', color2: '#764ba2', color3: '#f093fb' },
    { color1: '#f093fb', color2: '#f5576c', color3: '#4facfe' },
    { color1: '#4facfe', color2: '#00f2fe', color3: '#43e97b' },
    { color1: '#fa709a', color2: '#fee140', color3: '#ff6b6b' },
    { color1: '#a8edea', color2: '#fed6e3', color3: '#667eea' },
  ];

  const animateToColors = (targetColors, duration = 3) => {
    if (animationRef.current) {
      animationRef.current.kill();
    }

    setIsAnimating(true);
    
    animationRef.current = gsap.to(colors, {
      color1: targetColors.color1,
      color2: targetColors.color2,
      color3: targetColors.color3,
      duration,
      ease: "power2.inOut",
      onUpdate: () => {
        setColors({ ...colors });
      },
      onComplete: () => {
        setIsAnimating(false);
      }
    });
  };

  const animateToRandom = (duration = 3) => {
    const randomPalette = colorPalettes[
      Math.floor(Math.random() * colorPalettes.length)
    ];
    animateToColors(randomPalette, duration);
  };

  const startAutoAnimation = (interval = 5000) => {
    const autoAnimate = () => {
      animateToRandom();
      setTimeout(autoAnimate, interval + 3000); // interval + animation duration
    };
    autoAnimate();
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      animationRef.current.kill();
      setIsAnimating(false);
    }
  };

  useEffect(() => {
    return () => {
      stopAnimation();
    };
  }, []);

  return {
    colors,
    isAnimating,
    animateToColors,
    animateToRandom,
    startAutoAnimation,
    stopAnimation,
    colorPalettes
  };
};

export default useGradientAnimation;