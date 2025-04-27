import React from 'react';
import { useNavigate } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import GameOverlay from '../components/game/GameOverlay';
import MobileGameOverlay from '../components/game/MobileGameOverlay';

const Game = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition"
        aria-label="Go back to home"
      >
        ← Back
      </button>
      <div className="w-full max-w-4xl">
        {isMobile ? <MobileGameOverlay /> : <GameOverlay />}
      </div>
    </div>
  );
};

export default Game;