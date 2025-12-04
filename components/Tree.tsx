import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

const GOLD_COLOR = new THREE.Color("#FFD700");
const EMERALD_COLOR = new THREE.Color("#002815"); // Deep, dark emerald

const TreeLayer = ({ position, scale, rotationSpeed = 0.2 }: { position: [number, number, number], scale: number, rotationSpeed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
      <coneGeometry args={[1, 1.5, 7]} /> {/* 7 segments for a stylized, geometric look */}
      <meshStandardMaterial 
        color={EMERALD_COLOR}
        roughness={0.15}
        metalness={0.4}
        emissive={EMERALD_COLOR}
        emissiveIntensity={0.2}
      />
      {/* Gold Trim/Wireframe overlay for luxury feel */}
      <lineSegments>
        <wireframeGeometry args={[new THREE.ConeGeometry(1, 1.5, 7)]} />
        <lineBasicMaterial color={GOLD_COLOR} opacity={0.3} transparent />
      </lineSegments>
    </mesh>
  );
};

const Ornaments = () => {
  const count = 40;
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      // Spiral distribution
      const t = i / count; 
      const angle = t * Math.PI * 12; // 6 turns
      const radius = 0.2 + (1 - t) * 1.5; // Wider at bottom
      const y = -1.5 + t * 3.5; // Height spread
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      pos.push({ position: [x, y, z], scale: Math.random() * 0.1 + 0.05 });
    }
    return pos;
  }, []);

  return (
    <Instances range={count}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color={GOLD_COLOR} 
        roughness={0.1} 
        metalness={1} 
        envMapIntensity={2}
      />
      {positions.map((data, i) => (
        <Instance key={i} position={data.position as [number, number, number]} scale={data.scale} />
      ))}
    </Instances>
  );
}

const Star = () => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <group position={[0, 2.8, 0]} ref={ref}>
       <mesh>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFD700" 
          emissiveIntensity={2} 
          toneMapped={false} 
        />
      </mesh>
      <pointLight color="#FFD700" intensity={2} distance={5} decay={2} />
    </group>
  );
};

export const Tree = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation for the whole tree
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1 - 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Tree Layers */}
      <TreeLayer position={[0, 0.5, 0]} scale={1.2} rotationSpeed={0.1} />
      <TreeLayer position={[0, -0.5, 0]} scale={1.6} rotationSpeed={-0.1} />
      <TreeLayer position={[0, -1.5, 0]} scale={2.0} rotationSpeed={0.1} />
      <TreeLayer position={[0, 1.5, 0]} scale={0.8} rotationSpeed={-0.15} />

      {/* Decorations */}
      <group rotation={[0, 0, 0]}>
         <Ornaments />
      </group>
      
      {/* Topper */}
      <Star />

      {/* Ambient floating dust - Gold */}
      <Sparkles 
        count={50} 
        scale={6} 
        size={4} 
        speed={0.4} 
        opacity={0.5} 
        color="#FFD700"
      />
       {/* Ambient floating dust - Emerald */}
       <Sparkles 
        count={30} 
        scale={5} 
        size={2} 
        speed={0.2} 
        opacity={0.3} 
        color="#00ff88"
      />
    </group>
  );
};
