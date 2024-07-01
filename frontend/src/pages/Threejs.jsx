import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { MeshBasicMaterial } from "three"

function Model({ url }) {
  const { scene, nodes } = useGLTF(url);

  // Function to create a custom material for the mesh
  const createMaterial = (mesh) => {
    const geometry = mesh.geometry;
    if (geometry.attributes.color) {
      const colors = geometry.attributes.color.array;
      const material = new MeshBasicMaterial({ vertexColors: THREE.VertexColors });
      material.setValues({ colors });
      return material;
    }
    // Handle meshes without vertex colors (optional)
    return new MeshBasicMaterial({ color: 'gray' }); // Set a fallback color
  };

  // Loop through scene children and set materials
  useEffect(() => {
    const meshes = scene.children.filter((child) => child.isMesh);
    meshes.forEach((mesh) => {
      mesh.material = createMaterial(mesh);
    });
  }, [scene]);

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
          <pointLight position={[10, 10, 10]} />
          <Model url={fileUrl} />
          <OrbitControls />
        </Canvas>
      )}
    </div>
  );
}
