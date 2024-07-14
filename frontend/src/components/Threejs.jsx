import React, { useState, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url }) {
  const { scene } = useGLTF(url);

  // Traverse the scene to update materials to use vertex colors
  scene.traverse((child) => {
    console.log(child)
    if (child instanceof THREE.Mesh) {
      child.material.vertexColors = true;
    }
  });

  return <primitive object={scene} />;
}

export default function App() {
  const [fileUrl, setFileUrl] = useState(null);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  }, []);
  const dist = 1
  return (
    <div className="h-screen bg-gray-800">
      <input type="file" accept=".glb" onChange={handleFileChange} />
      {fileUrl && (
        <Canvas className="bg-gray-800">
          <ambientLight intensity={0.5} />
          <directionalLight position={[dist, dist, dist]} intensity={1} />
          <directionalLight position={[-dist, dist, dist]} intensity={1} />
          <directionalLight position={[dist, -dist, dist]} intensity={1} />
          <directionalLight position={[-dist, -dist, dist]} intensity={1} />
          <directionalLight position={[dist, dist, -dist]} intensity={1} />
          <directionalLight position={[-dist, dist, -dist]} intensity={1} />
          <directionalLight position={[dist, -dist, -dist]} intensity={1} />
          <directionalLight position={[-dist, -dist, -dist]} intensity={1} /> 
          {/* <pointLight position={[0, 0, 0]} intensity={50} /> */}
          <Suspense fallback={null}>
            <Model url={fileUrl} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      )}
    </div>
  );
}
