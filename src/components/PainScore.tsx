import React, { useState } from 'react';
import './PainScore.css';

const PainScore: React.FC = () => {
  const [painScore, setPainScore] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Pain Score:', painScore);
    console.log('Timestamp:', timestamp);
    // TODO: Add API call to save the data
  };

  return (
    <div className="pain-score-container">
      <h2>Pain Score Measurement</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="painScore">Pain Score (0-10)</label>
          <input
            type="number"
            id="painScore"
            value={painScore}
            onChange={(e) => setPainScore(Number(e.target.value))}
            required
            min="0"
            max="10"
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

export default PainScore; 