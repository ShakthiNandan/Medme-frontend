import React, { useState } from 'react';
import './IntravenousAccess.css';

const IntravenousAccess: React.FC = () => {
  const [site, setSite] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [timestamp, setTimestamp] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('IV Site:', site);
    console.log('IV Size:', size);
    console.log('Timestamp:', timestamp);
    // TODO: Add API call to save the data
  };

  return (
    <div className="intravenous-access-container">
      <h2>Intravenous Access</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="site">IV Site</label>
          <select
            id="site"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            required
          >
            <option value="">Select a site</option>
            <option value="right-hand">Right Hand</option>
            <option value="left-hand">Left Hand</option>
            <option value="right-arm">Right Arm</option>
            <option value="left-arm">Left Arm</option>
            <option value="right-foot">Right Foot</option>
            <option value="left-foot">Left Foot</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="size">IV Size (Gauge)</label>
          <select
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          >
            <option value="">Select a size</option>
            <option value="14">14G</option>
            <option value="16">16G</option>
            <option value="18">18G</option>
            <option value="20">20G</option>
            <option value="22">22G</option>
            <option value="24">24G</option>
          </select>
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

export default IntravenousAccess; 