import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OxygenSaturation.css';

const OxygenSaturation: React.FC = () => {
  const navigate = useNavigate();
  const [oxygenSaturation, setOxygenSaturation] = useState<number>(0);

  const handleInputChange = (value: string) => {
    const numValue = Number(value);
    if (numValue >= 0 && numValue <= 100) {
      setOxygenSaturation(numValue);
    }
  };

  const handleSave = () => {
    // Add to timeline
    const now = new Date();
    const timelineEntry = {
      type: 'Oxygen Saturation',
      value: oxygenSaturation,
      unit: '%',
      timestamp: now.toISOString()
    };
    // TODO: Add to your timeline state management
    console.log('Saving to timeline:', timelineEntry);
  };

  const handleNext = () => {
    handleSave();
    navigate('/vital-signs/pain-score');
  };

  const handlePrev = () => {
    navigate('/vital-signs/respiratory-rate');
  };

  return (
    <div className="oxygen-saturation-container">
      <div className="oxygen-saturation-card">
        <h2 className="oxygen-saturation-title">
          Oxygen Saturation <span className="info-icon">ⓘ</span>
        </h2>

        <div className="form-group">
          <label htmlFor="oxygenSaturation">Value:</label>
          <input
            type="number"
            id="oxygenSaturation"
            value={oxygenSaturation}
            onChange={(e) => handleInputChange(e.target.value)}
            min="0"
            max="100"
          />
        </div>

        <div className="form-group">
          <label>Unit:</label>
          <div className="unit-display">%</div>
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
    </div>
  );
};

export default OxygenSaturation; 