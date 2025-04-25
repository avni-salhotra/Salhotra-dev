// src/components/resume/PersonalInfo.jsx
import React from 'react';
import EchoPet from '../common/EchoPet';

/**
 * Personal information component for the center of the resume
 */
const PersonalInfo = ({
  colors,
  onClick,
  dogX,
  echoState,
  echoDirection
}) => {
  // Determine which animation row to use based on the current state
  const getBehaviorMap = () => {
    return {
      walkSide: { row: 0, direction: 'side' },
      sit:      { row: 2, direction: 'side' },
      idleWag:  { row: 3, direction: 'side' },
      asleep:   { row: 5, direction: 'side' },
    };
  };

  const behaviorMap = getBehaviorMap();

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center p-4 cursor-pointer"
      onClick={onClick}
      role="button"
      aria-label="View interactive game"
    >
      <h1 
        className="text-xl md:text-2xl font-bold text-center uppercase tracking-wide font-mono" 
        style={{ color: colors.lightText }}
      >
        Avni Salhotra
      </h1>
      <p 
        className="text-sm md:text-base text-center uppercase tracking-wide mt-1 font-mono" 
        style={{ color: 'rgba(255,255,255,0.8)' }}
      >
        Software Engineer
      </p>
      
      {/* EchoPet sprite with animation state */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          // The key fix: flip when direction is 'right', not 'left'
          // Since the sprite sheet has dog facing left by default
          transform: `translateX(${dogX}%) scaleX(${echoDirection === 'right' ? -1 : 1})`,
          width: '48px',
          height: '48px',
        }}
      >
        <EchoPet
          row={behaviorMap[echoState].row}
          direction={behaviorMap[echoState].direction}
        />
      </div>
    </div>
  );
};

export default React.memo(PersonalInfo);