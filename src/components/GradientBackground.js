import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useGradientAnimation from '../hooks/useGradientAnimation';
import { useAnimation } from '../context/AnimationContext';

const GradientBackground = () => {
  const gradientRef = useRef(null);
  const { settings } = useAnimation();
  const { colors, animateToRandom, startAutoAnimation } = useGradientAnimation({
    color1: '#ff6b6b',
    color2: '#4ecdc4',
    color3: '#45b7d1'
  });

  useEffect(() => {
    // Mouse move parallax effect
    const handleMouseMove = (e) => {
      if (!settings.mouseEffect || !gradientRef.current) return;

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      gsap.to(gradientRef.current, {
        x: (x - 0.5) * 30,
        y: (y - 0.5) * 30,
        duration: 2,
        ease: "power2.out"
      });
    };

    // Auto animation
    if (settings.autoAnimate) {
      startAutoAnimation(8000);
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [settings.mouseEffect, settings.autoAnimate, startAutoAnimation]);

  const gradientStyle = {
    background: `linear-gradient(135deg, 
      ${colors.color1} 0%, 
      ${colors.color2} 50%, 
      ${colors.color3} 100%)`,
    backgroundSize: '400% 400%'
  };

  return (
    <div 
      ref={gradientRef}
      className="gradient-background"
      style={gradientStyle}
    >
      <div className="gradient-overlay"></div>
      <div className="gradient-shine"></div>
    </div>
  );
};

export default GradientBackground;