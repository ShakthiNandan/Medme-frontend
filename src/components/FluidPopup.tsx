// src/components/FluidMenu/FluidPopup.tsx
import React, { useState } from 'react';
import './FluidMenu.css'; // Or a separate .css for the popup

interface FluidPopupProps {
  onConfirm: (popupData: any) => void;
  onCancel: () => void;
  fluidTypeLabel: string; // e.g. "Fluid, Crystalloid"
}

const FluidPopup: React.FC<FluidPopupProps> = ({ onConfirm, onCancel, fluidTypeLabel }) => {
  const [prescribedBy, setPrescribedBy] = useState('Jane Doe'); // default current user
  const [staffCategory, setStaffCategory] = useState('');
  const [keyedInBy, setKeyedInBy] = useState('');

  const handleOkay = () => {
    const popupData = {
      prescribedBy,
      staffCategory,
      keyedInBy,
      fluidTypeLabel,
      timestamp: new Date().toISOString(),
    };
    onConfirm(popupData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>{fluidTypeLabel}</h3>
        <label>
          Prescribed By:
          <select value={prescribedBy} onChange={(e) => setPrescribedBy(e.target.value)}>
            <option value="Jane Doe">Jane Doe (current user)</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. John">Dr. John</option>
            {/* more doctors */}
          </select>
        </label>

        <label>
          Staff Category:
          <select value={staffCategory} onChange={(e) => setStaffCategory(e.target.value)}>
            <option value="">--Select--</option>
            <option value="Nurse">Nurse</option>
            <option value="Admin">Admin</option>
            {/* etc. */}
          </select>
        </label>

        <label>
          Keyed In By:
          <select value={keyedInBy} onChange={(e) => setKeyedInBy(e.target.value)}>
            <option value="">--Select--</option>
            {/* Filter names based on staffCategory in real code */}
            <option value="Nurse A">Nurse A</option>
            <option value="Nurse B">Nurse B</option>
          </select>
        </label>

        <div className="popup-buttons">
          <button onClick={handleOkay}>OKAY</button>
          <button onClick={onCancel}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default FluidPopup;
