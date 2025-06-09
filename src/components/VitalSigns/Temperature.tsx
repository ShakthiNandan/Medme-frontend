import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Temperature.css';
import { useTimeline } from '../../context/TimelineContext';

const staffCategories = [
  { label: 'Consultant C', value: 'Consultant C' },
  { label: 'Specialist S', value: 'Specialist S' },
  { label: 'Medical Officer M', value: 'Medical Officer M' },
  { label: 'House Office H', value: 'House Office H' },
  { label: 'Assistant Medical Officer AMO', value: 'Assistant Medical Officer AMO' },
  { label: 'Nurse N', value: 'Nurse N' },
  { label: 'Attendant A', value: 'Attendant A' },
];

const staffByCategory: Record<string, string[]> = {
  'Consultant C': ['Dr. Alice', 'Dr. Bob'],
  'Specialist S': ['Dr. Carol', 'Dr. Dave'],
  'Medical Officer M': ['Dr. Eve', 'Dr. Frank'],
  'House Office H': ['Dr. Grace', 'Dr. Heidi'],
  'Assistant Medical Officer AMO': ['AMO Ivan', 'AMO Judy'],
  'Nurse N': ['Nurse Kim', 'Nurse Leo'],
  'Attendant A': ['Attendant Max', 'Attendant Nina'],
};

const currentUser = 'Default (User)';

const Temperature: React.FC = () => {
  const navigate = useNavigate();
  const [temperature, setTemperature] = useState<string>('0');
  const [showPopup, setShowPopup] = useState(false);

  // Popup state
  const [prescribedBy, setPrescribedBy] = useState(currentUser);
  const [staffCategory, setStaffCategory] = useState('');
  const [keyedInBy, setKeyedInBy] = useState('');
  const [keyedInBySearch, setKeyedInBySearch] = useState('');

  const { addEntry } = useTimeline();

  const handleInputChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      const numValue = parseFloat(value);
      if (value === '' || (numValue >= 0 && numValue <= 42)) {
        setTemperature(value);
      }
    }
  };

  const handleSave = () => {
    setShowPopup(true);
  };

  const handlePopupSave = () => {
    const now = new Date();
    const timelineEntry = {
      type: 'Temperature',
      value: temperature,
      unit: 'Celsius',
      prescribedBy,
      staffCategory,
      keyedInBy,
      timestamp: now.toISOString()
    };
    addEntry(timelineEntry);
    setShowPopup(false);
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
  };

  const handlePrev = () => {
    navigate('/vital-signs/pain-score');
  };

  const filteredStaff =
    staffCategory && keyedInBySearch
      ? staffByCategory[staffCategory]?.filter((name) =>
          name.toLowerCase().includes(keyedInBySearch.toLowerCase())
        )
      : staffByCategory[staffCategory] || [];

  return (
    <div className="temperature-container">
      <div className="temperature-card">
        <h2 className="temperature-title">
          Temperature <span className="info-icon">ⓘ</span>
        </h2>

        <div className="form-group">
          <label htmlFor="temperature">Value:</label>
          <input
            type="number"
            id="temperature"
            value={temperature}
            onChange={(e) => handleInputChange(e.target.value)}
            min="0"
            max="42"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label>Unit:</label>
          <div className="unit-display">Celsius</div>
        </div>

        <div className="button-group">
          <button className="prev-button" onClick={handlePrev}>
            PREV
          </button>
          <button className="save-button" onClick={handleSave}>
            SAVE
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Prescribed By</h3>
            <select
              value={prescribedBy}
              onChange={(e) => setPrescribedBy(e.target.value)}
            >
              <option value={currentUser}>{currentUser}</option>
              <option value="Dr. Alice">Dr. Alice</option>
              <option value="Dr. Bob">Dr. Bob</option>
            </select>

            <h3>Staff Category</h3>
            <select
              value={staffCategory}
              onChange={(e) => {
                setStaffCategory(e.target.value);
                setKeyedInBy('');
                setKeyedInBySearch('');
              }}
            >
              <option value="">Select</option>
              {staffCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            <h3>Keyed In By</h3>
            <input
              type="text"
              placeholder="Type to search..."
              value={keyedInBySearch}
              onChange={(e) => setKeyedInBySearch(e.target.value)}
              disabled={!staffCategory}
            />
            <select
              value={keyedInBy}
              onChange={(e) => setKeyedInBy(e.target.value)}
              disabled={!staffCategory}
            >
              <option value="">Select</option>
              {filteredStaff.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <div className="popup-buttons">
              <button className="save-button" onClick={handlePopupSave}>
                SAVE
              </button>
              <button className="cancel-button" onClick={handlePopupCancel}>
                CANCEL
              </button>
              <button className="close-button" onClick={handlePopupCancel}>
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Temperature; 