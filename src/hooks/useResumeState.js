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

  // Initialize based on current URL path
  useEffect(() => {
    // Create an initial history entry if one doesn't exist
    if (window.history.state === null) {
      window.history.replaceState({ page: 'home' }, '', window.location.pathname);
    }
    
    const path = window.location.pathname.replace('/', '');
    
    if (path === 'game') {
      setShowGame(true);
    } else if (['experience', 'projects', 'skills', 'education'].includes(path)) {
      setActiveSection(path);
    }
  }, []);

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
      // Deactivate current section
      setActiveSection(null);
      // Create a new history entry for the home state
      window.history.pushState({ page: 'home' }, '', '/');
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    } else {
      // Activate new section
      setActiveSection(section);
      // Create a new history entry for the section
      window.history.pushState({ page: section }, '', `/${section}`);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }
  }, [activeSection, isTransitioning]);

  return {
    activeSection,
    setActiveSection,
    isTransitioning,
    setIsTransitioning,
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