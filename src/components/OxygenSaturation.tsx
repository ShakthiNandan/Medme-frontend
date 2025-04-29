import React, { useState } from 'react';
import './OxygenSaturation.css';

const OxygenSaturation: React.FC = () => {
  const [oxygenSaturation, setOxygenSaturation] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Oxygen Saturation:', oxygenSaturation);
    console.log('Timestamp:', timestamp);
    // TODO: Add API call to save the data
  };

  return (
    <div className="oxygen-saturation-container">
      <h2>Oxygen Saturation Measurement</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="oxygenSaturation">Oxygen Saturation (%)</label>
          <input
            type="number"
            id="oxygenSaturation"
            value={oxygenSaturation}
            onChange={(e) => setOxygenSaturation(Number(e.target.value))}
            required
            min="0"
            max="100"
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

export default OxygenSaturation; 