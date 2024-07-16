import React, { useState, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url }) {
  const { scene } = useGLTF(url);

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.vertexColors = true;
    }
  });

  return <primitive object={scene} />;
}

export default function Threejs() {
  const [fileUrl, setFileUrl] = useState(null);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  }, []);

  const dist = 1;

  return (
    <div className="bg-gray-800 h-full w-full flex items-center justify-center overflow-hidden">
      {!fileUrl && (
        <input
          className="w-full h-12 bg-gray-700 text-white"
          type="file"
          accept=".glb"
          onChange={handleFileChange}
        />
      )}
      {fileUrl && (
        <Canvas
          className="bg-gray-800"
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[dist, dist, dist]} intensity={1} />
          <directionalLight position={[-dist, dist, dist]} intensity={1} />
          <directionalLight position={[dist, -dist, dist]} intensity={1} />
          <directionalLight position={[-dist, -dist, dist]} intensity={1} />
          <directionalLight position={[dist, dist, -dist]} intensity={1} />
          <directionalLight position={[-dist, dist, -dist]} intensity={1} />
          <directionalLight position={[dist, -dist, -dist]} intensity={1} />
          <directionalLight position={[-dist, -dist, -dist]} intensity={1} />
          <Suspense fallback={null}>
            <Model url={fileUrl} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      )}
    </div>
  );
}
