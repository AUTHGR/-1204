import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { Tree } from './Tree';

export const Scene = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#050a07]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: false, toneMappingExposure: 1.5 }}>
        <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={45} />
        
        <color attach="background" args={['#020604']} />
        
        {/* Cinematic Lighting Setup */}
        <ambientLight intensity={0.2} color="#004225" />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2} 
          castShadow 
          color="#FFD700" 
        />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00ff88" />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />

        <Suspense fallback={null}>
            <Tree />
            <Environment preset="city" />
            <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
        </Suspense>

        <OrbitControls 
          enablePan={false} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 1.8}
          minDistance={4}
          maxDistance={12}
          autoRotate
          autoRotateSpeed={0.5}
        />

        {/* Post Processing for the "Arix Signature" Look */}
        <EffectComposer enableNormalPass={false}>
            <Bloom 
                luminanceThreshold={1.1} 
                mipmapBlur 
                intensity={1.2} 
                radius={0.7}
            />
            <Bloom 
                luminanceThreshold={0.5} 
                mipmapBlur 
                intensity={0.4} 
                radius={0.4} 
                color="#FFD700" // Gold bloom tint
            />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};