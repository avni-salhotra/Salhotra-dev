// src/hooks/useGameLogic.js
import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage game logic for the Echo runner game
 * 
 * @param {Object} options - Configuration options
 * @param {Function} options.onGameOver - Callback when game ends
 * @param {number} options.canvasWidth - Width of the game canvas
 * @param {number} options.canvasHeight - Height of the game canvas
 * @returns {Object} Game state and control methods
 */
const useGameLogic = ({ 
  onGameOver,
  canvasWidth = 600,
  canvasHeight = 300
}) => {
  // Game state
  const [isRunning, setIsRunning] = useState(true);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [dogSpeedMultiplier, setDogSpeedMultiplier] = useState(1);
  const [consecutiveMoves, setConsecutiveMoves] = useState(0);
  
  // Animation references
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  
  // Player entity
  const playerRef = useRef({
    x: 50,
    y: 205,
    width: 72,
    height: 72,
    vy: 0,
    gravity: 1.5,
    jumpForce: -20,
    isJumping: false
  });
  
  // Bug/obstacle entity
  const bugRef = useRef({
    x: canvasWidth,
    y: 240,
    width: 25,
    height: 25,
    speed: 3.5
  });
  
  // Reset the bug position and increment score
  const resetBug = useCallback(() => {
    const bug = bugRef.current;
    bug.x = canvasWidth;
    if (!gameOver) {
      setScore(prevScore => prevScore + 1);
    }
  }, [gameOver, canvasWidth]);
  
  // Check for collision between player and bug
  const checkCollision = useCallback(() => {
    const player = playerRef.current;
    const bug = bugRef.current;
    
    // Use smaller hitbox for more precise collision detection
    const playerHitbox = {
      x: player.x + 10,
      y: player.y + 5,
      width: player.width - 20,
      height: player.height - 10
    };
    
    if (
      playerHitbox.x < bug.x + bug.width &&
      playerHitbox.x + playerHitbox.width > bug.x &&
      playerHitbox.y < bug.y + bug.height &&
      playerHitbox.y + playerHitbox.height > bug.y
    ) {
      setIsRunning(false);
      setGameOver(true);
      if (onGameOver) onGameOver(score);
    }
  }, [onGameOver, score]);
  
  // Update game state based on delta time
  const updateGame = useCallback((deltaMultiplier) => {
    const player = playerRef.current;
    const bug = bugRef.current;
    
    // Update player position
    player.vy += player.gravity * deltaMultiplier;
    player.y += player.vy * deltaMultiplier;
    
    // Ground collision - adjusted for larger dog
    if (player.y > 205) {
      player.y = 205;
      player.vy = 0;
      player.isJumping = false;
    }
    
    // Update bug position
    bug.x -= bug.speed * dogSpeedMultiplier * deltaMultiplier;
    
    // Reset bug when off-screen
    if (bug.x + bug.width < 0) {
      resetBug();
    }
    
    // Collision detection
    checkCollision();
  }, [resetBug, checkCollision, dogSpeedMultiplier]);
  
  // Game loop
  const gameLoop = useCallback((timestamp) => {
    if (!isRunning) return;
    
    // Calculate delta time to make movement framerate-independent
    const deltaTime = timestamp - (lastTimeRef.current || timestamp);
    lastTimeRef.current = timestamp;
    
    // Update game state
    updateGame(deltaTime / 16.67); // Normalize to ~60fps
    
    // Continue loop
    animationRef.current = requestAnimationFrame(gameLoop);
  }, [isRunning, updateGame]);
  
  // Handle keyboard input
  const handleKeyDown = useCallback((e) => {
    const player = playerRef.current;
    
    if ((e.key === ' ' || e.key === 'ArrowUp') && !player.isJumping && !gameOver) {
      player.vy = player.jumpForce;
      player.isJumping = true;
    }
    
    if (e.key === 'ArrowRight' && !gameOver) {
      player.x += 15;
      
      // Speed boost logic based on consecutive moves
      setConsecutiveMoves(prev => {
        const newCount = prev + 1;
        
        // Speed boost thresholds
        if (newCount > 20) {
          setDogSpeedMultiplier(2.0); // Super speed
        } else if (newCount > 10) {
          setDogSpeedMultiplier(1.5); // Regular boost
        }
        
        return newCount;
      });
      
      // Reset combo after a delay if no movement
      setTimeout(() => {
        setConsecutiveMoves(0);
        setDogSpeedMultiplier(1.0);
      }, 1000);
    }
    
    if (e.key === 'Escape') {
      // This would typically be handled by the component that renders the game
    }
    
    if (e.key === 'Enter' && gameOver) {
      restartGame();
    }
  }, [gameOver]);
  
  // Reset game state for restart
  const restartGame = useCallback(() => {
    // Reset game state
    setGameOver(false);
    setScore(0);
    setDogSpeedMultiplier(1);
    setConsecutiveMoves(0);
    
    // Reset player
    const player = playerRef.current;
    player.y = 205;
    player.vy = 0;
    player.isJumping = false;
    player.x = 50;
    
    // Reset bug
    bugRef.current.x = canvasWidth;
    
    // Start game again
    setIsRunning(true);
    lastTimeRef.current = 0;
  }, [canvasWidth]);
  
  // Get current game state for rendering
  const getGameState = useCallback(() => {
    return {
      player: { ...playerRef.current },
      bug: { ...bugRef.current },
      score,
      gameOver,
      isRunning,
      debugMode,
      dogSpeedMultiplier,
      consecutiveMoves
    };
  }, [score, gameOver, isRunning, debugMode, dogSpeedMultiplier, consecutiveMoves]);
  
  // Start/stop game loop based on isRunning state
  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(gameLoop);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, gameLoop]);
  
  return {
    // Game state
    getGameState,
    score,
    gameOver,
    isRunning,
    debugMode,
    dogSpeedMultiplier,
    consecutiveMoves,
    
    // Control methods
    restartGame,
    handleKeyDown,
    setIsRunning,
    setDebugMode
  };
};

export default useGameLogic;