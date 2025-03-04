// src/components/InjuriesMenu/InjuriesTimeline.tsx
import React from 'react';

interface InjuriesTimelineProps {
  entries: string[];
}

const InjuriesTimeline: React.FC<InjuriesTimelineProps> = ({ entries }) => {
  return (
    <div className="injuries-timeline">
      <h3>Timeline</h3>
      <div className="timeline-list">
        {entries.length === 0 && <p>No injuries noted yet.</p>}
        {entries.map((entry, index) => (
          <div key={index} className="timeline-entry">
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InjuriesTimeline;
