import React, { useEffect, useRef, useState } from 'react';

const GameOverlay = ({ onClose }) => {
  const canvasRef = useRef(null);
  const dogImageRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  
  // Match player hitbox to sprite dimensions
  const playerRef = useRef({
    x: 50,
    y: 205, // Adjusted y position to account for larger size
    width: 72,  // Increased size by 50%
    height: 72, // Increased size by 50%
    vy: 0,
    gravity: 1.5,
    jumpForce: -20,
    isJumping: false
  });
  
  const bugRef = useRef({
    x: 600,
    y: 240,
    width: 25,  // Slightly smaller bug
    height: 25, // Slightly smaller bug
    speed: 3.5  // Slightly faster speed (was 3)
  });
  
  const [isRunning, setIsRunning] = useState(true);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading assets...");
  const [dogSpeedMultiplier, setDogSpeedMultiplier] = useState(1);
  const [dogMoveTimer, setDogMoveTimer] = useState(null);
  const [consecutiveMoves, setConsecutiveMoves] = useState(0);
  const [debugMode, setDebugMode] = useState(false); // For troubleshooting

  // Preload assets
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
    
    // Debug key
    const handleDebugToggle = (e) => {
      if (e.key === 'd') {
        setDebugMode(prev => !prev);
        console.log("Debug mode:", !debugMode);
      }
    };
    
    window.addEventListener('keydown', handleDebugToggle);
    
    return () => {
      clearTimeout(loadingTimeout);
      window.removeEventListener('keydown', handleDebugToggle);
    };
  }, []);

  // Game logic
  useEffect(() => {
    if (!assetsLoaded) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 300;
    
    const gameLoop = (timestamp) => {
      if (!isRunning) return;
      
      // Calculate delta time to make movement framerate-independent
      const deltaTime = timestamp - (lastTimeRef.current || timestamp);
      lastTimeRef.current = timestamp;
      
      // Clear the canvas first
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update game state
      updateGame(deltaTime / 16.67); // Normalize to ~60fps
      
      // Draw everything
      drawGame(ctx);
      
      // Continue loop
      animationRef.current = requestAnimationFrame(gameLoop);
    };
    
    const resetBug = () => {
      const bug = bugRef.current;
      bug.x = canvas.width;
      if (!gameOver) {
        setScore(prevScore => prevScore + 1);
      }
    };
    
    const updateGame = (deltaMultiplier) => {
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
      bug.x -= bug.speed * deltaMultiplier;
      
      // Reset bug when off-screen
      if (bug.x + bug.width < 0) {
        resetBug();
      }
      
      // Collision detection with more accurate hitbox
      checkCollision();
    };
    
    const checkCollision = () => {
      const player = playerRef.current;
      const bug = bugRef.current;
      
      // Use smaller hitbox for more precise collision detection
      // Adding offset to make collision feel more natural
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
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
    
    const drawGame = (ctx) => {
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
      ctx.arc(100 + (bugRef.current.x % 600) * 0.1, 60, 25, 0, Math.PI * 2);
      ctx.arc(130 + (bugRef.current.x % 600) * 0.1, 60, 20, 0, Math.PI * 2);
      ctx.arc(160 + (bugRef.current.x % 600) * 0.1, 60, 25, 0, Math.PI * 2);
      ctx.fill();
      // Cloud 2
      ctx.beginPath();
      ctx.arc(400 + (bugRef.current.x % 600) * 0.05, 40, 20, 0, Math.PI * 2);
      ctx.arc(430 + (bugRef.current.x % 600) * 0.05, 40, 25, 0, Math.PI * 2);
      ctx.arc(460 + (bugRef.current.x % 600) * 0.05, 40, 20, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw grassy terrain (field)
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
        const bend = Math.sin((i + bugRef.current.x * 0.5) * 0.05) * 2; // Gentle movement
        
        ctx.beginPath();
        ctx.moveTo(i, 260);
        ctx.lineTo(i + bend, 260 - height);
        ctx.stroke();
      }
      
      // Add a few flowers
      for (let i = 0; i < canvas.width; i += 80) {
        if (Math.random() > 0.6) {
          const x = i + Math.random() * 40;
          ctx.fillStyle = Math.random() > 0.5 ? '#FFFF00' : '#FFFFFF'; // Yellow or white flowers
          ctx.beginPath();
          ctx.arc(x, 255, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Draw bug as a square with "404" text
      const bug = bugRef.current;
      ctx.fillStyle = 'black';
      ctx.fillRect(bug.x, bug.y, bug.width, bug.height);
      ctx.fillStyle = 'white';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('404', bug.x + 15, bug.y + 15);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      
      // Draw player
      const player = playerRef.current;
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
        
        // Draw eyes and mouth to make a simple dog face
        ctx.fillStyle = 'black';
        // Eyes
        ctx.beginPath();
        ctx.arc(player.x + 15, player.y + 20, 3, 0, Math.PI * 2);
        ctx.arc(player.x + 30, player.y + 20, 3, 0, Math.PI * 2);
        ctx.fill();
        // Mouth
        ctx.beginPath();
        ctx.arc(player.x + 24, player.y + 30, 8, 0, Math.PI);
        ctx.stroke();
      }
      
      // Debug hitboxes
      if (debugMode) {
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
        ctx.strokeRect(bug.x, bug.y, bug.width, bug.height);
      }
      
      // Draw UI - speed boost indicator
      if (dogSpeedMultiplier > 1) {
        ctx.fillStyle = 'rgba(255, 215, 0, 0.7)'; // Golden glow
        ctx.font = '16px monospace';
        let speedText = dogSpeedMultiplier === 1.5 ? "Speed Boost!" : "SUPER SPEED!";
        ctx.fillText(speedText, player.x + 10, player.y - 10);
      }
      
      // Draw consecutive moves counter for player feedback
      if (consecutiveMoves > 0) {
        ctx.fillStyle = 'white';
        ctx.font = '12px monospace';
        ctx.fillText(`Combo: ${consecutiveMoves}`, 20, 50);
      }
      
      // Draw score - always on top
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.font = 'bold 20px monospace';
      // Stroke for visibility against any background
      ctx.strokeText(`Score: ${score}`, 20, 30);
      // Fill on top of stroke
      ctx.fillText(`Score: ${score}`, 20, 30);
      
      // Draw game over message
      if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = '32px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.font = '16px monospace';
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText('Press ENTER to restart', canvas.width / 2, canvas.height / 2 + 50);
        ctx.textAlign = 'left';
      }
    };
    
    const handleKeyDown = (e) => {
      const player = playerRef.current;
      
      if ((e.key === ' ' || e.key === 'ArrowUp') && !player.isJumping && !gameOver) {
        player.vy = player.jumpForce;
        player.isJumping = true;
      }
      
      if (e.key === 'ArrowRight' && !gameOver) {
        player.x += 15; // Faster movement (was 10)
      }
      
      if (e.key === 'Escape') {
        onClose();
      }
      
      if (e.key === 'Enter' && gameOver) {
        // Reset game
        setGameOver(false);
        setScore(0);
        
        // Reset player
        player.y = 205; // Updated ground position for larger dog
        player.vy = 0;
        player.isJumping = false;
        player.x = 50; // Also reset x position
        
        // Reset bug
        bugRef.current.x = canvas.width;
        
        // Start game again
        setIsRunning(true);
        lastTimeRef.current = 0;
        window.addEventListener('keydown', handleKeyDown);
        animationRef.current = requestAnimationFrame(gameLoop);
      }
    };
    
    // Add event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Start game loop
    animationRef.current = requestAnimationFrame(gameLoop);
    
    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, onClose, gameOver, score, assetsLoaded, debugMode]);

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