import React, { useState } from 'react';
import './BloodPressure.css';

interface BloodPressureData {
  systolic: number;
  diastolic: number;
  unit: string;
}

const BloodPressure: React.FC = () => {
  const [bloodPressure, setBloodPressure] = useState<BloodPressureData>({
    systolic: 0,
    diastolic: 0,
    unit: 'mmHg'
  });

  const handleInputChange = (field: keyof BloodPressureData, value: string) => {
    setBloodPressure(prev => ({
      ...prev,
      [field]: field === 'unit' ? value : Number(value)
    }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving blood pressure:', bloodPressure);
  };

  const handleNext = () => {
    // TODO: Navigate to next vital sign
    console.log('Navigate to next vital sign');
  };

  return (
    <div className="blood-pressure-container">
      <div className="blood-pressure-card">
        <h2 className="blood-pressure-title">
          Blood Pressure
          <span className="info-icon">ⓘ</span>
        </h2>

        <div className="blood-pressure-form">
          <div className="form-group">
            <label htmlFor="systolic">Systolic Value:</label>
            <input
              type="number"
              id="systolic"
              value={bloodPressure.systolic}
              onChange={(e) => handleInputChange('systolic', e.target.value)}
              min="0"
              max="300"
            />
          </div>

          <div className="form-group">
            <label htmlFor="diastolic">Diastolic Value:</label>
            <input
              type="number"
              id="diastolic"
              value={bloodPressure.diastolic}
              onChange={(e) => handleInputChange('diastolic', e.target.value)}
              min="0"
              max="200"
            />
          </div>

          <div className="form-group">
            <label htmlFor="unit">Unit:</label>
            <input
              type="text"
              id="unit"
              value={bloodPressure.unit}
              readOnly
            />
          </div>

          <div className="button-group">
            <button className="save-button" onClick={handleSave}>
              SAVE
            </button>
            <button className="next-button" onClick={handleNext}>
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodPressure; 