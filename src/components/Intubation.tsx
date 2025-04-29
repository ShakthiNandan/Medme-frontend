import React, { useState } from 'react';
import './Intubation.css';

const Intubation: React.FC = () => {
  const [tubeSize, setTubeSize] = useState<string>('');
  const [depth, setDepth] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tube Size:', tubeSize);
    console.log('Depth:', depth);
    console.log('Timestamp:', timestamp);
    // TODO: Add API call to save the data
  };

  return (
    <div className="intubation-container">
      <h2>Intubation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tubeSize">Tube Size (mm)</label>
          <select
            id="tubeSize"
            value={tubeSize}
            onChange={(e) => setTubeSize(e.target.value)}
            required
          >
            <option value="">Select tube size</option>
            <option value="6.0">6.0</option>
            <option value="6.5">6.5</option>
            <option value="7.0">7.0</option>
            <option value="7.5">7.5</option>
            <option value="8.0">8.0</option>
            <option value="8.5">8.5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="depth">Depth (cm)</label>
          <input
            type="number"
            id="depth"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            required
            min="15"
            max="30"
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

export default Intubation; 