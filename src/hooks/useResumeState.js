// src/hooks/useResumeState.js
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage resume state
 * Handles section activation, transitions, and navigation
 */
export const useResumeState = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [showGame, setShowGame] = useState(false);

  // Initial load animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 1800);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle section activation and transitions
  const handleSectionClick = useCallback((section) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (activeSection === section) {
      setActiveSection(null);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    } else {
      setActiveSection(section);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }
  }, [activeSection, isTransitioning]);

  return {
    activeSection,
    isTransitioning,
    initialLoad,
    experienceIndex,
    setExperienceIndex,
    projectIndex,
    setProjectIndex,
    showGame,
    setShowGame,
    handleSectionClick
  };
};

export default useResumeState;