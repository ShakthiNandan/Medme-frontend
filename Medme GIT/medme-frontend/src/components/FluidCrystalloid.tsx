// src/components/FluidMenu/FluidCrystalloid.tsx
import React, { useState } from 'react';
import FluidPopup from './FluidPopup';

const FluidCrystalloid: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    fluidType: '0.33% Na Cl + 5% Dex', // example
    mode: 'Bolus', // Bolus or Infusion
    value: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Show popup for "Prescribed By", "Staff Category", etc.
    setShowPopup(true);
  };

  const handlePopupConfirm = (popupData: any) => {
    // Merge popup data with formData if needed
    // e.g., prescribedBy, staffCategory, keyedInBy
    // Then send to timeline or backend
    console.log('Crystalloid Saved:', { ...formData, ...popupData });
    setShowPopup(false);
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <h2>Crystalloid</h2>
      <div className="fluid-item">
        <label>
          Fluid Type:
          <select name="fluidType" value={formData.fluidType} onChange={handleChange}>
            <option value="0.33% Na Cl + 5% Dex">0.33% Na Cl + 5% Dex</option>
            <option value="0.45% Na Cl">0.45% Na Cl</option>
            {/* Add more fluid types as needed */}
          </select>
        </label>
      </div>

      <div className="fluid-item">
        <label>
          Bolus
          <input
            type="radio"
            name="mode"
            value="Bolus"
            checked={formData.mode === 'Bolus'}
            onChange={handleChange}
          />
        </label>
        <label>
          Infusion
          <input
            type="radio"
            name="mode"
            value="Infusion"
            checked={formData.mode === 'Infusion'}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="fluid-item">
        <label>
          Value (ml/hour):
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="fluid-item">
        <label>
          Notes (optional):
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </label>
      </div>

      <button onClick={handleSave} className="save-button">Save</button>

      {showPopup && (
        <FluidPopup
          onConfirm={handlePopupConfirm}
          onCancel={handlePopupCancel}
          fluidTypeLabel="Fluid, Crystalloid"
        />
      )}
    </div>
  );
};

export default FluidCrystalloid;
