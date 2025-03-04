// src/components/FluidMenu/FluidTimeline.tsx
import React from 'react';

const FluidTimeline: React.FC = () => {
  // In a real app, you'd pass timeline data as props or use a global store
  const timelineData = [
    { label: 'Fluid, Crystalloid', time: '2025-03-05T10:00:00Z' },
    { label: 'Fluid, Colloid', time: '2025-03-05T09:30:00Z' },
    // etc.
  ];

  return (
    <div className="fluid-timeline">
      <h3>Timeline</h3>
      <div className="timeline-entries">
        {timelineData.map((entry, index) => (
          <div key={index} className="timeline-entry">
            <p>{entry.label}</p>
            <p>{new Date(entry.time).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FluidTimeline;
