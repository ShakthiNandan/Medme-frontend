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
import AssistedCPR from './components/AssistedCPR';
import ManualCPR from './components/ManualCPR';
import ManualIntubated from './components/ManualIntubated';
import CPRMenu from './components/CPRMenu';
import ThreeDViewer from './components/ThreeDViewer';
import FluidMenu from './components/FluidMenu';
import FluidCrystalloid from './components/FluidCrystalloid';
import InjuriesMenu from './components/InjuriesMenu';
import OpenFracture from './components/OpenFracture';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/patient-type" element={<PatientTypeSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patient-registration" element={<PatientRegistration />} />
          <Route path="/current-patient-list" element={<CurrentPatientList />} />
          <Route path="/discharged-patient-list" element={<DischargedPatientList />} />
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
    </Router>
  );
}

export default App;
