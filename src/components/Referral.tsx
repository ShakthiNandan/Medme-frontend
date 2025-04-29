import React, { useState } from 'react';
import './Referral.css';

const Referral: React.FC = () => {
  const [referralType, setReferralType] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [reason, setReason] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API call to save referral data
    console.log({ referralType, specialty, reason, timestamp });
  };

  return (
    <div className="referral-container">
      <h2>Referral Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="referralType">Referral Type</label>
          <select
            id="referralType"
            value={referralType}
            onChange={(e) => setReferralType(e.target.value)}
            required
          >
            <option value="">Select Referral Type</option>
            <option value="emergency">Emergency</option>
            <option value="urgent">Urgent</option>
            <option value="routine">Routine</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="specialty">Specialty</label>
          <select
            id="specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
          >
            <option value="">Select Specialty</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="surgery">Surgery</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason for Referral</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
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

        <button type="submit">Submit Referral</button>
      </form>
    </div>
  );
};

export default Referral; 