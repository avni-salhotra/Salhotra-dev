// src/components/LayeredSquaresResume.jsx
import React, { useEffect } from 'react';
import GameOverlay from './game/GameOverlay';
import EchoPet from './common/EchoPet';
import LayerCard from './common/LayerCard';
import ExperienceSection from './resume/ExperienceSection';
import ProjectsSection from './resume/ProjectsSection';
import SkillsSection from './resume/SkillsSection';
import EducationSection from './resume/EducationSection';
import PersonalInfo from './resume/PersonalInfo';

// Custom hooks
import { useResumeState } from '../hooks/useResumeState';
import { useEchoAnimation } from '../hooks/useEchoAnimation';

// Data imports
import { colors } from '../constants/colors';
import { experienceEntries } from '../constants/experienceData';
import { projects } from '../constants/projectsData';

/**
 * Main resume component with layered UI design
 */
const LayeredSquaresResume = () => {
  // Resume state using custom hook
  const {
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
  } = useResumeState();

  // Dog animation state using custom hook
  const { dogX, echoState, echoDirection } = useEchoAnimation();

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname !== '/game') {
        setShowGame(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: colors.background }}>
      <div className="relative w-full aspect-square sm:max-w-[min(90vw,600px)]">
        {/* Layer 1 - Experience */}
        <LayerCard
          active={activeSection === 'experience'}
          activeSection={activeSection}
          sectionId="experience"
          initialLoad={initialLoad}
          transitionDelay={1200}
          color={colors.layer1}
          insetValue={0}
          handleSectionClick={handleSectionClick}
          isTransitioning={isTransitioning}
        >
          {activeSection === 'experience' && (
            <ExperienceSection
              experienceEntries={experienceEntries}
              experienceIndex={experienceIndex}
              setExperienceIndex={setExperienceIndex}
            />
          )}
        </LayerCard>
        
        {/* Layer 2 - Projects */}
        <LayerCard
          active={activeSection === 'projects'}
          activeSection={activeSection}
          sectionId="projects"
          initialLoad={initialLoad}
          transitionDelay={800}
          color={colors.layer2}
          insetValue={10}
          handleSectionClick={handleSectionClick}
          isTransitioning={isTransitioning}
        >
          {activeSection === 'projects' && (
            <ProjectsSection
              projects={projects}
              projectIndex={projectIndex}
              setProjectIndex={setProjectIndex}
              colors={colors}
            />
          )}
        </LayerCard>
        
        {/* Layer 3 - Skills */}
        <LayerCard
          active={activeSection === 'skills'}
          activeSection={activeSection}
          sectionId="skills"
          initialLoad={initialLoad}
          transitionDelay={400}
          color={colors.layer3}
          insetValue={20}
          handleSectionClick={handleSectionClick}
          isTransitioning={isTransitioning}
        >
          {activeSection === 'skills' && (
            <SkillsSection colors={colors} />
          )}
        </LayerCard>
        
        {/* Layer 4 - Education */}
        <LayerCard
          active={activeSection === 'education'}
          activeSection={activeSection}
          sectionId="education"
          initialLoad={initialLoad}
          transitionDelay={200}
          color={colors.layer4}
          insetValue={30}
          handleSectionClick={handleSectionClick}
          isTransitioning={isTransitioning}
        >
          {activeSection === 'education' && (
            <EducationSection colors={colors} />
          )}
        </LayerCard>
        
        {/* Center - Personal Info */}
        <div 
          className={`absolute rounded-lg shadow-lg transition-all duration-800 ${
            activeSection 
              ? 'opacity-0 scale-95' 
              : initialLoad 
                ? 'opacity-0 scale-95 delay-600' 
                : 'opacity-100 inset-[40%] scale-100'
          }`}
          style={{ 
            background: colors.center,
            transitionDelay: initialLoad ? '0ms' : '0ms'
          }}
        >
          <PersonalInfo 
            colors={colors} 
            onClick={() => {
              window.history.pushState({}, '', '/game');
              setShowGame(true);
            }}
            dogX={dogX}
            echoState={echoState}
            echoDirection={echoDirection}
          />
        </div>
        
        {/* Retro border labels for each section */}
        {!activeSection && !initialLoad && (
          <>
            {/* Desktop view: corner-aligned retro labels */}
            <p className="hidden sm:block absolute bottom-[calc(0%+0.5rem)] right-[calc(0%+0.5rem)] text-xs sm:text-sm md:text-base font-mono text-black opacity-80 tracking-wider animate-pixelAppear">
              EXPERIENCE
            </p>
            <p className="hidden sm:block absolute bottom-[calc(10%+0.5rem)] right-[calc(10%+0.5rem)] text-xs sm:text-sm md:text-base font-mono text-black opacity-80 tracking-wider animate-pixelAppear">
              PROJECTS
            </p>
            <p className="hidden sm:block absolute bottom-[calc(20%+0.5rem)] right-[calc(20%+0.5rem)] text-xs sm:text-sm md:text-base font-mono text-black opacity-80 tracking-wider animate-pixelAppear">
              SKILLS
            </p>
            <p className="hidden sm:block absolute bottom-[calc(30%+0.5rem)] right-[calc(30%+0.5rem)] text-xs sm:text-sm md:text-base font-mono text-black opacity-80 tracking-wider animate-pixelAppear">
              EDUCATION
            </p>

            {/* Mobile view: Center stacked floating labels */}
            <div className="sm:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 space-y-1 text-center">
              {['EXPERIENCE', 'PROJECTS', 'SKILLS', 'EDUCATION'].map((label, i) => (
                <p key={label} className="text-xs font-mono text-black opacity-70 tracking-wider animate-pixelAppear">
                  {label}
                </p>
              ))}
            </div>
          </>
        )}
        
        {/* RETURN label for expanded section */}
        {activeSection && (
          <div className="absolute top-0 left-0 -translate-y-full ml-1 text-xs sm:text-sm md:text-base font-mono text-black opacity-80 tracking-wider cursor-pointer animate-pixelAppear"
               onClick={() => handleSectionClick(activeSection)}>
            ← RETURN
          </div>
        )}
      </div>
      {showGame && <GameOverlay onClose={() => setShowGame(false)} />}
    </div>
  );
};

export default LayeredSquaresResume;

// Retro pixel animation for section labels
<style>
{`
  @keyframes pixelAppear {
    0% { opacity: 0; transform: scale(0.95) translateY(4px); filter: blur(1px); }
    100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
  }
  .animate-pixelAppear {
    animation: pixelAppear 0.6s ease-out forwards;
  }
`}
</style>