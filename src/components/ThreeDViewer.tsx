/** @jsxImportSource react */
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { getMarkersByMenu } from '../utils/getMarkerByMenu';
import './ThreeDViewer.css';

// Types
interface Marker {
  id: string;
  label: string;
  coords: [number, number, number];
  tooltipData: any;
  color?: string;
}

interface TooltipProps {
  data: any;
  position: [number, number, number];
}

interface HistoricalData {
  id: string;
  type: string;
  date: string;
  location: string;
}

// Mock data
const mockPatientData = {
  name: 'John Doe',
  age: 45,
  gender: 'Male',
  photo: 'https://via.placeholder.com/150',
  height: '175cm',
  weight: '80kg',
  bloodType: 'O+'
};

const mockEmergencyData = {
  fractures: [
    { id: 'f1', location: 'Right Arm', severity: 3, timestamp: '2024-03-15T10:30:00' },
    { id: 'f2', location: 'Left Leg', severity: 2, timestamp: '2024-03-15T10:45:00' }
  ],
  painScore: 7,
  injuries: [
    { id: 'i1', location: 'Chest', type: 'Contusion', severity: 2, timestamp: '2024-03-15T10:20:00' }
  ]
};

const mockVitalsData = {
  heartRate: { value: 72, unit: 'bpm', timestamp: '2024-03-15T11:00:00' },
  respiratoryRate: { value: 16, unit: 'breaths/min', timestamp: '2024-03-15T11:00:00' },
  temperature: { value: 37.0, unit: '°C', timestamp: '2024-03-15T11:00:00' },
  oxygenSaturation: { value: 98, unit: '%', timestamp: '2024-03-15T11:00:00' }
};

const mockHistoricalData: HistoricalData[] = [
  { id: 'h1', type: 'X-Ray', date: '2024-03-10', location: 'Chest' },
  { id: 'h2', type: 'MRI', date: '2024-03-12', location: 'Head' },
  { id: 'h3', type: 'Blood Test', date: '2024-03-14', location: 'Arm' }
];

// Marker coordinates (relative to the model)
const markerCoordinates = {
  bio: [
    { id: 'head', label: 'Head', coords: [0, 1.8, 0] as [number, number, number] },
    { id: 'torso', label: 'Torso', coords: [0, 1.2, 0] as [number, number, number] },
    { id: 'legs', label: 'Legs', coords: [0, 0.6, 0] as [number, number, number] }
  ],
  emergencies: [
    { id: 'f1', label: 'Fracture', coords: [0.5, 1.4, 0] as [number, number, number] },
    { id: 'f2', label: 'Fracture', coords: [-0.5, 0.7, 0] as [number, number, number] },
    { id: 'i1', label: 'Injury', coords: [0, 1.2, 0.2] as [number, number, number] }
  ],
  vitals: [
    { id: 'hr', label: 'Heart Rate', coords: [0, 1.3, 0.1] as [number, number, number] },
    { id: 'rr', label: 'Respiratory', coords: [0, 1.3, -0.1] as [number, number, number] },
    { id: 'temp', label: 'Temperature', coords: [0, 1.8, 0.1] as [number, number, number] },
    { id: 'spo2', label: 'O2 Sat', coords: [0.5, 1.4, 0] as [number, number, number] }
  ],
  historical: [
    { id: 'h1', label: 'X-Ray', coords: [0.3, 1.2, 0.2] as [number, number, number] },
    { id: 'h2', label: 'MRI', coords: [0, 1.8, 0.2] as [number, number, number] },
    { id: 'h3', label: 'Blood Test', coords: [0.5, 1.4, 0.1] as [number, number, number] }
  ]
};

// Tooltip component
const Tooltip: React.FC<TooltipProps> = ({ data, position }) => {
  return (
    <Html position={position} center>
      <div className="tooltip">
        {data.photo && <img src={data.photo} alt="Patient" style={{ width: '50px', height: '50px' }} />}
        <h4>{data.name || data.label}</h4>
        {data.age && <p>Age: {data.age}</p>}
        {data.severity && <p>Severity: {data.severity}/10</p>}
        {data.value && <p>{data.value} {data.unit}</p>}
        {data.timestamp && <p>{new Date(data.timestamp).toLocaleString()}</p>}
      </div>
    </Html>
  );
};

// Marker component
const Marker: React.FC<{ marker: Marker; onHover: (marker: Marker | null) => void }> = ({ 
  marker, 
  onHover 
}) => {
  return (
    <mesh
      position={marker.coords}
      onPointerOver={() => onHover(marker)}
      onPointerOut={() => onHover(null)}
    >
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color={marker.color || '#ff0000'} />
      <Html center>
        <div className="marker-label">{marker.label}</div>
      </Html>
    </mesh>
  );
};

// Main component
interface ThreeDViewerProps {
  selectedMenu?: 'bio' | 'emergencies' | 'vitals' | 'historical';
}

const ThreeDViewer: React.FC<ThreeDViewerProps> = ({ selectedMenu = 'bio' }) => {
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<Marker | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    // Load 3D model
    const loader = new GLTFLoader();
    loader.load(
      '/static/human_body.gltf',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(.25, .25, 0.25);
        setModel(model);
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    );
  }, []);

  useEffect(() => {
    // Update markers based on selected menu
    // We're now going to use our external getMarkersByMenu function
    // but will apply any additional data processing if needed
    const fetchedMarkers = getMarkersByMenu(selectedMenu);
    
    // Add IDs if they don't exist
    const markersWithIds = fetchedMarkers.map((marker, index) => ({
      ...marker,
      id: marker.id || `marker-${index}`
    }));
    
    setMarkers(markersWithIds);
  }, [selectedMenu]);

  return (
    <div className="three-d-viewer-container">
      <Canvas camera={{ position: [0, 1.5, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        
        {model && <primitive object={model} />}
        
        {markers.map(marker => (
          <Marker
            key={marker.id}
            marker={marker}
            onHover={setHoveredMarker}
          />
        ))}
        
        {hoveredMarker && (
          <Tooltip
            data={hoveredMarker.tooltipData}
            position={hoveredMarker.coords}
          />
        )}
      </Canvas>
    </div>
  );
};

export default ThreeDViewer;
