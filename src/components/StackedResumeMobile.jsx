import React, { useState, useEffect, useRef } from 'react';
import EchoPet from './common/EchoPet';
import EducationSection from './resume/EducationSection';
import SkillsSection from './resume/SkillsSection';

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
    content: null,
  },
  {
    key: 'experience',
    bg: 'bg-[#94b9af]',
    text: 'text-[#2d4654]',
    z: 'z-[10]',
    title: 'Experience',
    subtitle: null,
    content: null,
  },
];

const StackedResumeMobile = () => {
  const [lastTapTime, setLastTapTime] = useState(0);
  const [viewState, setViewState] = useState('stacked');
  const [currentSlide, setCurrentSlide] = useState('avni');
  
  // New state for swipe animation
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  // Carousel navigation helpers
  const slideKeys = SECTIONS.map(s => s.key);
  const currentIndex = slideKeys.indexOf(currentSlide);

  const goToPrevSlide = () => {
    if (isAnimating) return;
    
    if (currentIndex === 0) {
      // If on first card ('avni'), swiping right returns to stacked
      setViewState('stacked');
    } else if (currentIndex > 0) {
      setIsAnimating(true);
      // Start animation
      setSwipeOffset(100);
      
      // After animation completes, update the current slide
      setTimeout(() => {
        setCurrentSlide(slideKeys[currentIndex - 1]);
        setSwipeOffset(0);
        setIsAnimating(false);
      }, 300);
    }
  };
  
  const goToNextSlide = () => {
    if (isAnimating) return;
    
    if (currentIndex < slideKeys.length - 1) {
      setIsAnimating(true);
      // Start animation
      setSwipeOffset(-100);
      
      // After animation completes, update the current slide
      setTimeout(() => {
        setCurrentSlide(slideKeys[currentIndex + 1]);
        setSwipeOffset(0);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Keyboard handlers for placeholder swipe
  useEffect(() => {
    if (viewState !== 'carousel') return;
    const handler = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [viewState, currentSlide, isAnimating]);

  // Touch swipe gesture support for carousel view
  const touchStartX = useRef(null);
  const touchStartTime = useRef(null);
  
  useEffect(() => {
    if (viewState !== 'carousel') return;

    const handleTouchStart = (e) => {
      if (isAnimating) return;
      touchStartX.current = e.touches[0].clientX;
      touchStartTime.current = Date.now();
    };
    
    const handleTouchMove = (e) => {
      if (touchStartX.current === null || isAnimating) return;
      
      // Calculate how far finger has moved
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - touchStartX.current;
      
      // Convert to percentage of screen width
      const containerWidth = window.innerWidth;
      const percentMove = (deltaX / containerWidth) * 100;
      
      // Apply limits and resistance at edges
      let newOffset = percentMove;
      if ((currentIndex === 0 && newOffset > 0) || 
          (currentIndex === slideKeys.length - 1 && newOffset < 0)) {
        newOffset = newOffset * 0.2; // Add stronger resistance at edges
      }
      
      setSwipeOffset(newOffset);
    };

    const handleTouchEnd = (e) => {
      if (touchStartX.current === null || isAnimating) return;
      
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const timeDelta = Date.now() - touchStartTime.current;
      
      // Threshold for swipe - either distance or velocity
      const distanceThreshold = window.innerWidth * 0.2; // 20% of screen width
      const velocityThreshold = 0.2; // pixels per ms
      
      const velocity = Math.abs(deltaX) / timeDelta;
      const isSwipe = Math.abs(deltaX) > distanceThreshold || velocity > velocityThreshold;
      
      if (isSwipe) {
        if (deltaX > 0) {
          goToPrevSlide();
        } else {
          goToNextSlide();
        }
      } else {
        // Reset position with animation
        setIsAnimating(true);
        setTimeout(() => {
          setSwipeOffset(0);
          setIsAnimating(false);
        }, 150);
      }
      
      touchStartX.current = null;
      touchStartTime.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [viewState, currentSlide, isAnimating, currentIndex]);

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
              style={{ cursor: 'pointer' }}
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
        // Carousel view with simplified swipe mechanics
        <div className="w-full max-w-md flex-1 relative" style={{ minHeight: '70vh' }}>
          {/* Current card */}
          <div 
            className={`w-full max-w-md h-[85vh] min-h-[85vh] p-6 rounded-lg shadow-lg ${SECTIONS[currentIndex].bg} ${SECTIONS[currentIndex].text} flex flex-col items-center justify-center`}
            style={{
              transition: 'transform 300ms ease-out',
              transform: `translateX(${swipeOffset}%)`,
            }}
          >
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
            
            {/* EchoPet only on Avni card */}
            {SECTIONS[currentIndex].isAvni && (
              <div
                className="absolute bottom-2 right-2 w-20 h-20"
                onClick={handleEchoTap}
              >
                <EchoPet />
              </div>
            )}
          </div>
          
          {/* Navigation dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {SECTIONS.map((section, idx) => (
              <div 
                key={`dot-${section.key}`}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${idx === currentIndex ? 'bg-white' : 'bg-white bg-opacity-40'}`}
              />
            ))}
          </div>
          
          {/* Back to stacked button if on first card */}
          {currentIndex === 0 && (
            <button
              className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#2d4654] text-white px-4 py-2 rounded shadow"
              onClick={() => setViewState('stacked')}
            >
              Back to Stacked
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StackedResumeMobile;