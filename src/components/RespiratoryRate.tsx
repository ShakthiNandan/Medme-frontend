import React, { useState } from 'react';
import './RespiratoryRate.css';

const RespiratoryRate: React.FC = () => {
  const [respiratoryRate, setRespiratoryRate] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Respiratory Rate:', respiratoryRate);
    console.log('Timestamp:', timestamp);
    // TODO: Add API call to save the data
  };

  return (
    <div className="respiratory-rate-container">
      <h2>Respiratory Rate Measurement</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="respiratoryRate">Respiratory Rate (breaths/min)</label>
          <input
            type="number"
            id="respiratoryRate"
            value={respiratoryRate}
            onChange={(e) => setRespiratoryRate(Number(e.target.value))}
            required
            min="0"
            max="60"
          />
        </div>
        <div className="form-group">
          <label htmlFor="timestamp">Timestamp</label>
          <input
            type="datetime-local"
            id="timestamp"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RespiratoryRate; 