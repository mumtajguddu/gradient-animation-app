import React from 'react';
import { AnimationProvider } from './context/AnimationContext';
import GradientBackground from './components/GradientBackground';
import ControlPanel from './components/ControlPanel';
import ParticleSystem from './components/ParticleSystem';
import './styles/GradientAnimation.css';

function App() {
  return (
    <AnimationProvider>
      <div className="App">
        <GradientBackground />
        <ParticleSystem density={1} isActive={true} />
        <ControlPanel />
        <div className="content">
          <h1>Advanced Gradient Animation</h1>
          <p>Experience dynamic color transitions powered by GSAP</p>
          <div className="feature-list">
            <div className="feature">Smooth Color Transitions</div>
            <div className="feature">Floating Particles</div>
            <div className="feature">Interactive Controls</div>
            <div className="feature">Responsive Design</div>
          </div>
        </div>
      </div>
    </AnimationProvider>
  );
}

export default App;