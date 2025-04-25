// src/hooks/useEchoAnimation.js
import { useState, useEffect } from 'react';

/**
 * Custom hook to handle Echo pet animations
 * Controls movement, direction, and animation states
 */
export const useEchoAnimation = () => {
  // Position and animation state
  const [dogX, setDogX] = useState(0);
  const [echoState, setEchoState] = useState('walkSide');
  const [echoDirection, setEchoDirection] = useState('right');

  // Side-walking animation effect
  useEffect(() => {
    if (echoState !== 'walkSide') return;
    
    const interval = setInterval(() => {
      setDogX((prevX) => {
        // This is the key fix - make movement direction match the visual direction
        // When direction is 'right', increment X; when 'left', decrement X
        const nextX = echoDirection === 'right' ? prevX + 1 : prevX - 1;
        
        // Change direction at boundaries
        if (nextX > 40) {
          setEchoDirection('left');
          return 40;
        }
        if (nextX < -40) {
          setEchoDirection('right');
          return -40;
        }
        
        return nextX;
      });
    }, 40);
    
    return () => clearInterval(interval);
  }, [echoDirection, echoState]);

  // Random mood changes
  useEffect(() => {
    const moods = ['walkSide', 'sit', 'idleWag'];
    const interval = setInterval(() => {
      setEchoState(moods[Math.floor(Math.random() * moods.length)]);
    }, 7000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    dogX,
    echoState,
    echoDirection
  };
};

export default useEchoAnimation;