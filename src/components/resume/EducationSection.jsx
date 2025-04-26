// src/components/resume/EducationSection.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Education section component for the resume
 *
 * @param {Object} props - Component props
 * @param {Object} props.colors - Color scheme
 */
const EducationSection = ({ colors }) => {
  // Stop propagation to prevent closing when clicking inside the section
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleContentClick} className="p-4 sm:p-6 md:p-8 h-full overflow-auto">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: colors.lightText }}>Education</h2>
      </div>
      
      <div className="bg-white bg-opacity-10 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <h3 className="text-lg sm:text-xl font-semibold" style={{ color: colors.lightText }}>
            Bachelor of Engineering
          </h3>
        </div>
        
        <h4 className="text-base sm:text-lg mb-2" style={{ color: colors.lightText }}>
          Computer Engineering, University of Victoria
        </h4>
        
        <p className="text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
          Specialized in Computing Intelligence with coursework in machine learning, computer vision, and pattern recognition.
        </p>

      </div>
    </div>
  );
};

EducationSection.propTypes = {
  colors: PropTypes.object.isRequired
};

export default React.memo(EducationSection);