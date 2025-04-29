import React, { useState } from 'react';
import './OxygenDelivery.css';

const OxygenDelivery: React.FC = () => {
  const [method, setMethod] = useState<string>('');
  const [flowRate, setFlowRate] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Oxygen Delivery Method:', method);
    console.log('Flow Rate:', flowRate);
    console.log('Timestamp:', timestamp);
    // TODO: Add API call to save the data
  };

  return (
    <div className="oxygen-delivery-container">
      <h2>Oxygen Delivery</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="method">Delivery Method</label>
          <select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            required
          >
            <option value="">Select a method</option>
            <option value="nasal-cannula">Nasal Cannula</option>
            <option value="simple-mask">Simple Mask</option>
            <option value="venturi-mask">Venturi Mask</option>
            <option value="non-rebreather">Non-Rebreather Mask</option>
            <option value="high-flow">High Flow Nasal Cannula</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="flowRate">Flow Rate (L/min)</label>
          <input
            type="number"
            id="flowRate"
            value={flowRate}
            onChange={(e) => setFlowRate(Number(e.target.value))}
            required
            min="0"
            max="60"
            step="0.5"
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

export default OxygenDelivery; 