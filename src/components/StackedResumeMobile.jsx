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
  // iOS detection
  // const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const [lastTapTime, setLastTapTime] = useState(0);
  // New view state: 'stacked' or 'carousel'
  const [viewState, setViewState] = useState('stacked');
  // Current slide key (e.g., 'education'), only relevant for carousel
  const [currentSlide, setCurrentSlide] = useState('avni');

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
    if (currentIndex === 0) {
      // If on first card ('avni'), swiping right returns to stacked
      setViewState('stacked');
    } else if (currentIndex > 0) {
      setCurrentSlide(slideKeys[currentIndex - 1]);
    }
  };
  const goToNextSlide = () => {
    if (currentIndex < slideKeys.length - 1) {
      setCurrentSlide(slideKeys[currentIndex + 1]);
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
    // eslint-disable-next-line
  }, [viewState, currentSlide]);

  // Touch swipe gesture support for carousel view
  const touchStartX = useRef(null);
  useEffect(() => {
    if (viewState !== 'carousel') return;

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      if (touchStartX.current === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;

      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          goToPrevSlide();
        } else {
          goToNextSlide();
        }
      }
      touchStartX.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [viewState, currentSlide]);

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
        // Carousel view
        <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center relative" style={{ minHeight: '70vh' }}>
          <div className="flex flex-row w-full h-full overflow-x-hidden transition-transform duration-300" style={{ touchAction: 'pan-y' }}>
            {SECTIONS.map((section, idx) => (
              <div
                key={section.key}
                className={`w-full min-w-full max-w-md h-[85vh] min-h-[85vh] p-6 flex flex-col items-center justify-center rounded-lg shadow-lg ${section.bg} ${section.text} relative ${section.z} transition-all duration-300`}
                style={{
                  transform: `translateX(${(idx - currentIndex) * 100}%)`,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  opacity: idx === currentIndex ? 1 : 0,
                  zIndex: idx === currentIndex ? 2 : 1,
                }}
              >
                {section.content ? (
                  <div className="w-full h-full overflow-y-auto">{section.content}</div>
                ) : (
                  <div className={`flex flex-col items-center h-full w-full ${section.isAvni ? 'pt-4 mb-1' : 'pt-10'}`}>
                    <h1 className={`text-xl tracking-wider opacity-90 ${section.isAvni ? 'mb-2' : ''} text-center`} style={{ fontFamily: 'Menlo, Monaco, monospace' }}>
                      {section.title}
                    </h1>
                    {section.subtitle && (
                      <p className="text-lg opacity-80 text-center">{section.subtitle}</p>
                    )}
                  </div>
                )}
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