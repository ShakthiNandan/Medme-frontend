// src/components/ThreeDViewer.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './ThreeDViewer.css';

const ThreeDViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current; // Copy ref for cleanup

    const { clientWidth, clientHeight } = container;

    // Create Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, clientWidth / clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(clientWidth, clientHeight);
    container.appendChild(renderer.domElement);

    // Add lighting
    scene.add(new THREE.AmbientLight(0x404040, 2));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);
    scene.add(new THREE.PointLight(0xffffff, 1.5, 50, 2));

    // Raycaster and Mouse Setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let model: THREE.Group | null = null;
    let previousHoveredPart: THREE.Object3D | null = null;
    let rotateModel = false;
    const keys = { w: false, a: false, s: false, d: false, z: false, x: false };
    const speed = 0.1;

    // Mapping of body part names to descriptions
    const bodyPartDescriptions: { [key: string]: string } = {
      Head: "The head contains the brain, eyes, ears, nose, and mouth.",
      LeftArm: "The left arm includes the upper arm, forearm, and hand.",
      RightArm: "The right arm includes the upper arm, forearm, and hand.",
      Torso: "The torso houses the heart, lungs, and other vital organs.",
      LeftLeg: "The left leg supports the body and aids movement.",
      RightLeg: "The right leg supports the body and aids movement.",
      // Add more mappings based on your 3D model
    };

    // Load 3D model
    const loader = new GLTFLoader();
    loader.load(
      '/static/human_body.gltf',
      (gltf) => {
        model = gltf.scene;
        model.scale.set(1, 1, 1);
        scene.add(model);
        animate();
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    );

    // Set Camera Position
    camera.position.set(0, 1, 5);

    // Resize Handling
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key in keys) keys[event.key as keyof typeof keys] = true;
      if (event.key === 't') camera.position.y += 0.1;
      if (event.key === 'g') camera.position.y -= 0.1;
      if (event.key === 'p') rotateModel = !rotateModel;
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key in keys) keys[event.key as keyof typeof keys] = false;
    };

    const updateCameraPosition = () => {
      if (keys.w) camera.position.z -= speed;
      if (keys.s) camera.position.z += speed;
      if (keys.a) camera.position.x -= speed;
      if (keys.d) camera.position.x += speed;
    };

    // Mouse Move Handling (Detect Hovered Part)
    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const highlightHoveredPart = () => {
      if (!model) return;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(model.children, true);

      if (previousHoveredPart && previousHoveredPart instanceof THREE.Mesh) {
        previousHoveredPart.material.color.setHex(previousHoveredPart.userData.originalColor || 0xffffff);
        previousHoveredPart = null;
      }

      if (intersects.length > 0) {
        const intersected = intersects[0].object;
        if (intersected instanceof THREE.Mesh) {
          if (!intersected.userData.originalColor) {
            intersected.userData.originalColor = intersected.material.color.getHex();
          }
          intersected.material.color.set(0xff0000);
          previousHoveredPart = intersected;

          const description = bodyPartDescriptions[intersected.name] || `Hovered over: ${intersected.name || 'Unknown'}`;
          setHoveredPart(description); // Update state with hovered part description
        }
      } else {
        setHoveredPart(null); // Reset description when not hovering over anything
      }
    };

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      updateCameraPosition();
      highlightHoveredPart();
      renderer.render(scene, camera);
    };

    // Attach Event Listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('mousemove', onMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('mousemove', onMouseMove);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* 3D Model Viewer */}
      <div className="hover-info-box">
        {hoveredPart ? <p>{hoveredPart}</p> : <p>Hover over a body part...</p>}
      </div>
      <div ref={containerRef} className="three-d-viewer-container" />

      {/* Separate Hovered Part Description Box */}
      
    </>
  );
};

export default ThreeDViewer;
