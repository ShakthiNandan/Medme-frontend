// src/components/AssistedCPR.tsx
import React, { useState, useEffect } from 'react';
import './AssistedCPR.css';

interface TimelineEvent {
  time: string;
  event: string;
}

const AssistedCPR: React.FC = () => {
  // cprStatus can be 'ACTIVE', 'HOLD', 'ENDED'
  const [cprStatus, setCprStatus] = useState<'ACTIVE' | 'HOLD' | 'ENDED'>('ACTIVE');
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [showDeadModal, setShowDeadModal] = useState(false);

  // Log an event with the current time
  const addEvent = (event: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTimeline((prev) => [...prev, { time: timeStr, event }]);
  };

  // On first load, log "CPR Started"
  useEffect(() => {
    addEvent('CPR Started');
  }, []);

  // Toggle hold/resume
  const handleHoldResume = () => {
    if (cprStatus === 'ACTIVE') {
      setCprStatus('HOLD');
      addEvent('Hold CPR');
    } else if (cprStatus === 'HOLD') {
      setCprStatus('ACTIVE');
      addEvent('CPR Resumed');
    }
  };

  // ROSC
  const handleROSC = () => {
    setCprStatus('ENDED');
    addEvent('ROSC');
  };

  // Pronounce Dead (open confirmation modal)
  const handlePronounceDead = () => {
    setShowDeadModal(true);
  };

  // Confirm "Pronounce Dead"
  const confirmDead = () => {
    setShowDeadModal(false);
    setCprStatus('ENDED');
    addEvent('Patient Pronounced Dead');
  };

  // Cancel "Pronounce Dead"
  const cancelDead = () => {
    setShowDeadModal(false);
  };

  // If CPR ended, disable the "Hold" and "ROSC" buttons
  const isCPREnded = cprStatus === 'ENDED';
  const isHold = cprStatus === 'HOLD';

  return (
    <div className="assisted-cpr-container">
      <h2 className="assisted-cpr-title">Assisted CPR</h2>

      <div className="cpr-content">
        {/* Timeline on the left */}
        <div className="cpr-timeline">
          <h4>Timeline</h4>
          <div className="timeline-events">
            {timeline.map((evt, idx) => (
              <div key={idx} className="timeline-event">
                <span className="event-time">{evt.time}</span> - <span className="event-text">{evt.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons on the right */}
        <div className="cpr-controls">
          <button
            className="hold-button"
            onClick={handleHoldResume}
            disabled={isCPREnded}
          >
            {isHold ? 'RESUME' : 'HOLD'}
          </button>

          <button
            className="rosc-button"
            onClick={handleROSC}
            disabled={isCPREnded}
          >
            ROSC
          </button>

          <button
            className="dead-button"
            onClick={handlePronounceDead}
            disabled={isCPREnded}
          >
            Pronounce Dead
          </button>
        </div>
      </div>

      {/* Confirmation Modal for "Pronounce Dead" */}
      {showDeadModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure?</h3>
            <div className="modal-buttons">
              <button onClick={confirmDead} className="yes-button">Yes</button>
              <button onClick={cancelDead} className="no-button">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssistedCPR;
