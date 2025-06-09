import React, { useState, useEffect } from 'react';
import './HeartRate.css';
import { useNavigate } from 'react-router-dom';
import { useTimeline } from '../../context/TimelineContext';

interface PopupProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ onClose, children }) => (
  <div className="popup-overlay">
    <div className="popup-content">
      {children}
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  </div>
);

const HeartRate: React.FC = () => {
  const navigate = useNavigate();
  const [heartRate, setHeartRate] = useState<number>(0);
  const [showLowHeartRatePopup, setShowLowHeartRatePopup] = useState(false);
  const [showHighHeartRatePopup, setShowHighHeartRatePopup] = useState(false);
  const [showVeryHighHeartRatePopup, setShowVeryHighHeartRatePopup] = useState(false);
  const { addEntry, timeline } = useTimeline();

  useEffect(() => {
    if (heartRate < 60 && heartRate !== 0) {
      setShowLowHeartRatePopup(true);
    } else if (heartRate > 150) {
      setShowVeryHighHeartRatePopup(true);
    } else if (heartRate > 100) {
      setShowHighHeartRatePopup(true);
    }
  }, [heartRate]);

  const handleInputChange = (value: string) => {
    const numValue = Number(value);
    if (numValue >= 0 && numValue <= 300) {
      setHeartRate(numValue);
    }
  };

  const handleSave = () => {
    const now = new Date();
    const timelineEntry = {
      type: 'Heart Rate',
      value: heartRate,
      unit: 'per min',
      timestamp: now.toISOString()
    };
    addEntry(timelineEntry);
  };

  const handleNext = () => {
    handleSave();
    navigate('/vital-signs/respiratory-rate');
  };

  const handlePrev = () => {
    navigate('/vital-signs/blood-pressure');
  };

  return (
    <div className="heart-rate-container">
      <div className="heart-rate-card">
        <h2 className="heart-rate-title">
          Heart Rate <span className="info-icon">ⓘ</span>
        </h2>

        <div className="form-group">
          <label htmlFor="heartRate">Value:</label>
          <input
            type="number"
            id="heartRate"
            value={heartRate}
            onChange={(e) => handleInputChange(e.target.value)}
            min="0"
            max="300"
          />
        </div>

        <div className="form-group">
          <label>Unit:</label>
          <div className="unit-display">per min</div>
        </div>

        <div className="button-group">
          <button className="prev-button" onClick={handlePrev}>
            PREV
          </button>
          <button className="save-button" onClick={handleSave}>
            SAVE
          </button>
          <button className="next-button" onClick={handleNext}>
            NEXT
          </button>
        </div>
      </div>

      {showLowHeartRatePopup && (
        <Popup onClose={() => setShowLowHeartRatePopup(false)}>
          <h3>Heart rate below 60 beats per minute</h3>
          <div className="popup-buttons">
            <button onClick={() => navigate('/drugs/intravenous-atropine')}>
              Intravenous Atropine
            </button>
            <button onClick={() => navigate('/drugs/intravenous-infusion-dopamine')}>
              Intravenous Infusion Dopamine
            </button>
            <button onClick={() => navigate('/drugs/intravenous-adrenaline-infusion')}>
              Intravenous Adrenaline Infusion
            </button>
            <button onClick={() => navigate('/pacing/transcutaneous')}>
              Transcutaneous Pacing
            </button>
          </div>
        </Popup>
      )}

      {showHighHeartRatePopup && (
        <Popup onClose={() => setShowHighHeartRatePopup(false)}>
          <h3>Heart rate above 100 beats per minute</h3>
          <div className="popup-buttons">
            <button onClick={() => console.log('Close monitoring')}>
              Close Monitoring
            </button>
            <button onClick={() => console.log('Perform ECG')}>
              Perform ECG
            </button>
            <button onClick={() => navigate('/fluid/crystalloid')}>
              Bolus / Infusion of Crystalloid
            </button>
            <button onClick={() => navigate('/fluid/colloid')}>
              Bolus / Infusion of Colloid
            </button>
            <button onClick={() => navigate('/drugs/intravenous-infusion-adrenaline')}>
              Intravenous Infusion Adrenaline
            </button>
            <button onClick={() => navigate('/drugs/intravenous-infusion-noradrenaline')}>
              Intravenous Infusion Noradrenaline
            </button>
            <button onClick={() => navigate('/drugs/intravenous-infusion-dopamine')}>
              Intravenous Infusion Dopamine
            </button>
            <button onClick={() => navigate('/drugs/intravenous-infusion-dobutamine')}>
              Intravenous Infusion Dobutamine
            </button>
            <button onClick={() => navigate('/vital-signs/temperature')}>
              Monitor Temperature
            </button>
          </div>
        </Popup>
      )}

      {showVeryHighHeartRatePopup && (
        <Popup onClose={() => setShowVeryHighHeartRatePopup(false)}>
          <h3>Heart rate above 150 beats per minute</h3>
          <div className="popup-buttons">
            <button onClick={() => navigate('/synchronize-cardioversion')}>
              Synchronize Cardioversion
            </button>
            <button onClick={() => navigate('/drugs')}>
              Drugs
            </button>
          </div>
        </Popup>
      )}

      <div className="timeline-list">
        {timeline.map((entry, idx) => (
          <div key={idx}>
            <b>{entry.type}</b> - {entry.value} {entry.unit} <br />
            <small>{new Date(entry.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeartRate; 