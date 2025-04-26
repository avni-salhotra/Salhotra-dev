// src/components/game/MobileGameOverlay.jsx
import React, { useEffect, useRef, useState } from 'react';
import useGameLogic from '../../hooks/useGameLogic';

/**
 * Mobile-optimized game overlay with simplified controls
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Function to close the game
 * @param {boolean} props.isFullscreen - Whether the game is in fullscreen mode
 * @param {Function} props.toggleFullscreen - Function to toggle fullscreen mode
 */
const MobileGameOverlay = ({ onClose, isFullscreen, toggleFullscreen }) => {
  const canvasRef = useRef(null);
  const dogImageRef = useRef(null);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading assets...");
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 100
  });
  
  // Game state from custom hook
  const {
    getGameState,
    score,
    gameOver,
    isRunning,
    debugMode,
    restartGame,
    handleKeyDown,
    setDebugMode,
    handleJump // Custom method for mobile tap-to-jump
  } = useGameLogic({
    onGameOver: (finalScore) => console.log(`Game Over! Final score: ${finalScore}`),
    canvasWidth: canvasDimensions.width,
    canvasHeight: canvasDimensions.height,
    isMobile: true // Pass flag to adapt game logic for mobile
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
    
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  // Handle resize for fullscreen mode (now always use real window size)
  useEffect(() => {
    const updateCanvasDimensions = () => {
      if (canvasRef.current) {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight - 100;
        // Update canvas dimensions
        canvasRef.current.width = newWidth;
        canvasRef.current.height = newHeight;
        // Update state to trigger game logic updates
        setCanvasDimensions({
          width: newWidth,
          height: newHeight
        });
      }
    };

    // Update dimensions immediately when fullscreen changes
    updateCanvasDimensions();

    // Also listen for resize events
    window.addEventListener('resize', updateCanvasDimensions);
    window.addEventListener('orientationchange', updateCanvasDimensions);

    return () => {
      window.removeEventListener('resize', updateCanvasDimensions);
      window.removeEventListener('orientationchange', updateCanvasDimensions);
    };
  }, [isFullscreen]);

  // Drawing function for the game
  useEffect(() => {
    if (!assetsLoaded || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions based on fullscreen state
    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;
    
    // Game render function - separate from game logic
    const renderGame = () => {
      const gameState = getGameState();
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw sky background
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.85);
      skyGradient.addColorStop(0, '#87CEEB'); // Sky blue at top
      skyGradient.addColorStop(1, '#E0F7FF'); // Lighter blue near horizon
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some clouds (scale based on canvas size)
      const cloudScale = canvas.width / 600;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      // Cloud 1
      ctx.beginPath();
      ctx.arc(100 * cloudScale + (gameState.bug.x % canvas.width) * 0.1, 
              30 * cloudScale, 
              15 * cloudScale, 0, Math.PI * 2);
      ctx.arc(120 * cloudScale + (gameState.bug.x % canvas.width) * 0.1, 
              30 * cloudScale, 
              12 * cloudScale, 0, Math.PI * 2);
      ctx.arc(140 * cloudScale + (gameState.bug.x % canvas.width) * 0.1, 
              30 * cloudScale, 
              15 * cloudScale, 0, Math.PI * 2);
      ctx.fill();
      
      // Cloud 2
      ctx.beginPath();
      ctx.arc(canvas.width * 0.7 + (gameState.bug.x % canvas.width) * 0.05, 
              20 * cloudScale, 
              10 * cloudScale, 0, Math.PI * 2);
      ctx.arc(canvas.width * 0.7 + 20 * cloudScale + (gameState.bug.x % canvas.width) * 0.05, 
              20 * cloudScale, 
              12 * cloudScale, 0, Math.PI * 2);
      ctx.arc(canvas.width * 0.7 + 40 * cloudScale + (gameState.bug.x % canvas.width) * 0.05, 
              20 * cloudScale, 
              10 * cloudScale, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw grassy terrain - use the same groundY from game state
      const groundY = gameState.groundY; // This is directly from game logic
      const grassGradient = ctx.createLinearGradient(0, groundY, 0, canvas.height);
      grassGradient.addColorStop(0, '#7CFC00'); // Bright grass green at top
      grassGradient.addColorStop(1, '#228B22'); // Forest green at bottom
      ctx.fillStyle = grassGradient;
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
      
      // Draw grass blades
      ctx.strokeStyle = '#32CD32'; // Lime green
      ctx.lineWidth = 1 * cloudScale;
      
      // Draw some individual grass blades
      for (let i = 0; i < canvas.width; i += 10 * cloudScale) {
        const height = (3 + Math.random() * 5) * cloudScale; // Varying heights
        const bend = Math.sin((i + gameState.bug.x * 0.5) * 0.05) * 2 * cloudScale; // Gentle movement
        
        ctx.beginPath();
        ctx.moveTo(i, groundY);
        ctx.lineTo(i + bend, groundY - height);
        ctx.stroke();
      }
      
      // Draw bug as a square with "404" text
      ctx.fillStyle = 'black';
      const bugWidth = gameState.bug.width;
      const bugHeight = gameState.bug.height;
      
      // Draw bug at its actual position from game state
      ctx.fillRect(gameState.bug.x, gameState.bug.y, bugWidth, bugHeight);
      
      ctx.fillStyle = 'white';
      ctx.font = `${10 * cloudScale}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('404', gameState.bug.x + bugWidth/2, gameState.bug.y + bugHeight/2);
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
      
      // Draw UI elements
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.font = `bold ${15 * cloudScale}px monospace`;
      ctx.strokeText(`Score: ${gameState.score}`, 20, 25);
      ctx.fillText(`Score: ${gameState.score}`, 20, 25);
      
      // Draw game over message
      if (gameState.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = `${24 * cloudScale}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20 * cloudScale);
        
        ctx.font = `${16 * cloudScale}px monospace`;
        ctx.fillText(`Final Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 20 * cloudScale);
        ctx.fillText('Tap to restart', canvas.width / 2, canvas.height / 2 + 50 * cloudScale);
        ctx.textAlign = 'left';
      }
      
      // Continue animation loop
      if (gameState.isRunning || gameState.gameOver) {
        requestAnimationFrame(renderGame);
      }
    };
    
    // Start the rendering loop
    renderGame();
    
  }, [assetsLoaded, getGameState, isRunning, score, gameOver, canvasDimensions]);

  // Handle tap to jump or restart
  const handleCanvasTap = () => {
    if (gameOver) {
      restartGame();
    } else if (isRunning) {
      handleJump();
    }
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-[9999] bg-black' : 'relative'} flex flex-col items-center justify-center`}>
      {!assetsLoaded ? (
        <div className="text-white text-xl">
          {loadingMessage}
        </div>
      ) : (
        <>
          <canvas 
            ref={canvasRef} 
            className="rounded-lg shadow-lg bg-blue-100" 
            onClick={handleCanvasTap}
          />
          
          <div className={`mt-2 flex justify-between w-full ${isFullscreen ? 'px-4' : ''}`}>
            <button 
              onClick={toggleFullscreen} 
              className="px-3 py-1 bg-white bg-opacity-70 text-black text-sm font-bold rounded"
            >
              {isFullscreen ? '🔳 Exit Fullscreen' : '🔍 Fullscreen'}
            </button>
            
            {isFullscreen && (
              <button 
                onClick={onClose} 
                className="px-3 py-1 bg-white bg-opacity-70 text-black text-sm font-bold rounded"
              >
                ✕ Close
              </button>
            )}
          </div>
          
          {!isFullscreen && (
            <div className="mt-1 text-xs text-center opacity-70">
              Tap to jump!
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MobileGameOverlay;