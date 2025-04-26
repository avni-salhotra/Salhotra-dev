// src/components/resume/ExperienceSection.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { experienceEntries } from '../../constants/experienceData';

/**
 * Experience section component that displays work history
 *
 * @param {Object} props - Component props
 * @param {number} props.experienceIndex - Current selected experience index
 * @param {Function} props.setExperienceIndex - Function to update the experience index
 * @param {Object} props.colors - Color scheme for styling
 * @param {boolean} props.showNavigation - Whether to show navigation controls (default: true)
 * @param {boolean} props.showAllExperiences - Whether to show all experiences in a scrollable list (default: false)
 */
const ExperienceSection = ({
  experienceIndex,
  setExperienceIndex,
  colors = { text: '#ffffff', lightText: '#ffffff' },
  showNavigation = true,
  showAllExperiences = false
}) => {
  // Stop propagation to prevent closing when clicking inside the section
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  // Experience card component to maintain consistent styling
  const ExperienceCard = ({ experience }) => (
    <div className="mb-8 bg-white bg-opacity-10 rounded-lg p-5">
      <h3 className="text-xl font-bold" style={{ color: colors.text }}>{experience.title}</h3>
      <p className="text-sm italic mt-1 mb-3" style={{ color: colors.lightText }}>{experience.meta}</p>
      
      <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: colors.lightText }}>
        {experience.bullets.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div
      onClick={handleContentClick}
      className="p-8 h-full flex flex-col justify-between overflow-auto"
    >
      <div className={`${!showNavigation && 'pb-16'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Experience</h2>
        </div>

        {showAllExperiences ? (
          // Show all experiences in a scrollable list for mobile
          <div className="space-y-6">
            {experienceEntries.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} />
            ))}
          </div>
        ) : (
          // Show single experience with navigation for web
          <ExperienceCard experience={experienceEntries[experienceIndex]} />
        )}
      </div>

      {/* Navigation controls - conditionally rendered only for web view */}
      {showNavigation && !showAllExperiences && (
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => setExperienceIndex((i) => Math.max(0, i - 1))}
            disabled={experienceIndex === 0}
            className="px-4 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20 disabled:opacity-30"
            style={{ color: colors.text }}
            aria-label="Previous experience"
          >
            Previous
          </button>
          
          <span className="text-sm" style={{ color: colors.text }}>
            {`${experienceIndex + 1} / ${experienceEntries.length}`}
          </span>
          
          <button
            onClick={() => setExperienceIndex((i) => Math.min(experienceEntries.length - 1, i + 1))}
            disabled={experienceIndex === experienceEntries.length - 1}
            className="px-4 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20 disabled:opacity-30"
            style={{ color: colors.text }}
            aria-label="Next experience"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

ExperienceSection.propTypes = {
  experienceIndex: PropTypes.number.isRequired,
  setExperienceIndex: PropTypes.func.isRequired,
  colors: PropTypes.object,
  showNavigation: PropTypes.bool,
  showAllExperiences: PropTypes.bool
};

export default React.memo(ExperienceSection);