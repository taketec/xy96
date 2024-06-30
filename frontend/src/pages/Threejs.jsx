import React, { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function Threejs() {
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Enable vertex colors on the material
        child.material.vertexColors = THREE.VertexColors;
      }
    });
  }, [scene]);

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
          <pointLight position={[10, 10, 10]} />
            <Model url={fileUrl} />
          <OrbitControls />
        </Canvas>
      )}
    </div>
  );
}
