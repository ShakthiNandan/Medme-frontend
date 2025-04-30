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
import FluidColloid from './components/FluidColloid';
import FluidBloodProduct from './components/FluidBloodProduct';
import InjuriesMenu from './components/InjuriesMenu';
import OpenFracture from './components/OpenFracture';
import VitalSign from './components/VitalSign';
import HeartRate from './components/VitalSigns/HeartRate';
import RespiratoryRate from './components/VitalSigns/RespiratoryRate';
import OxygenSaturation from './components/VitalSigns/OxygenSaturation';
import PainScore from './components/VitalSigns/PainScore';
import Temperature from './components/VitalSigns/Temperature';
import IntravenousAccess from './components/IntravenousAccess';
import OxygenDelivery from './components/OxygenDelivery';
import Drugs from './components/Drugs';
import ToiletSuturing from './components/ToiletSuturing';
import Intubation from './components/Intubation';
import Procedure from './components/Procedure';
import Referral from './components/Referral';
import Layout from './components/Layout';
import { TimelineProvider } from './context/TimelineContext';

function App() {
  return (
    <Router>
      <TimelineProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
          <Route path="/app" element={<Layout />}>
            <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="patient-type" element={<PatientTypeSelection />} />
            <Route path="patient-registration" element={<PatientRegistration />} />
              <Route path="current-patient-list" element={<CurrentPatientList />} />
              <Route path="discharged-patient-list" element={<DischargedPatientList />} />
            
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

              <Route path="cpr" element={<CPRMenu />} />
              <Route path="cpr/manual" element={<ManualCPR />} />
              <Route path="cpr/manual-intubated" element={<ManualIntubated />} />
              <Route path="cpr/assisted" element={<AssistedCPR />} />
              <Route path="3dviewer" element={<ThreeDViewer selectedMenu="bio" />} />
            
              {/* Fluid Routes */}
              <Route path="fluid" element={<FluidMenu />}>
                  <Route path="crystalloid" element={<FluidCrystalloid />} />
                <Route path="colloid" element={<FluidColloid />} />
              <Route path="blood-product" element={<FluidBloodProduct />} />
            </Route>
            
              {/* Injuries Routes */}
            <Route path="injuries" element={<InjuriesMenu />}>
                  <Route path="bone/open-fracture" element={<OpenFracture />} />
                <Route path="bone/closed-fracture" element={<OpenFracture />} />
              <Route path="soft-tissue/laceration" element={<ToiletSuturing />} />
              <Route path="soft-tissue/contusion" element={<ToiletSuturing />} />
              <Route path="soft-tissue/abrasion" element={<ToiletSuturing />} />
            </Route>
            
            <Route path="vitals" element={<VitalSign />} />
            <Route path="vital-signs/blood-pressure" element={<BloodPressure />} />
            <Route path="vital-signs/heart-rate" element={<HeartRate />} />
            <Route path="vital-signs/respiratory-rate" element={<RespiratoryRate />} />
            <Route path="vital-signs/oxygen-saturation" element={<OxygenSaturation />} />
            <Route path="vital-signs/pain-score" element={<PainScore />} />
            <Route path="vital-signs/temperature" element={<Temperature />} />
            <Route path="intravenous-access" element={<IntravenousAccess />} />
            <Route path="oxygen-delivery" element={<OxygenDelivery />} />
            <Route path="drugs" element={<Drugs />} />
            <Route path="toilet-suturing" element={<ToiletSuturing />} />
            <Route path="intubation" element={<Intubation />} />
            <Route path="procedure" element={<Procedure />} />
            <Route path="referral" element={<Referral />} />
          </Route>
          </Routes>
        </div>
      </TimelineProvider>
    </Router>
  );
}

export default App;
