
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

// Définir un composant pour le modèle 3D du cœur
function Heart({ heartPulse }: { heartPulse: boolean }) {
  const heartRef = useRef<THREE.Mesh>(null);
  
  // Animation du battement cardiaque
  useFrame((state) => {
    if (heartRef.current && heartPulse) {
      const t = state.clock.getElapsedTime();
      heartRef.current.scale.x = 1 + Math.sin(t * 2) * 0.05;
      heartRef.current.scale.y = 1 + Math.sin(t * 2) * 0.05;
      heartRef.current.scale.z = 1 + Math.sin(t * 2) * 0.05;
    }
  });

  // On utilise une forme géométrique simple pour représenter le cœur
  return (
    <mesh
      ref={heartRef}
      rotation={[0, heartPulse ? state => Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2 : 0, 0]}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#e74c3c" roughness={0.4} metalness={0.3} />
    </mesh>
  );
}

// Composant principal qui englobe le canvas Three.js
const HeartModel3D: React.FC = () => {
  const [heartPulse, setHeartPulse] = React.useState(true);

  return (
    <div className="h-[300px] w-full rounded-lg overflow-hidden cursor-pointer">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }} onClick={() => setHeartPulse(!heartPulse)}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Heart heartPulse={heartPulse} />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={5}
          blur={2}
          far={4.5}
        />
        <OrbitControls enableZoom={false} />
      </Canvas>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/80 px-3 py-1 rounded-md text-xs text-gray-700">
        Cliquez pour {heartPulse ? 'arrêter' : 'démarrer'} le battement
      </div>
    </div>
  );
};

export default HeartModel3D;
