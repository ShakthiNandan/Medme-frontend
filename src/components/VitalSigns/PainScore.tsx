import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PainScore.css';

const PainScore: React.FC = () => {
  const navigate = useNavigate();
  const [painScore, setPainScore] = useState<number>(0);

  const handleInputChange = (value: string) => {
    const numValue = Number(value);
    if (numValue >= 0 && numValue <= 10) {
      setPainScore(numValue);
    }
  };

  const handleSave = () => {
    // Add to timeline
    const now = new Date();
    const timelineEntry = {
      type: 'Pain Score',
      value: painScore,
      unit: 'max 10',
      timestamp: now.toISOString()
    };
    // TODO: Add to your timeline state management
    console.log('Saving to timeline:', timelineEntry);
  };

  const handleNext = () => {
    handleSave();
    navigate('/vital-signs/temperature');
  };

  const handlePrev = () => {
    navigate('/vital-signs/oxygen-saturation');
  };

  return (
    <div className="pain-score-container">
      <div className="pain-score-card">
        <h2 className="pain-score-title">
          Pain Score <span className="info-icon">ⓘ</span>
        </h2>

        <div className="form-group">
          <label htmlFor="painScore">Value:</label>
          <input
            type="number"
            id="painScore"
            value={painScore}
            onChange={(e) => handleInputChange(e.target.value)}
            min="0"
            max="10"
          />
        </div>

        <div className="form-group">
          <label>Unit:</label>
          <div className="unit-display">max 10</div>
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

export default PainScore; 