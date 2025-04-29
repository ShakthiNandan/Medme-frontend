import React, { useState } from 'react';
import './ToiletSuturing.css';

const ToiletSuturing: React.FC = () => {
  const [woundLocation, setWoundLocation] = useState<string>('');
  const [woundType, setWoundType] = useState<string>('');
  const [sutureType, setSutureType] = useState<string>('');
  const [timestamp, setTimestamp] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Wound Location:', woundLocation);
    console.log('Wound Type:', woundType);
    console.log('Suture Type:', sutureType);
    console.log('Timestamp:', timestamp);
    // TODO: Add API call to save the data
  };

  return (
    <div className="toilet-suturing-container">
      <h2>Wound Toilet and Suturing</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="woundLocation">Wound Location</label>
          <input
            type="text"
            id="woundLocation"
            value={woundLocation}
            onChange={(e) => setWoundLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="woundType">Wound Type</label>
          <select
            id="woundType"
            value={woundType}
            onChange={(e) => setWoundType(e.target.value)}
            required
          >
            <option value="">Select wound type</option>
            <option value="laceration">Laceration</option>
            <option value="incision">Incision</option>
            <option value="puncture">Puncture</option>
            <option value="abrasion">Abrasion</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="sutureType">Suture Type</label>
          <select
            id="sutureType"
            value={sutureType}
            onChange={(e) => setSutureType(e.target.value)}
            required
          >
            <option value="">Select suture type</option>
            <option value="nylon">Nylon</option>
            <option value="vicryl">Vicryl</option>
            <option value="monocryl">Monocryl</option>
            <option value="prolene">Prolene</option>
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

export default ToiletSuturing; 