import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ParticleSystem = ({ density = 1, isActive = true }) => {
  const particlesRef = useRef(null);
  const animationRef = useRef(null);

  const createParticle = () => {
    if (!particlesRef.current || !isActive) return;

    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    const size = Math.random() * 25 + 5;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startX}%`;
    particle.style.top = `${startY}%`;
    particle.style.background = `radial-gradient(circle, 
      rgba(255,255,255,${Math.random() * 0.4 + 0.1}) 0%, 
      rgba(255,255,255,0) 70%)`;
    particle.style.borderRadius = '50%';
    particle.style.position = 'absolute';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    
    particlesRef.current.appendChild(particle);
    
    // Complex particle animation
    const timeline = gsap.timeline();
    timeline
      .fromTo(particle, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: Math.random() * 0.6 + 0.2, duration: 1, ease: "power2.out" }
      )
      .to(particle, {
        x: `+=${(Math.random() - 0.5) * 300}`,
        y: `+=${(Math.random() - 0.5) * 300}`,
        rotation: 360,
        duration: Math.random() * 15 + 10,
        ease: "sine.inOut",
      })
      .to(particle, {
        scale: 0,
        opacity: 0,
        duration: 2,
        ease: "power2.in",
        onComplete: () => particle.remove()
      }, "-=2");
  };

  const startParticleSystem = () => {
    if (!isActive) return;

    // Clear existing particles
    if (particlesRef.current) {
      particlesRef.current.innerHTML = '';
    }

    // Create initial particles based on density
    const initialParticles = density * 10;
    for (let i = 0; i < initialParticles; i++) {
      setTimeout(() => createParticle(), i * 500);
    }

    // Continuous particle creation
    animationRef.current = setInterval(() => {
      if (Math.random() > (1 - density * 0.3)) {
        createParticle();
      }
    }, 1000);
  };

  const stopParticleSystem = () => {
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }
    if (particlesRef.current) {
      particlesRef.current.innerHTML = '';
    }
  };

  useEffect(() => {
    if (isActive) {
      startParticleSystem();
    } else {
      stopParticleSystem();
    }

    return () => {
      stopParticleSystem();
    };
  }, [density, isActive]);

  return <div ref={particlesRef} className="particle-system" />;
};

export default ParticleSystem;