// src/hooks/useGameLogic.js
import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage game logic for the Echo runner game
 * 
 * @param {Object} options - Configuration options
 * @param {Function} options.onGameOver - Callback when game ends
 * @param {number} options.canvasWidth - Width of the game canvas
 * @param {number} options.canvasHeight - Height of the game canvas
 * @param {boolean} options.isMobile - Whether the game is running on mobile
 * @returns {Object} Game state and control methods
 */
const useGameLogic = ({ 
  onGameOver,
  canvasWidth = 600,
  canvasHeight = 300,
  isMobile = false
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
  
  // Calculate ground level - this is the core of positioning
  const groundLevelPercent = 0.85; // 85% down from the top
  
  // Calculate the actual ground Y position
  const calculateGroundY = (height) => {
    return Math.floor(height * groundLevelPercent);
  };
  
  // Player height adjustment for different screen sizes
  const playerHeightAdjustment = isMobile ? 60 : 65;
  
  // Calculate initial ground level
  const [groundLevel, setGroundLevel] = useState(
    calculateGroundY(canvasHeight) - playerHeightAdjustment
  );
  
  // Recalculate ground level whenever canvas dimensions change
  useEffect(() => {
    const newGroundLevel = calculateGroundY(canvasHeight) - playerHeightAdjustment;
    setGroundLevel(newGroundLevel);
    
    // When dimensions change, we need to update player and bug positions
    if (playerRef.current) {
      playerRef.current.y = newGroundLevel;
    }
    
    if (bugRef.current) {
      // Position bug at ground level
      bugRef.current.y = calculateGroundY(canvasHeight) - bugRef.current.height;
    }
  }, [canvasWidth, canvasHeight, playerHeightAdjustment]);

  // Adjust player size based on screen
  const playerSize = isMobile ? Math.min(60, canvasWidth / 8) : 72;
  
  // Bug size consistent with player
  const bugSize = isMobile ? Math.min(25, canvasWidth / 20) : 25;
  
  // Initialize player reference
  const playerRef = useRef({
    x: isMobile ? canvasWidth / 6 : 50,
    y: groundLevel, 
    width: playerSize,
    height: playerSize,
    vy: 0,
    gravity: isMobile ? 0.7 : 1.5,
    jumpForce: isMobile ? -12 : -20,
    isJumping: false
  });
  
  // Initialize bug/obstacle reference at ground level
  const bugRef = useRef({
    x: canvasWidth,
    y: calculateGroundY(canvasHeight) - bugSize, // Position at ground level
    width: bugSize,
    height: bugSize,
    speed: isMobile ? 3 : 3.5 // Slightly easier on mobile
  });
  
  // Handle resize or orientation change
  useEffect(() => {
    const handleResizeOrOrientation = () => {
      const newCanvasWidth = isMobile ? window.innerWidth : canvasWidth;
      const newCanvasHeight = isMobile ? window.innerHeight - 100 : canvasHeight;

      // Update ground level based on new canvas height
      const newGroundLevel = calculateGroundY(newCanvasHeight) - playerHeightAdjustment;
      setGroundLevel(newGroundLevel);

      const player = playerRef.current;
      const bug = bugRef.current;

      // Adjust player based on how high they are off the ground originally
      const relativePlayerOffset = player.y - groundLevel;
      player.y = newGroundLevel + relativePlayerOffset;

      // If falling too low, snap to ground
      if (player.y > newGroundLevel) {
        player.y = newGroundLevel;
        player.vy = 0;
        player.isJumping = false;
      }

      // Reset bug to run near new ground level
      bug.y = calculateGroundY(newCanvasHeight) - bug.height;
    };

    // Listen to resize and orientation change
    window.addEventListener('resize', handleResizeOrOrientation);
    window.addEventListener('orientationchange', handleResizeOrOrientation);

    return () => {
      window.removeEventListener('resize', handleResizeOrOrientation);
      window.removeEventListener('orientationchange', handleResizeOrOrientation);
    };
  }, [canvasWidth, canvasHeight, isMobile, playerHeightAdjustment]);
  
  // Reset the bug position and increment score
  const resetBug = useCallback(() => {
    const bug = bugRef.current;
    bug.x = canvasWidth;
    // Ensure bug's y position is at ground level
    bug.y = calculateGroundY(canvasHeight) - bug.height;
    
    if (!gameOver) {
      setScore(prevScore => prevScore + 1);
    }
  }, [gameOver, canvasWidth, canvasHeight]);
  
  // Check for collision between player and bug
  const checkCollision = useCallback(() => {
    const player = playerRef.current;
    const bug = bugRef.current;
    
    // Use smaller hitbox for more precise collision detection
    const playerHitbox = {
      x: player.x + player.width * 0.15,
      y: player.y + player.height * 0.1,
      width: player.width * 0.7,
      height: player.height * 0.8
    };
    
    if (
      playerHitbox.x < bug.x + bug.width &&
      playerHitbox.x + playerHitbox.width > bug.x &&
      playerHitbox.y < bug.y + bug.height &&
      playerHitbox.y + playerHitbox.height > bug.y
    ) {
      if (debugMode) {
        console.log("Collision detected!");
        console.log("Player:", playerHitbox);
        console.log("Bug:", bug);
      }
      
      setIsRunning(false);
      setGameOver(true);
      if (onGameOver) onGameOver(score);
    }
  }, [onGameOver, score, debugMode]);
  
  // Update game state based on delta time
  const updateGame = useCallback((deltaMultiplier) => {
    const player = playerRef.current;
    const bug = bugRef.current;
    
    // Update player position
    player.vy += player.gravity * deltaMultiplier;
    player.y += player.vy * deltaMultiplier;
    
    // Ground collision - keep player on ground
    if (player.y > groundLevel) {
      player.y = groundLevel;
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
    
    // In mobile mode, auto-advance to simulate continuous running
    if (isMobile && !gameOver) {
      // No need to manually press right to move forward
      player.x += 0.5 * deltaMultiplier; // Slight forward momentum
      
      // Keep player from going too far right
      const maxX = canvasWidth / 3;
      if (player.x > maxX) {
        player.x = maxX;
      }
    }
  }, [resetBug, checkCollision, dogSpeedMultiplier, gameOver, groundLevel, isMobile, canvasWidth]);
  
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

  // Jump method (especially for mobile)
  const handleJump = useCallback(() => {
    const player = playerRef.current;
    if (!player.isJumping && !gameOver) {
      player.vy = player.jumpForce;
      player.isJumping = true;
    }
  }, [gameOver]);
  
  // Handle keyboard input
  const handleKeyDown = useCallback((e) => {
    const player = playerRef.current;
    
    if ((e.key === ' ' || e.key === 'ArrowUp') && !player.isJumping && !gameOver) {
      handleJump();
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
  }, [gameOver, handleJump]);
  
  // Reset game state for restart
  const restartGame = useCallback(() => {
    // Reset game state
    setGameOver(false);
    setScore(0);
    setDogSpeedMultiplier(1);
    setConsecutiveMoves(0);
    
    // Reset player
    const player = playerRef.current;
    player.y = groundLevel;
    player.vy = 0;
    player.isJumping = false;
    player.x = isMobile ? canvasWidth / 6 : 50;
    
    // Reset bug with consistent positioning
    const bug = bugRef.current;
    bug.x = canvasWidth;
    bug.y = calculateGroundY(canvasHeight) - bug.height;
    
    // Start game again
    setIsRunning(true);
    lastTimeRef.current = 0;
  }, [canvasWidth, canvasHeight, groundLevel, isMobile]);
  
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
      consecutiveMoves,
      groundLevel,
      groundY: calculateGroundY(canvasHeight)
    };
  }, [score, gameOver, isRunning, debugMode, dogSpeedMultiplier, consecutiveMoves, groundLevel, canvasHeight]);
  
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
    handleJump,
    setIsRunning,
    setDebugMode
  };
};

export default useGameLogic;