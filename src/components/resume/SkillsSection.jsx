// src/components/resume/SkillsSection.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { skillsCategories } from '../../constants/skillsData';

/**
 * Skills section component that displays skill categories and items
 * 
 * @param {Object} props - Component props
 * @param {Object} props.colors - Color scheme for the component
 */
const SkillsSection = ({ colors }) => {
  // Stop propagation to prevent closing when clicking inside the section
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleContentClick} className="p-8 h-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold" style={{ color: colors.lightText }}>Skills</h2>
      </div>

      <div className="space-y-6 text-white text-sm">
        {skillsCategories.map((category) => (
          <div key={category.name}>
            <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
            <ul className="flex flex-wrap gap-3">
              {category.skills.map(skill => (
                <li 
                  key={skill} 
                  className="px-3 py-1 rounded-full bg-white bg-opacity-20"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

SkillsSection.propTypes = {
  colors: PropTypes.object.isRequired
};

export default React.memo(SkillsSection);