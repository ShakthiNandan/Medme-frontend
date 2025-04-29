// src/components/FluidMenu/FluidCrystalloid.tsx
import React, { useState } from 'react';
import FluidPopup from './FluidPopup';
import './FluidMenu.css';

const FluidCrystalloid: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    fluidType: '0.33% Na Cl + 5% Dex',
    mode: 'Bolus',
    value: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.value) {
      alert('Please enter a value');
      return;
    }
    setShowPopup(true);
  };

  const handlePopupConfirm = (popupData: any) => {
    // Here you would typically send the data to your backend
    console.log('Crystalloid Saved:', { ...formData, ...popupData });
    setShowPopup(false);
    // Reset form after successful save
    setFormData({
      fluidType: '0.33% Na Cl + 5% Dex',
      mode: 'Bolus',
      value: '',
      notes: '',
    });
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="fluid-form-container">
      <h2>Crystalloid</h2>
      <form>
        <div className="fluid-item">
          <label>
            Fluid Type:
            <select name="fluidType" value={formData.fluidType} onChange={handleChange}>
              <option value="0.33% Na Cl + 5% Dex">0.33% Na Cl + 5% Dex</option>
              <option value="0.45% Na Cl">0.45% Na Cl</option>
              <option value="0.9% Na Cl">0.9% Na Cl</option>
              <option value="Ringer's Lactate">Ringer's Lactate</option>
            </select>
          </label>
        </div>

        <div className="fluid-item">
          <label>
            <input
              type="radio"
              name="mode"
              value="Bolus"
              checked={formData.mode === 'Bolus'}
              onChange={handleChange}
            />
            Bolus
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="Infusion"
              checked={formData.mode === 'Infusion'}
              onChange={handleChange}
            />
            Infusion
          </label>
        </div>

        <div className="fluid-item">
          <label>
            Value (ml/hour):
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
              min="0"
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

        <button type="button" onClick={handleSave} className="save-button">
          Save
        </button>
      </form>

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
