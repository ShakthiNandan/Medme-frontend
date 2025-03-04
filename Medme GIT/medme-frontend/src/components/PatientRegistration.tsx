// src/components/PatientRegistration.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientRegistration.css';

interface PatientData {
  name: string;
  address: string;
  dateOfBirth: string;
  icPassport: string;
  gender: string;
  mobile: string;
  height: string;
  weight: string;
  temperature: string;
}

const PatientRegistration: React.FC = () => {
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState<PatientData>({
    name: '',
    address: '',
    dateOfBirth: '',
    icPassport: '',
    gender: '',
    mobile: '',
    height: '',
    weight: '',
    temperature: ''
  });

  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form before submitting
  const validateForm = (): boolean => {
    setError('');

    // 1. Name: mandatory, length <= 150, only alphabets (basic regex)
    if (!formData.name || formData.name.length > 150 || !/^[A-Za-z\s]+$/.test(formData.name)) {
      setError('Invalid name. Please use alphabets only (max length 150).');
      return false;
    }

    // 2. Address: mandatory, length <= 150, only alphabets (basic regex)
    if (!formData.address || formData.address.length > 150 || !/^[A-Za-z0-9\s,.-]+$/.test(formData.address)) {
      setError('Invalid address. Please use alphanumeric characters (max length 150).');
      return false;
    }

    // 3. Date of Birth: optional or mandatory? (Based on your requirement, assume optional or mandatory)
    //    If mandatory, check if it's filled:
    // if (!formData.dateOfBirth) {
    //   setError('Date of Birth is required.');
    //   return false;
    // }

    // 4. IC / Passport No.: mandatory, length 12, numeric
    if (!formData.icPassport || formData.icPassport.length !== 12 || !/^\d+$/.test(formData.icPassport)) {
      setError('IC/Passport must be 12 digits and numeric only.');
      return false;
    }

    // 5. Gender: mandatory (assuming user must select from dropdown)
    if (!formData.gender) {
      setError('Please select a gender.');
      return false;
    }

    // 6. Mobile No.: not specified as mandatory, but if present, do minimal check
    //    You can adjust validation as needed
    // if (formData.mobile && !/^\d+$/.test(formData.mobile)) {
    //   setError('Mobile number must be numeric.');
    //   return false;
    // }

    // 7. Height: optional (dropdown with autosuggestion in your real app).
    // 8. Weight: optional, 2 digit decimal
    if (formData.weight && !/^\d+(\.\d{1,2})?$/.test(formData.weight)) {
      setError('Weight must be a decimal with up to 2 digits after the decimal point.');
      return false;
    }

    // 9. Temperature: optional, 2 digit decimal
    if (formData.temperature && !/^\d+(\.\d{1,2})?$/.test(formData.temperature)) {
      setError('Temperature must be a decimal with up to 2 digits after the decimal point.');
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Example: Save to DB via your backend
      // Adjust the endpoint and payload as needed
      const response = await fetch('http://localhost:5000/api/patient/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Registration failed.');
      }

      // On success, navigate to Dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  // Handle Cancel => go back to Patient Type
  const handleCancel = () => {
    navigate('/patient-type');
  };

  // Handle Skip => also go to Dashboard
  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="patient-registration-container">
      <div className="sidebar">
        <div className="menu-icon">☰</div>
        <p className="menu-label">Menu</p>
      </div>

      <div className="registration-form-container">
        <h2 className="form-title">Patient Registration</h2>

        <form onSubmit={handleRegister} className="registration-form">
          {/* Name */}
          <label htmlFor="name">
            Name <span className="required">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Address */}
          <label htmlFor="address">
            Address <span className="required">*</span>
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          {/* Date of Birth */}
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />

          {/* IC / Passport */}
          <label htmlFor="icPassport">
            IC No. / Passport No. <span className="required">*</span>
          </label>
          <input
            type="text"
            name="icPassport"
            id="icPassport"
            value={formData.icPassport}
            onChange={handleChange}
            required
          />

          {/* Gender */}
          <label htmlFor="gender">
            Gender <span className="required">*</span>
          </label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">--Select--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            {/* You can add more options or autosuggestion logic */}
          </select>

          {/* Mobile No. */}
          <label htmlFor="mobile">Mobile No.</label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />

          {/* Height (Optional) */}
          <label htmlFor="height">Height</label>
          <input
            type="text"
            name="height"
            id="height"
            value={formData.height}
            onChange={handleChange}
          />

          {/* Weight (Optional) */}
          <label htmlFor="weight">Weight</label>
          <input
            type="text"
            name="weight"
            id="weight"
            value={formData.weight}
            onChange={handleChange}
          />

          {/* Temperature (Optional) */}
          <label htmlFor="temperature">Temperature</label>
          <input
            type="text"
            name="temperature"
            id="temperature"
            value={formData.temperature}
            onChange={handleChange}
          />

          {/* Buttons */}
          <div className="form-buttons">
            <button type="submit" className="register-button">
              REGISTER
            </button>
            <button type="button" onClick={handleCancel} className="cancel-button">
              CANCEL
            </button>
            <button type="button" onClick={handleSkip} className="skip-button">
              SKIP
            </button>
          </div>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default PatientRegistration;
