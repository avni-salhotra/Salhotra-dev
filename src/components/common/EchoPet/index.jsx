// src/components/common/EchoPet/index.jsx
import React, { useEffect, useRef, useState } from 'react';
import './echoPet.css';

/**
 * EchoPet Component - Renders an animated sprite of a pet
 * 
 * @param {number} row - The row in the sprite sheet (0-5, controls animation type)
 * @param {string} direction - The direction the pet faces ('side' or 'front')
 * @param {number} frameDuration - Duration of each animation frame in ms (lower = faster)
 */
const EchoPet = ({ 
  row = 0, 
  direction = "side", 
  frameDuration = 150 
}) => {
  const ref = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Preload the sprite image
  useEffect(() => {
    const img = new Image();
    img.src = `/echo-sprite/echo-${direction}.png`;
    img.onload = () => setIsImageLoaded(true);
    img.onerror = (err) => console.error("Failed to load sprite:", err);
  }, [direction]);
  
  // Handle sprite animation
  useEffect(() => {
    if (!ref.current || !isImageLoaded) return;
    
    let frame = 0;
    const totalFrames = 8;
    const frameWidth = 48;
    const frameHeight = 48;
    let animationFrame;
    
    const updateFrame = () => {
      const x = frame * frameWidth;
      const y = row * frameHeight;
      
      if (ref.current) {
        ref.current.style.backgroundPosition = `-${x}px -${y}px`;
      }
      
      frame = (frame + 1) % totalFrames;
      animationFrame = setTimeout(updateFrame, frameDuration);
    };
    
    updateFrame();
    
    return () => {
      if (animationFrame) clearTimeout(animationFrame);
    };
  }, [row, frameDuration, isImageLoaded]);
  
  return (
    <div
      ref={ref}
      className="echo-pet"
      style={{
        backgroundImage: `url('/echo-sprite/echo-${direction}.png')`,
        backgroundPosition: '0px 0px',
        backgroundSize: 'auto',
      }}
      aria-label="Animated pet sprite"
    />
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(EchoPet);