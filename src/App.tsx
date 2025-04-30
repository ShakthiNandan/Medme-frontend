// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import './App.css';
import PatientTypeSelection from './components/PatientTypeSelection';
import PatientRegistration from './components/PatientRegistration';
import CurrentPatientList from './components/CurrentPatientList';
import DischargedPatientList from './components/DischargedPatientList';
import Dashboard from './components/Dashboard';
import VitalSigns from './components/VitalSigns/VitalSigns';
import BloodPressure from './components/VitalSigns/BloodPressure';
import AssistedCPR from './components/AssistedCPR';
import ManualCPR from './components/ManualCPR';
import ManualIntubated from './components/ManualIntubated';
import CPRMenu from './components/CPRMenu';
import ThreeDViewer from './components/ThreeDViewer';
import FluidMenu from './components/FluidMenu';
import FluidCrystalloid from './components/FluidCrystalloid';
import InjuriesMenu from './components/InjuriesMenu';
import OpenFracture from './components/OpenFracture';
import HeartRate from './components/VitalSigns/HeartRate';
import RespiratoryRate from './components/VitalSigns/RespiratoryRate';
import OxygenSaturation from './components/VitalSigns/OxygenSaturation';
import PainScore from './components/VitalSigns/PainScore';
import Temperature from './components/VitalSigns/Temperature';
import { TimelineProvider } from './context/TimelineContext';

function App() {
  return (
    <Router>
      <TimelineProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/patient-type" element={<PatientTypeSelection />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patient-registration" element={<PatientRegistration />} />
            <Route path="/current-patient-list" element={<CurrentPatientList />} />
            <Route path="/discharged-patient-list" element={<DischargedPatientList />} />
            
            {/* Vital Signs Routes */}
            <Route path="/vital-signs" element={<VitalSigns />}>
              <Route index element={<BloodPressure />} />
              <Route path="blood-pressure" element={<BloodPressure />} />
              <Route path="heart-rate" element={<HeartRate />} />
              <Route path="respiratory-rate" element={<RespiratoryRate />} />
              <Route path="oxygen-saturation" element={<OxygenSaturation />} />
              <Route path="pain-score" element={<PainScore />} />
              <Route path="temperature" element={<Temperature />} />
            </Route>

            <Route path="/cprmenu" element={<CPRMenu />} />
            <Route path="/cpr/assisted" element={<AssistedCPR />} />
            <Route path="/cpr/manual" element={<ManualCPR />} />
            <Route path="/cpr/manual-intubated" element={<ManualIntubated />} />
            <Route path="/3dviewer" element={<ThreeDViewer />} />

            {/* ✅ Fix for Nested Routes */}
            <Route path="/fluid" element={<FluidMenu />}>
              <Route index element={<FluidMenu />} />
              <Route path="crystalloid" element={<FluidCrystalloid />} />
            </Route>

            <Route path="/injuries" element={<InjuriesMenu />}>
              <Route index element={<InjuriesMenu />} />
              <Route path="bone/open-fracture" element={<OpenFracture />} />
            </Route>
          </Routes>
        </div>
      </TimelineProvider>
    </Router>
  );
}

export default App;
