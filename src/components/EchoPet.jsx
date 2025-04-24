import React, { useEffect, useRef } from 'react';
import './echoPet.css';

const EchoPet = ({ row = 0, direction = "side" }) => {
  const ref = useRef(null);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 8;
    const frameWidth = 48;
    const frameHeight = 48;
    const interval = setInterval(() => {
      console.log("EchoPet frame:", frame);
      const x = frame * frameWidth;
      const y = row * frameHeight;
      ref.current.style.backgroundPosition = `-${x}px -${y}px`;
      frame = (frame + 1) % totalFrames;
    }, 150);
    return () => clearInterval(interval);
  }, [row]);

  console.log("EchoPet component mounted");

  return (
    <div
      ref={ref}
      className="echo-pet"
      style={{
        backgroundImage: `url('/echo-sprite/echo-${direction}.png')`,
        backgroundPosition: '0px 0px',
        backgroundSize: 'auto',
      }}
    />
  );
};

export default EchoPet;