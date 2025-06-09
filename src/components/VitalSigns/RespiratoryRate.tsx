import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RespiratoryRate.css';

const RespiratoryRate: React.FC = () => {
  const navigate = useNavigate();
  const [respiratoryRate, setRespiratoryRate] = useState<number>(0);

  const handleInputChange = (value: string) => {
    const numValue = Number(value);
    if (numValue >= 0 && numValue <= 60) {
      setRespiratoryRate(numValue);
    }
  };

  const handleSave = () => {
    // Add to timeline
    const now = new Date();
    const timelineEntry = {
      type: 'Respiratory Rate',
      value: respiratoryRate,
      unit: 'per min',
      timestamp: now.toISOString()
    };
    // TODO: Add to your timeline state management
    console.log('Saving to timeline:', timelineEntry);
  };

  const handleNext = () => {
    handleSave();
    navigate('/vital-signs/oxygen-saturation');
  };

  const handlePrev = () => {
    navigate('/vital-signs/heart-rate');
  };

  return (
    <div className="respiratory-rate-container">
      <div className="respiratory-rate-card">
        <h2 className="respiratory-rate-title">
          Respiratory Rate <span className="info-icon">ⓘ</span>
        </h2>

        <div className="form-group">
          <label htmlFor="respiratoryRate">Value:</label>
          <input
            type="number"
            id="respiratoryRate"
            value={respiratoryRate}
            onChange={(e) => handleInputChange(e.target.value)}
            min="0"
            max="60"
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
    </div>
  );
};

export default RespiratoryRate; 