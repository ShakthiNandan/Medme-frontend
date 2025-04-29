// src/components/PointMarker.tsx
import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  label: string;
  coords: [number, number, number];
  tooltipData: any;
}

const PointMarker: React.FC<Props> = ({ label, coords, tooltipData }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      position={new THREE.Vector3(...coords)}
      onPointerOver={(e) => {
        e.stopPropagation(); // Prevent hover events from propagating to parent elements
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      <sphereGeometry args={[0.03, 16, 16]} />
      <meshStandardMaterial color={hovered ? 'yellow' : 'red'} />
      <Html center>
        <div className="marker-label">
          {hovered
            ? tooltipData.photo
              ? (
                <div>
                  <img src={tooltipData.photo} alt="" width={40} />
                  <br />
                  {tooltipData.name}
                </div>
              )
              : JSON.stringify(tooltipData)
            : label
          }
        </div>
      </Html>
    </mesh>
  );
};

export default PointMarker;
