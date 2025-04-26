import React, { useState, useEffect, useRef, useCallback } from 'react';
import EchoPet from './common/EchoPet';
import EducationSection from './resume/EducationSection';
import SkillsSection from './resume/SkillsSection';
import ProjectsSection from './resume/ProjectsSection';
import ExperienceSection from './resume/ExperienceSection';

const SECTIONS = [
  {
    key: 'avni',
    bg: 'bg-[#2d4654]',
    text: 'text-[#f5f5f5]',
    z: 'z-[50]',
    title: 'Avni Salhotra',
    subtitle: 'Software Engineer',
    content: null,
    isAvni: true,
  },
  {
    key: 'education',
    bg: 'bg-[#48617a]',
    text: 'text-[#f5f5f5]',
    z: 'z-[40]',
    title: 'Education',
    subtitle: null,
    content: <EducationSection colors={{ lightText: '#ffffff' }} />,
  },
  {
    key: 'skills',
    bg: 'bg-[#c1666b]',
    text: 'text-[#f5f5f5]',
    z: 'z-[30]',
    title: 'Skills',
    subtitle: null,
    content: <SkillsSection colors={{ lightText: '#ffffff' }} />,
  },
  {
    key: 'projects',
    bg: 'bg-[#dbc49f]',
    text: 'text-[#2d4654]',
    z: 'z-[20]',
    title: 'Projects',
    subtitle: null,
    content: (
      <ProjectsSection
        projectIndex={0}
        setProjectIndex={() => {}}
        colors={{
          text: '#2d4654',
          lightText: '#2d4654',
          layer3: '#c1666b',
          layer4: '#94b9af',
          center: '#2d4654'
        }}
        showNavigation={false}
        showAllProjects={true}
      />
    ),
  },
  {
    key: 'experience',
    bg: 'bg-[#94b9af]',
    text: 'text-[#2d4654]',
    z: 'z-[10]',
    title: 'Experience',
    subtitle: null,
    content: (
      <ExperienceSection
        experienceIndex={0}
        setExperienceIndex={() => {}}
        colors={{
          text: '#2d4654',
          lightText: '#2d4654'
        }}
        showNavigation={false}
        showAllExperiences={true}
      />
    ),
  },
];

// Easing functions for more natural motion
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
const easeOutExpo = t => (t === 1) ? 1 : 1 - Math.pow(2, -10 * t);

const StackedResumeMobile = () => {
  const [lastTapTime, setLastTapTime] = useState(0);
  const [viewState, setViewState] = useState('stacked');
  const [currentSlide, setCurrentSlide] = useState('avni');
  
  // Add state for project and experience indices
  const [projectIndex, setProjectIndex] = useState(0);
  const [experienceIndex, setExperienceIndex] = useState(0);
  
  // Animation states
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionType, setTransitionType] = useState('default');
  const [edgeIndicator, setEdgeIndicator] = useState(null); // 'left', 'right', or null
  
  // Refs for improved touch handling
  const touchStartX = useRef(null);
  const touchStartY = useRef(null); // For detecting vertical scrolling
  const touchStartTime = useRef(null);
  const rafId = useRef(null); // For requestAnimationFrame
  const swipeVelocity = useRef(0);
  const isPanning = useRef(false);
  const containerRef = useRef(null);
  
  // Constants
  const slideKeys = SECTIONS.map(s => s.key);
  const currentIndex = slideKeys.indexOf(currentSlide);
  const hasPrevSlide = currentIndex > 0;
  const hasNextSlide = currentIndex < slideKeys.length - 1;
  
  // Calculate container width for animations
  const getContainerWidth = () => {
    if (containerRef.current) {
      return containerRef.current.offsetWidth;
    }
    return window.innerWidth;
  };

  const handleEchoTap = () => {
    const now = Date.now();
    if (now - lastTapTime < 400) {
      console.log("Launch Game"); // replace with real setShowGame(true) hookup later
    }
    setLastTapTime(now);
  };

  // When a card is tapped in stacked mode, go to carousel and set currentSlide
  const handleCardTap = (sectionKey) => {
    setViewState('carousel');
    setCurrentSlide(sectionKey);
  };

  // Animate between slides with velocity-based physics
  const animateToSlide = useCallback((direction, velocity = 1) => {
    if (isAnimating) return;
    
    // Adjust animation speed based on velocity - faster flicks = faster animations
    const speedFactor = Math.min(Math.max(velocity, 0.5), 2);
    const baseAnimDuration = 350; // base duration in ms
    const animDuration = baseAnimDuration / speedFactor;
    
    if (direction === 'prev') {
      if (currentIndex === 0) {
        // Back to stacked view
        setViewState('stacked');
      } else {
        setIsAnimating(true);
        setTransitionType('slide-prev');
        setSwipeOffset(100);
        
        setTimeout(() => {
          setCurrentSlide(slideKeys[currentIndex - 1]);
          setSwipeOffset(0);
          setIsAnimating(false);
          setTransitionType('default');
          setEdgeIndicator(null);
        }, animDuration);
      }
    } else if (direction === 'next') {
      if (currentIndex < slideKeys.length - 1) {
        setIsAnimating(true);
        setTransitionType('slide-next');
        setSwipeOffset(-100);
        
        setTimeout(() => {
          setCurrentSlide(slideKeys[currentIndex + 1]);
          setSwipeOffset(0);
          setIsAnimating(false);
          setTransitionType('default');
          setEdgeIndicator(null);
        }, animDuration);
      }
    } else {
      // Reset position (cancelled swipe)
      setIsAnimating(true);
      setTransitionType('reset');
      
      setTimeout(() => {
        setSwipeOffset(0);
        setIsAnimating(false);
        setTransitionType('default');
        setEdgeIndicator(null);
      }, 200); // Shorter duration for reset
    }
  }, [currentIndex, isAnimating, slideKeys]);

  // Optimized touchmove handler with requestAnimationFrame for smoother updates
  const handlePanMove = useCallback((deltaX, deltaY) => {
    if (isAnimating || !isPanning.current) return;
    
    // Check if scrolling more vertically than horizontally
    if (Math.abs(deltaY) > Math.abs(deltaX) * 1.5) {
      // User is scrolling vertically, don't do horizontal pan
      return;
    }
    
    // Calculate percentage moved
    const containerWidth = getContainerWidth();
    const percentMove = (deltaX / containerWidth) * 100;
    
    // Apply non-linear resistance at edges for more natural feel
    let newOffset = percentMove;
    
    // Show edge indicator when approaching edges
    if (!hasPrevSlide && newOffset > 5) {
      setEdgeIndicator('left');
    } else if (!hasNextSlide && newOffset < -5) {
      setEdgeIndicator('right');
    } else {
      setEdgeIndicator(null);
    }
    
    // Apply resistance at edges
    if ((!hasPrevSlide && newOffset > 0) || (!hasNextSlide && newOffset < 0)) {
      // Progressive resistance - gets stronger as you pull further
      const resistanceFactor = 0.2 - (Math.abs(newOffset) * 0.001);
      newOffset = newOffset * Math.max(0.05, resistanceFactor);
    }
    
    // Update velocity for natural animation speed later
    const now = Date.now();
    const timeDelta = now - touchStartTime.current;
    if (timeDelta > 0) {
      const instantVelocity = Math.abs(deltaX) / timeDelta;
      swipeVelocity.current = instantVelocity;
    }
    
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(() => {
      setSwipeOffset(newOffset);
      rafId.current = null;
    });
  }, [isAnimating, hasPrevSlide, hasNextSlide]);

  // Keyboard handlers for swipe navigation
  useEffect(() => {
    if (viewState !== 'carousel') return;
    
    const handler = (e) => {
      if (e.key === 'ArrowLeft') {
        animateToSlide('prev');
      } else if (e.key === 'ArrowRight') {
        animateToSlide('next');
      }
    };
    
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [viewState, animateToSlide]);

  // Touch gesture handling with improved physics
  useEffect(() => {
    if (viewState !== 'carousel') return;
    
    const handleTouchStart = (e) => {
      if (isAnimating) return;
      
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
      swipeVelocity.current = 0;
      isPanning.current = true;
      
      // Disable transition during initial touch for immediate response
      setTransitionType('none');
    };
    
    const handleTouchMove = (e) => {
      if (touchStartX.current === null || isAnimating) return;
      
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = currentX - touchStartX.current;
      const deltaY = currentY - touchStartY.current;
      
      handlePanMove(deltaX, deltaY);
    };
    
    const handleTouchEnd = (e) => {
      if (touchStartX.current === null || isAnimating || !isPanning.current) return;
      
      isPanning.current = false;
      
      const finalX = e.changedTouches[0].clientX;
      const deltaX = finalX - touchStartX.current;
      const timeDelta = Date.now() - touchStartTime.current;
      
      // Adaptive thresholds based on screen size
      const containerWidth = getContainerWidth();
      const distanceThreshold = containerWidth * 0.2; // 20% of container width
      const minVelocityThreshold = 0.15; // pixels per ms for slow swipes
      const maxVelocityThreshold = 0.5; // pixels per ms for fast flicks
      
      // Calculate velocity for animation speed
      const velocity = Math.abs(deltaX) / Math.max(1, timeDelta);
      const normalizedVelocity = Math.min(velocity * 5, 2); // Scale velocity for animation
      
      // Determine if swipe was intentional
      // For small distances, require higher velocity
      const velocityThreshold = maxVelocityThreshold - 
        (Math.min(Math.abs(deltaX), distanceThreshold) / distanceThreshold) * 
        (maxVelocityThreshold - minVelocityThreshold);
        
      const isIntentionalSwipe = Math.abs(deltaX) > distanceThreshold || velocity > velocityThreshold;
      
      if (isIntentionalSwipe) {
        if (deltaX > 0 && (hasPrevSlide || currentIndex === 0)) {
          animateToSlide('prev', normalizedVelocity);
        } else if (deltaX < 0 && hasNextSlide) {
          animateToSlide('next', normalizedVelocity);
        } else {
          // Edge case, reset position
          animateToSlide('reset');
        }
      } else {
        // Not a significant swipe, reset position
        animateToSlide('reset');
      }
      
      // Reset touch state
      touchStartX.current = null;
      touchStartY.current = null;
      touchStartTime.current = null;
    };
    
    // Clean up any running animation frame
    const cleanupRaf = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
    
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      cleanupRaf();
    };
  }, [viewState, currentIndex, isAnimating, animateToSlide, handlePanMove, hasPrevSlide, hasNextSlide]);

  // Determine the correct transition style based on the action
  const getTransitionStyle = () => {
    if (transitionType === 'none') {
      return 'none';
    }
    
    if (transitionType === 'reset') {
      return 'transform 200ms cubic-bezier(0.2, 0.9, 0.3, 1)'; // Snappy retraction
    }
    
    if (transitionType === 'slide-prev' || transitionType === 'slide-next') {
      return 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1)'; // Snappier for page transitions
    }
    
    return 'transform 300ms cubic-bezier(0.2, 0.8, 0.25, 1)'; // Default
  };

  // (removed: sectionsWithDynamicContent mapping logic)

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-start bg-[#f5f0e6]">
      {/* Conditional layout */}
      {viewState === 'stacked' ? (
        <>
          {/* Stacked layout: cards stacked vertically, tap any to go to carousel */}
          {SECTIONS.map((section, idx) => (
            <div
              key={section.key}
              className={`w-full max-w-md h-28 p-4 ${idx === 0 ? '' : '-mt-10'} rounded-lg shadow-lg ${section.bg} ${section.text} relative ${section.z} flex flex-col items-center`}
              onClick={() => handleCardTap(section.key)}
              style={{ 
                cursor: 'pointer',
                transform: 'translateZ(0)', // Hardware acceleration
              }}
            >
              <div className={`flex flex-col items-center h-full w-full ${section.isAvni ? 'pt-4 mb-1' : 'pt-10'}`}>
                <h1 className={`text-xl tracking-wider opacity-90 ${section.isAvni ? 'mb-2' : ''} text-center`} style={{ fontFamily: 'Menlo, Monaco, monospace' }}>
                  {section.title}
                </h1>
                {section.subtitle && (
                  <p className="text-lg opacity-80 text-center">{section.subtitle}</p>
                )}
              </div>
              {/* EchoPet only on Avni card */}
              {section.isAvni && (
                <div
                  className="absolute bottom-2 right-2 w-20 h-20"
                  onClick={e => { e.stopPropagation(); handleEchoTap(); }}
                >
                  <EchoPet />
                </div>
              )}
            </div>
          ))}
        </>
      ) : (
        // Carousel view with optimized swipe mechanics
        <div 
          ref={containerRef}
          className="w-full max-w-md flex-1 relative" 
          style={{ minHeight: '70vh' }}
          aria-live="polite" 
          role="region" 
          aria-label="Resume section viewer"
        >
          {/* Edge indicators */}
          {edgeIndicator === 'left' && (
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white/30 to-transparent z-10 pointer-events-none" />
          )}
          {edgeIndicator === 'right' && (
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white/30 to-transparent z-10 pointer-events-none" />
          )}
          
          {/* Current card with hardware acceleration */}
          <div 
            className={`w-full max-w-md h-[85vh] min-h-[85vh] p-6 rounded-lg shadow-lg ${SECTIONS[currentIndex].bg} ${SECTIONS[currentIndex].text} flex flex-col items-center justify-center`}
            style={{
              transform: `translateX(${swipeOffset}%) translateZ(0)`,
              transition: getTransitionStyle(),
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
            role="tabpanel"
            aria-label={SECTIONS[currentIndex].title}
          >
            {/* Use the section content directly */}
            {SECTIONS[currentIndex].content ? (
              <div className="w-full h-full overflow-y-auto">
                {SECTIONS[currentIndex].content}
              </div>
            ) : (
              <div className={`flex flex-col items-center h-full w-full ${SECTIONS[currentIndex].isAvni ? 'pt-4 mb-1' : 'pt-10'}`}>
                <h1 className={`text-xl tracking-wider opacity-90 ${SECTIONS[currentIndex].isAvni ? 'mb-2' : ''} text-center`} style={{ fontFamily: 'Menlo, Monaco, monospace' }}>
                  {SECTIONS[currentIndex].title}
                </h1>
                {SECTIONS[currentIndex].subtitle && (
                  <p className="text-lg opacity-80 text-center">{SECTIONS[currentIndex].subtitle}</p>
                )}
              </div>
            )}
            
            {/* EchoPet only on Avni card in stacked view */}
            {SECTIONS[currentIndex].isAvni && viewState === 'stacked' && (
              <div
                className="absolute bottom-2 right-2 w-20 h-20"
                onClick={handleEchoTap}
              >
                <EchoPet />
              </div>
            )}
          </div>
          
          {/* Interactive navigation dots */}
          <div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center space-x-3 px-5 py-2 rounded-full bg-white/20 backdrop-blur-md shadow-md shadow-black/10"
            role="tablist"
            aria-label="Resume sections"
          >
            {SECTIONS.map((section, idx) => (
              <button
                key={`dot-${section.key}`}
                className={`h-2 rounded-full transition-all duration-300 ease-out ${
                  idx === currentIndex 
                    ? 'bg-white w-4' 
                    : 'bg-white bg-opacity-40 hover:bg-opacity-60'
                }`}
                onClick={() => {
                  if (idx !== currentIndex && !isAnimating) {
                    setIsAnimating(true);
                    setTransitionType(idx < currentIndex ? 'slide-prev' : 'slide-next');
                    setSwipeOffset(idx < currentIndex ? 100 : -100);
                    
                    setTimeout(() => {
                      setCurrentSlide(slideKeys[idx]);
                      setSwipeOffset(0);
                      setIsAnimating(false);
                      setTransitionType('default');
                    }, 350);
                  }
                }}
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Go to ${section.title} section`}
                tabIndex={idx === currentIndex ? 0 : -1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StackedResumeMobile;