// src/components/resume/ExperienceSection.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Experience section component that displays work history
 * 
 * @param {Object} props - Component props
 * @param {Array} props.experienceEntries - Array of experience data objects
 * @param {number} props.experienceIndex - Current selected experience index
 * @param {Function} props.setExperienceIndex - Function to update the experience index
 */
const ExperienceSection = ({ 
  experienceEntries, 
  experienceIndex, 
  setExperienceIndex 
}) => {
  // Stop propagation to prevent closing when clicking inside the section
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      onClick={handleContentClick} 
      className="p-8 h-full flex flex-col justify-between overflow-auto"
    >
      <div className="text-white space-y-2">
        <h3 className="text-xl font-bold">{experienceEntries[experienceIndex].title}</h3>
        <p className="text-sm italic">{experienceEntries[experienceIndex].meta}</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {experienceEntries[experienceIndex].bullets.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      
      <div className="mt-6 flex justify-between items-center text-white">
        <button
          onClick={() => setExperienceIndex((i) => Math.max(0, i - 1))}
          disabled={experienceIndex === 0}
          className="px-4 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20 disabled:opacity-30"
          aria-label="Previous experience"
        >
          Previous
        </button>
        <span className="text-sm">{`${experienceIndex + 1} / ${experienceEntries.length}`}</span>
        <button
          onClick={() => setExperienceIndex((i) => Math.min(experienceEntries.length - 1, i + 1))}
          disabled={experienceIndex === experienceEntries.length - 1}
          className="px-4 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20 disabled:opacity-30"
          aria-label="Next experience"
        >
          Next
        </button>
      </div>
    </div>
  );
};

ExperienceSection.propTypes = {
  experienceEntries: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      meta: PropTypes.string.isRequired,
      bullets: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired,
  experienceIndex: PropTypes.number.isRequired,
  setExperienceIndex: PropTypes.func.isRequired
};

export default React.memo(ExperienceSection);