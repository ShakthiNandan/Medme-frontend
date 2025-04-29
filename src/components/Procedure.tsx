import React, { useState } from 'react';
import './Procedure.css';

const Procedure: React.FC = () => {
  const [procedureType, setProcedureType] = useState('');
  const [description, setDescription] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API call to save procedure data
    console.log({ procedureType, description, timestamp });
  };

  return (
    <div className="procedure-container">
      <h2>Procedure Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="procedureType">Procedure Type</label>
          <select
            id="procedureType"
            value={procedureType}
            onChange={(e) => setProcedureType(e.target.value)}
            required
          >
            <option value="">Select Procedure Type</option>
            <option value="central_line">Central Line</option>
            <option value="arterial_line">Arterial Line</option>
            <option value="chest_tube">Chest Tube</option>
            <option value="lumbar_puncture">Lumbar Puncture</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
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

        <button type="submit">Save Procedure</button>
      </form>
    </div>
  );
};

export default Procedure; 