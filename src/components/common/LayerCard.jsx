// src/components/common/LayerCard.jsx
import React from 'react';
import PropTypes from 'prop-types';

const LayerCard = ({
  active,
  activeSection,
  sectionId,
  initialLoad,
  transitionDelay,
  color,
  insetValue,
  handleSectionClick,
  isTransitioning,
  children
}) => {
  // Create specific inset classes instead of dynamic string interpolation
  const getInsetClass = () => {
    if (insetValue === 0) return 'inset-0';
    if (insetValue === 10) return 'inset-[10%]';
    if (insetValue === 20) return 'inset-[20%]';
    if (insetValue === 30) return 'inset-[30%]';
    if (insetValue === 40) return 'inset-[40%]';
    return 'inset-0';
  };

  const positionClass = activeSection === sectionId
    ? 'inset-0 z-50'
    : activeSection
      ? 'opacity-0 scale-95'
      : initialLoad
        ? 'opacity-0 scale-95'
        : `opacity-100 ${getInsetClass()} scale-100`;

  return (
    <div
      className={`absolute rounded-lg shadow-lg transition-all duration-800 cursor-pointer ${positionClass}`}
      style={{
        background: color,
        transitionDelay: initialLoad ? `${transitionDelay}ms` : '0ms'
      }}
      onClick={(e) => {
        if ((!activeSection || activeSection === sectionId) && !isTransitioning) {
          e.stopPropagation();
          handleSectionClick(sectionId);
        }
      }}
      role="button"
      aria-expanded={activeSection === sectionId}
      aria-label={`${sectionId} section`}
    >
      {active && children}
    </div>
  );
};

LayerCard.propTypes = {
  active: PropTypes.bool,
  activeSection: PropTypes.string,
  sectionId: PropTypes.string.isRequired,
  initialLoad: PropTypes.bool.isRequired,
  transitionDelay: PropTypes.number,
  color: PropTypes.string.isRequired,
  insetValue: PropTypes.number.isRequired,
  handleSectionClick: PropTypes.func.isRequired,
  isTransitioning: PropTypes.bool.isRequired,
  children: PropTypes.node
};

LayerCard.defaultProps = {
  active: false,
  activeSection: null,
  transitionDelay: 0,
  children: null
};

export default React.memo(LayerCard);