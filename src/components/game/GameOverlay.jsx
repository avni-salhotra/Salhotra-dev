// src/components/game/GameOverlay.jsx
import React, { useEffect, useRef, useState } from 'react';
import useGameLogic from '../../hooks/useGameLogic';

/**
 * Game overlay component with Echo runner game
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Function to close the game
 */
const GameOverlay = ({ onClose }) => {
  const canvasRef = useRef(null);
  const dogImageRef = useRef(null);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading assets...");
  
  // Game state from custom hook
  const {
    getGameState,
    score,
    gameOver,
    isRunning,
    debugMode,
    dogSpeedMultiplier,
    consecutiveMoves,
    restartGame,
    handleKeyDown,
    setDebugMode
  } = useGameLogic({
    onGameOver: (finalScore) => console.log(`Game Over! Final score: ${finalScore}`),
    canvasWidth: 600,
    canvasHeight: 300
  });

  // Preload game assets
  useEffect(() => {
    let loadingTimeout = null;
    
    // Create and load dog image
    const goldenDog = new Image();
    dogImageRef.current = goldenDog;
    goldenDog.src = "/echo-sprite/echo-side.png";
    
    goldenDog.onload = () => { 
      console.log("Dog sprite loaded successfully");
      setAssetsLoaded(true);
    };
    
    goldenDog.onerror = (err) => {
      console.error("Failed to load dog sprite:", err);
      setLoadingMessage("Error loading dog sprite. Using fallback.");
      setAssetsLoaded(true); // Continue anyway with fallback
    };
    
    // Safety timeout in case images never load
    loadingTimeout = setTimeout(() => {
      console.warn("Asset loading timeout reached. Proceeding with game.");
      setAssetsLoaded(true);
    }, 2000);
    
    // Debug key handling
    const handleDebugToggle = (e) => {
      if (e.key === 'd') {
        setDebugMode(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleDebugToggle);
    
    return () => {
      clearTimeout(loadingTimeout);
      window.removeEventListener('keydown', handleDebugToggle);
    };
  }, [setDebugMode]);

  // Drawing function for the game
  useEffect(() => {
    if (!assetsLoaded || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 300;
    
    // Game render function - separate from game logic
    const renderGame = () => {
      const gameState = getGameState();
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw sky background
      const skyGradient = ctx.createLinearGradient(0, 0, 0, 260);
      skyGradient.addColorStop(0, '#87CEEB'); // Sky blue at top
      skyGradient.addColorStop(1, '#E0F7FF'); // Lighter blue near horizon
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      // Cloud 1
      ctx.beginPath();
      ctx.arc(100 + (gameState.bug.x % 600) * 0.1, 60, 25, 0, Math.PI * 2);
      ctx.arc(130 + (gameState.bug.x % 600) * 0.1, 60, 20, 0, Math.PI * 2);
      ctx.arc(160 + (gameState.bug.x % 600) * 0.1, 60, 25, 0, Math.PI * 2);
      ctx.fill();
      // Cloud 2
      ctx.beginPath();
      ctx.arc(400 + (gameState.bug.x % 600) * 0.05, 40, 20, 0, Math.PI * 2);
      ctx.arc(430 + (gameState.bug.x % 600) * 0.05, 40, 25, 0, Math.PI * 2);
      ctx.arc(460 + (gameState.bug.x % 600) * 0.05, 40, 20, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw grassy terrain
      const grassGradient = ctx.createLinearGradient(0, 260, 0, 300);
      grassGradient.addColorStop(0, '#7CFC00'); // Bright grass green at top
      grassGradient.addColorStop(1, '#228B22'); // Forest green at bottom
      ctx.fillStyle = grassGradient;
      ctx.fillRect(0, 260, canvas.width, 40);
      
      // Draw grass blades
      ctx.strokeStyle = '#32CD32'; // Lime green
      ctx.lineWidth = 2;
      
      // Draw some individual grass blades
      for (let i = 0; i < canvas.width; i += 10) {
        const height = 4 + Math.random() * 6; // Varying heights
        const bend = Math.sin((i + gameState.bug.x * 0.5) * 0.05) * 2; // Gentle movement
        
        ctx.beginPath();
        ctx.moveTo(i, 260);
        ctx.lineTo(i + bend, 260 - height);
        ctx.stroke();
      }
      
      // Draw bug as a square with "404" text
      ctx.fillStyle = 'black';
      ctx.fillRect(gameState.bug.x, gameState.bug.y, gameState.bug.width, gameState.bug.height);
      ctx.fillStyle = 'white';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('404', gameState.bug.x + 15, gameState.bug.y + 15);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      
      // Draw player
      const player = gameState.player;
      if (dogImageRef.current && dogImageRef.current.complete) {
        const frameWidth = 48;
        const frameHeight = 48;
        const row = player.isJumping ? 0 : 2;
        const frame = 0;
        
        ctx.save();
        ctx.translate(player.x + player.width, player.y);
        ctx.scale(-1, 1);
        ctx.drawImage(
          dogImageRef.current,
          frame * frameWidth, row * frameHeight,
          frameWidth, frameHeight,
          0, 0,
          player.width, player.height
        );
        ctx.restore();
      } else {
        // Fallback if image not loaded
        ctx.fillStyle = 'yellow';
        ctx.fillRect(player.x, player.y, player.width, player.height);
      }
      
      // Debug hitboxes
      if (gameState.debugMode) {
        const playerHitbox = {
          x: player.x + 10,
          y: player.y + 5,
          width: player.width - 20,
          height: player.height - 10
        };
        
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.strokeRect(playerHitbox.x, playerHitbox.y, playerHitbox.width, playerHitbox.height);
        
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(gameState.bug.x, gameState.bug.y, gameState.bug.width, gameState.bug.height);
      }
      
      // Draw UI - speed boost indicator
      if (gameState.dogSpeedMultiplier > 1) {
        ctx.fillStyle = 'rgba(255, 215, 0, 0.7)'; // Golden glow
        ctx.font = '16px monospace';
        let speedText = gameState.dogSpeedMultiplier === 1.5 ? "Speed Boost!" : "SUPER SPEED!";
        ctx.fillText(speedText, player.x + 10, player.y - 10);
      }
      
      // Draw consecutive moves counter for player feedback
      if (gameState.consecutiveMoves > 0) {
        ctx.fillStyle = 'white';
        ctx.font = '12px monospace';
        ctx.fillText(`Combo: ${gameState.consecutiveMoves}`, 20, 50);
      }
      
      // Draw score
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.font = 'bold 20px monospace';
      ctx.strokeText(`Score: ${gameState.score}`, 20, 30);
      ctx.fillText(`Score: ${gameState.score}`, 20, 30);
      
      // Draw game over message
      if (gameState.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = '32px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.font = '16px monospace';
        ctx.fillText(`Final Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText('Press ENTER to restart', canvas.width / 2, canvas.height / 2 + 50);
        ctx.textAlign = 'left';
      }
      
      // Continue animation loop if game is running OR if game is over
      // This is the key change - continue rendering even when the game is over
      if (gameState.isRunning || gameState.gameOver) {
        requestAnimationFrame(renderGame);
      }
    };
    
    // Start the rendering loop
    renderGame();
  }, [assetsLoaded, getGameState, isRunning, score, gameOver, debugMode, dogSpeedMultiplier, consecutiveMoves]);

  // Handle keyboard events
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-[9999] flex flex-col items-center justify-center">
      {!assetsLoaded ? (
        <div className="text-white text-xl">
          {loadingMessage}
        </div>
      ) : (
        <>
          <canvas ref={canvasRef} className="rounded-lg shadow-lg" />
          <div className="mt-4 text-white">
            <p><b>Controls:</b> Space/Up Arrow to jump, Right Arrow to move forward</p>
            <p><span className="text-yellow-300">TIP:</span> Rapidly press Right Arrow to build up speed! Watch your combo counter.</p>
            <p className="text-xs text-gray-400 mt-1">Press 'D' to toggle debug hitboxes</p>
          </div>
          <button 
            onClick={onClose} 
            className="mt-6 px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-200"
          >
            Exit Game
          </button>
        </>
      )}
    </div>
  );
};

export default GameOverlay;