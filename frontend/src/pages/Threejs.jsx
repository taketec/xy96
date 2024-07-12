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

  return (
    <div style={{ height: '100vh' }}>
      <input type="file" accept=".glb" onChange={handleFileChange} />
      {fileUrl && (
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[-10, 10, 10]} intensity={1} />
          <directionalLight position={[10, -10, 10]} intensity={1} />
          <directionalLight position={[10, 10, -10]} intensity={1} />
          <directionalLight position={[-10, -10, 10]} intensity={1} />
          <directionalLight position={[-10, 10, -10]} intensity={1} />    
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <Model url={fileUrl} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      )}
    </div>
  );
}
