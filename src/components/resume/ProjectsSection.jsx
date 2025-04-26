// src/components/resume/ProjectsSection.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { projects } from '../../constants/projectsData';

/**
 * Projects section component for the resume
 * 
 * @param {Object} props - Component props
 * @param {number} props.projectIndex - Current project index
 * @param {Function} props.setProjectIndex - Function to update project index
 * @param {Object} props.colors - Color scheme
 */
const ProjectsSection = ({ projectIndex, setProjectIndex, colors }) => {
  const currentProject = projects[projectIndex];
  
  // Stop propagation to prevent closing when clicking inside the section
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      onClick={handleContentClick} 
      className="p-8 h-full flex flex-col justify-between overflow-auto"
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Projects</h2>
        </div>
        
        <div className="bg-white bg-opacity-20 rounded-lg overflow-hidden shadow-sm flex flex-col">
          {/* Only hide project screenshot for specific projects */}
          {currentProject.title !== "Domain Health Checker" && 
           currentProject.title !== "Layered Resume Website" && (
            <div className="h-40 bg-black bg-opacity-10 flex items-center justify-center mb-4">
              <span style={{ color: colors.text }}>Project Screenshot</span>
            </div>
          )}
          
          <div className="p-5 flex flex-col flex-1">
            <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
              {currentProject.link && currentProject.link !== "#" ? (
                <a 
                  href={currentProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline"
                >
                  {currentProject.title}
                </a>
              ) : (
                currentProject.title
              )}
            </h3>
            
            {/* NDA notice for Domain Health Checker */}
            {currentProject.title === "Domain Health Checker" && (
              <p 
                className="text-sm italic mb-3" 
                style={{ color: 'rgba(45,70,84,0.8)' }}
              >
                Visuals unavailable due to NDA. MVP available on GitHub.
              </p>
            )}
            
            {/* Project bullets */}
            <ul 
              className="list-disc list-inside text-sm mb-4" 
              style={{ color: 'rgba(45,70,84,0.8)' }}
            >
              {currentProject.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
            
            {/* Project indicators and link */}
            <div className="flex justify-between items-center mt-auto pt-2">
              <div className="flex gap-1">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ background: colors.layer3 }}
                />
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ background: colors.layer4 }}
                />
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ background: colors.center }}
                />
              </div>
              
              {currentProject.link && currentProject.link !== "#" && (
                <a 
                  className="text-sm hover:underline" 
                  style={{ color: colors.text }} 
                  href={currentProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Details →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation controls */}
      <div className="mt-6 flex justify-between items-center text-black">
        <button
          onClick={() => setProjectIndex((i) => Math.max(0, i - 1))}
          disabled={projectIndex === 0}
          className="px-4 py-2 bg-black bg-opacity-10 rounded hover:bg-opacity-20 disabled:opacity-30"
          aria-label="Previous project"
        >
          Previous
        </button>
        
        <span className="text-sm">{`${projectIndex + 1} / ${projects.length}`}</span>
        
        <button
          onClick={() => setProjectIndex((i) => Math.min(projects.length - 1, i + 1))}
          disabled={projectIndex === projects.length - 1}
          className="px-4 py-2 bg-black bg-opacity-10 rounded hover:bg-opacity-20 disabled:opacity-30"
          aria-label="Next project"
        >
          Next
        </button>
      </div>
    </div>
  );
};

ProjectsSection.propTypes = {
  projectIndex: PropTypes.number.isRequired,
  setProjectIndex: PropTypes.func.isRequired,
  colors: PropTypes.object.isRequired
};

export default React.memo(ProjectsSection);