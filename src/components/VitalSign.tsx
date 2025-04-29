// src/componentsapp/vitalSign.tsx
import React, { useState } from 'react';
import './VitalSign.css';
import { Link } from 'react-router-dom';
interface VitalSigns {
    bloodPressure: string;
    heartRate: string;
    respiratoryRate: string;
    oxygenSaturation: string;
    painScore: string;
    temperature: string;
}

const VitalSign: React.FC = () => {
    // Toggle sub-menu for Vital Signs in the sidebar
    const [showSubMenu, setShowSubMenu] = useState(false);

    // Vital sign data
    const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
        bloodPressure: '',
        heartRate: '',
        respiratoryRate: '',
        oxygenSaturation: '',
        painScore: '',
        temperature: '',
    });

    // Skip logic
    const [skipVitalSigns, setSkipVitalSigns] = useState(false);
    const [skipRemark, setSkipRemark] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVitalSigns((prev) => ({ ...prev, [name]: value }));
    };

    // Check if any vital sign is filled
    const hasAnyVitalSign = Object.values(vitalSigns).some((val) => val.trim());

    const handleGenerateReport = () => {
        if (!hasAnyVitalSign && !skipVitalSigns) {
            alert('No vital signs entered. Either enter details or choose to skip.');
            return;
        }
        if (skipVitalSigns && !skipRemark.trim()) {
            alert('Please provide a remark for skipping.');
            return;
        }
        // Here, you would typically send data to an API or handle it however you need
        console.log('Vital Signs:', vitalSigns);
        console.log('Skip Vital Signs:', skipVitalSigns);
        console.log('Skip Remark:', skipRemark);

        alert('Report generated successfully!');
    };

    return (
        <div className="vital-sign-page-container">
            {/* Top Header */}
            <header className="vital-sign-header">
                <div className="header-left">Menu</div>
                <div className="header-center">Jane Doe</div>
                <div className="header-right">
                    <span className="user-icon" role="img" aria-label="User">
                        👤
                    </span>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="vital-sign-main-content">
                {/* Sidebar */}
                <nav className="vital-sign-sidebar">
                    <ul>
                        <li className="menu-item">Dashboard</li>
                        <li className="menu-item" onClick={() => setShowSubMenu(!showSubMenu)}>
                            Vital Sign
                            <span className="arrow">{showSubMenu ? '▲' : '▼'}</span>
                        </li>

                        {showSubMenu && (
                            <ul className="submenu">
                                <li><Link to="/vital-signs/blood-pressure">Blood Pressure</Link></li>
                                <li><Link to="/vital-signs/heart-rate">Heart Rate</Link></li>
                                <li><Link to="/vital-signs/respiratory-rate">Respiratory Rate</Link></li>
                                <li><Link to="/vital-signs/oxygen-saturation">Oxygen Saturation</Link></li>
                                <li><Link to="/vital-signs/pain-score">Pain Score</Link></li>
                                <li><Link to="/vital-signs/temperature">Temperature</Link></li>
                            </ul>
                        )}

                    </ul>
                </nav>

                {/* Form Section */}
                <main className="vital-sign-form-section">
                    <h2>Enter Vital Signs (Optional)</h2>

                    <div className="form-group">
                        <label htmlFor="bloodPressure">Blood Pressure</label>
                        <input
                            id="bloodPressure"
                            name="bloodPressure"
                            type="text"
                            value={vitalSigns.bloodPressure}
                            onChange={handleChange}
                            placeholder="e.g. 120/80"
                            disabled={skipVitalSigns}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="heartRate">Heart Rate</label>
                        <input
                            id="heartRate"
                            name="heartRate"
                            type="text"
                            value={vitalSigns.heartRate}
                            onChange={handleChange}
                            placeholder="e.g. 70 bpm"
                            disabled={skipVitalSigns}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="respiratoryRate">Respiratory Rate</label>
                        <input
                            id="respiratoryRate"
                            name="respiratoryRate"
                            type="text"
                            value={vitalSigns.respiratoryRate}
                            onChange={handleChange}
                            placeholder="e.g. 16 breaths/min"
                            disabled={skipVitalSigns}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="oxygenSaturation">Oxygen Saturation</label>
                        <input
                            id="oxygenSaturation"
                            name="oxygenSaturation"
                            type="text"
                            value={vitalSigns.oxygenSaturation}
                            onChange={handleChange}
                            placeholder="e.g. 98%"
                            disabled={skipVitalSigns}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="painScore">Pain Score</label>
                        <input
                            id="painScore"
                            name="painScore"
                            type="text"
                            value={vitalSigns.painScore}
                            onChange={handleChange}
                            placeholder="e.g. 3/10"
                            disabled={skipVitalSigns}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="temperature">Temperature</label>
                        <input
                            id="temperature"
                            name="temperature"
                            type="text"
                            value={vitalSigns.temperature}
                            onChange={handleChange}
                            placeholder="e.g. 36.8 °C"
                            disabled={skipVitalSigns}
                        />
                    </div>

                    {/* Skip Section */}
                    <div className="skip-section">
                        <label htmlFor="skipVitalSigns" className="skip-label">
                            <input
                                id="skipVitalSigns"
                                type="checkbox"
                                checked={skipVitalSigns}
                                onChange={(e) => setSkipVitalSigns(e.target.checked)}
                            />
                            Skip Vital Signs
                        </label>
                        {skipVitalSigns && (
                            <div className="form-group">
                                <label htmlFor="skipRemark">Remark (why skipping?)</label>
                                <input
                                    id="skipRemark"
                                    name="skipRemark"
                                    type="text"
                                    value={skipRemark}
                                    onChange={(e) => setSkipRemark(e.target.value)}
                                    placeholder="Provide a reason for skipping..."
                                />
                            </div>
                        )}
                    </div>

                    <button className="generate-btn" onClick={handleGenerateReport}>
                        Generate Report
                    </button>
                </main>
            </div>
        </div>
    );
};

export default VitalSign;
