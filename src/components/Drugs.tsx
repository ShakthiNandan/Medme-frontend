import React, { useState } from 'react';
import './Drugs.css';

const Drugs: React.FC = () => {
  const [drugName, setDrugName] = useState<string>('');
  const [dose, setDose] = useState<number>(0);
  const [route, setRoute] = useState<string>('');
  const [timestamp, setTimestamp] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Drug Name:', drugName);
    console.log('Dose:', dose);
    console.log('Route:', route);
    console.log('Timestamp:', timestamp);
    // TODO: Add API call to save the data
  };

  return (
    <div className="drugs-container">
      <h2>Drug Administration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="drugName">Drug Name</label>
          <input
            type="text"
            id="drugName"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dose">Dose (mg)</label>
          <input
            type="number"
            id="dose"
            value={dose}
            onChange={(e) => setDose(Number(e.target.value))}
            required
            min="0"
            step="0.1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="route">Route</label>
          <select
            id="route"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            required
          >
            <option value="">Select a route</option>
            <option value="oral">Oral</option>
            <option value="iv">Intravenous</option>
            <option value="im">Intramuscular</option>
            <option value="sc">Subcutaneous</option>
            <option value="inhaled">Inhaled</option>
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

export default Drugs; 