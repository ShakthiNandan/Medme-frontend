import * as THREE from 'three';
import { Object3DNode } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Html } from '@react-three/drei';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Three.js elements
      mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      sphereGeometry: Object3DNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>;
      meshBasicMaterial: Object3DNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>;
      ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      pointLight: Object3DNode<THREE.PointLight, typeof THREE.PointLight>;
      primitive: Object3DNode<THREE.Object3D, typeof THREE.Object3D>;
      group: Object3DNode<THREE.Group, typeof THREE.Group>;
      perspectiveCamera: Object3DNode<THREE.PerspectiveCamera, typeof THREE.PerspectiveCamera>;
    }
  }
}

declare module '@react-three/drei' {
  export const Html: React.FC<{
    center?: boolean;
    position?: [number, number, number];
    children?: React.ReactNode;
  }>;
  
  export const OrbitControls: React.FC<{
    enableDamping?: boolean;
    dampingFactor?: number;
    rotateSpeed?: number;
    minPolarAngle?: number;
    maxPolarAngle?: number;
  }>;
}

declare module '@react-three/fiber' {
  export interface ThreeElements {
    mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
    sphereGeometry: Object3DNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>;
    meshBasicMaterial: Object3DNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>;
    ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
    pointLight: Object3DNode<THREE.PointLight, typeof THREE.PointLight>;
    primitive: Object3DNode<THREE.Object3D, typeof THREE.Object3D>;
    group: Object3DNode<THREE.Group, typeof THREE.Group>;
    perspectiveCamera: Object3DNode<THREE.PerspectiveCamera, typeof THREE.PerspectiveCamera>;
  }
} 