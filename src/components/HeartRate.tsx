import React, { useState } from 'react';
import './HeartRate.css';

const HeartRate: React.FC = () => {
  const [heartRate, setHeartRate] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Heart Rate:', heartRate);
    console.log('Timestamp:', timestamp);
    // TODO: Add API call to save the data
  };

  return (
    <div className="heart-rate-container">
      <h2>Heart Rate Measurement</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="heartRate">Heart Rate (BPM)</label>
          <input
            type="number"
            id="heartRate"
            value={heartRate}
            onChange={(e) => setHeartRate(Number(e.target.value))}
            required
            min="0"
            max="300"
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

export default HeartRate; 