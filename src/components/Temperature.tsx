import React, { useState } from 'react';
import './Temperature.css';

const Temperature: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Temperature:', temperature);
    console.log('Timestamp:', timestamp);
    // TODO: Add API call to save the data
  };

  return (
    <div className="temperature-container">
      <h2>Temperature Measurement</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="temperature">Temperature (°C)</label>
          <input
            type="number"
            id="temperature"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            required
            min="30"
            max="45"
            step="0.1"
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

export default Temperature; 