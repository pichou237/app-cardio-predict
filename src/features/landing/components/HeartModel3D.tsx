
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, useGLTF } from "@react-three/drei";
import { Group } from "three";
import * as THREE from "three";

// Fonction pour créer une géométrie de cœur plus réaliste
function createHeartShape() {
  const heartShape = new THREE.Shape();
  
  heartShape.moveTo(0, 0);
  heartShape.bezierCurveTo(0, -0.5, -1, -1.5, -3, 0);
  heartShape.bezierCurveTo(-4, 1, -4, 2, -4, 3);
  heartShape.bezierCurveTo(-4, 4, -3, 5, 0, 7);
  heartShape.bezierCurveTo(3, 5, 4, 4, 4, 3);
  heartShape.bezierCurveTo(4, 2, 4, 1, 3, 0);
  heartShape.bezierCurveTo(1, -1.5, 0, -0.5, 0, 0);

  return heartShape;
}

// Composant pour le modèle 3D du cœur
function Heart({ heartPulse, hovering }: { heartPulse: boolean, hovering: boolean }) {
  const heartRef = useRef<Group>(null);
  const scale = useRef(1);
  
  // Création de la géométrie du cœur
  const heartShape = createHeartShape();
  const extrudeSettings = {
    depth: 1.5,
    bevelEnabled: true,
    bevelSegments: 5,
    bevelThickness: 0.5,
    bevelSize: 0.5,
    curveSegments: 32
  };
  
  // Animation du battement cardiaque
  useFrame((state) => {
    if (heartRef.current) {
      const t = state.clock.getElapsedTime();
      
      if (heartPulse) {
        // Animation de pulsation
        scale.current = 1 + Math.sin(t * 4) * 0.05;
        heartRef.current.scale.set(scale.current, scale.current, scale.current);
      } else if (hovering) {
        // Animation légère lorsqu'on survole
        heartRef.current.rotation.y += 0.01;
      } else {
        // Rotation lente
        heartRef.current.rotation.y += 0.001;
      }
    }
  });

  return (
    <group ref={heartRef}>
      <mesh castShadow>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <meshPhysicalMaterial 
          color="#e74c3c" 
          roughness={0.3} 
          metalness={0.1} 
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          emissive="#ff0000"
          emissiveIntensity={heartPulse ? 0.3 : 0.1}
        />
      </mesh>
    </group>
  );
}

// Composant principal qui englobe le canvas Three.js
const HeartModel3D: React.FC = () => {
  const [heartPulse, setHeartPulse] = useState(true);
  const [hovering, setHovering] = useState(false);

  return (
    <div 
      className="relative h-[350px] w-full rounded-lg overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 10], fov: 45 }} 
        onClick={() => setHeartPulse(!heartPulse)}
      >
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} color="#ff8080" intensity={0.5} />
        <Heart heartPulse={heartPulse} hovering={hovering} />
        <ContactShadows
          position={[0, -3.5, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={4.5}
        />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          enableDamping
          dampingFactor={0.1}
        />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 px-4 py-2 rounded-md text-sm font-medium text-gray-800">
        Cliquez pour {heartPulse ? 'arrêter' : 'démarrer'} le battement
      </div>
    </div>
  );
};

export default HeartModel3D;
