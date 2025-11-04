import React, { useState } from 'react';
import { useAnimation } from '../context/AnimationContext';
import useGradientAnimation from '../hooks/useGradientAnimation';

const ControlPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { settings, updateSettings } = useAnimation();
  const { colorPalettes, animateToColors } = useGradientAnimation();

  const predefinedColors = [
    { name: 'Tropical', colors: { color1: '#ff6b6b', color2: '#4ecdc4', color3: '#45b7d1' } },
    { name: 'Purple Dream', colors: { color1: '#667eea', color2: '#764ba2', color3: '#f093fb' } },
    { name: 'Sunset', colors: { color1: '#f093fb', color2: '#f5576c', color3: '#4facfe' } },
    { name: 'Ocean', colors: { color1: '#4facfe', color2: '#00f2fe', color3: '#43e97b' } },
    { name: 'Warm', colors: { color1: '#fa709a', color2: '#fee140', color3: '#ff6b6b' } }
  ];

  const handleColorChange = (colors) => {
    animateToColors(colors, settings.animationSpeed);
  };

  const handleSpeedChange = (speed) => {
    updateSettings({ animationSpeed: parseInt(speed) });
  };

  const handleDensityChange = (density) => {
    updateSettings({ particleDensity: parseInt(density) });
  };

  const togglePanel = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <button 
        className="control-toggle"
        onClick={togglePanel}
      >
        {isVisible ? '▲' : '▼'} Controls
      </button>
      
      <div className={`control-panel ${isVisible ? 'visible' : ''}`}>
        <div className="control-section">
          <h3>Color Schemes</h3>
          <div className="color-buttons">
            {predefinedColors.map((scheme, index) => (
              <button
                key={index}
                className="color-button"
                onClick={() => handleColorChange(scheme.colors)}
                style={{
                  background: `linear-gradient(135deg, ${scheme.colors.color1}, ${scheme.colors.color2}, ${scheme.colors.color3})`
                }}
                title={scheme.name}
              >
                {scheme.name}
              </button>
            ))}
          </div>
        </div>

        <div className="control-section">
          <h3>Animation Speed: {settings.animationSpeed}s</h3>
          <input
            type="range"
            min="1"
            max="10"
            value={settings.animationSpeed}
            onChange={(e) => handleSpeedChange(e.target.value)}
            className="slider"
          />
        </div>

        <div className="control-section">
          <h3>Particle Density: {['Off', 'Low', 'Medium', 'High'][settings.particleDensity]}</h3>
          <input
            type="range"
            min="0"
            max="3"
            value={settings.particleDensity}
            onChange={(e) => handleDensityChange(e.target.value)}
            className="slider"
          />
        </div>

        <div className="control-section">
          <h3>Effects</h3>
          <div className="toggle-buttons">
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.mouseEffect}
                onChange={(e) => updateSettings({ mouseEffect: e.target.checked })}
              />
              <span className="toggle-label">Mouse Effect</span>
            </label>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.autoAnimate}
                onChange={(e) => updateSettings({ autoAnimate: e.target.checked })}
              />
              <span className="toggle-label">Auto Animate</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlPanel;