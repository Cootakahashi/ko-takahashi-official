import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * AccretionDisk Component
 * Generates a high-density spiral of particles resembling a black hole's accretion disk or a galaxy core.
 * Uses logarithmic spiral math for natural flow.
 */
const AccretionDisk = () => {
  const ref = useRef<THREE.Points>(null!);
  
  // High particle count but lightweight (Points)
  const count = 8000;
  
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const centerColor = new THREE.Color('#FFF5E1'); // Bright white-gold center
    const midColor = new THREE.Color('#D4AF37');    // Pure Gold
    const outerColor = new THREE.Color('#8A6000');  // Dark Gold/Bronze
    const voidColor = new THREE.Color('#050505');   // Deep Space Black

    for (let i = 0; i < count; i++) {
      // Distribution: More particles near center, fading out
      const r = Math.random();
      const radius = (Math.pow(r, 3) * 8) + 0.5; // Exponential distribution for core density

      // Spiral Angle
      const branchAngle = (i % 3) * ((Math.PI * 2) / 3); // 3 arms
      const spinAngle = radius * 0.8;
      
      // Random spread
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (radius * 0.3);
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (radius * 0.1); // Flat disk
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (radius * 0.3);

      const x = Math.cos(branchAngle + spinAngle) * radius + randomX;
      const y = randomY;
      const z = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color Logic based on distance
      const color = new THREE.Color();
      if (radius < 2) {
        color.copy(centerColor).lerp(midColor, radius / 2);
      } else {
        color.copy(midColor).lerp(outerColor, (radius - 2) / 6);
      }
      
      // Random sparkles
      if (Math.random() > 0.98) color.setHex(0xffffff);

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Size logic: Center particles are smaller/denser, outer are larger dust
      sizes[i] = Math.random() < 0.1 ? 0.03 : 0.015;
    }
    return [positions, colors, sizes];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      // Slow, majestic rotation
      ref.current.rotation.y = t * 0.08;
      // Subtle tilt breathing
      ref.current.rotation.z = Math.sin(t * 0.1) * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} sizes={sizes} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
};

/**
 * BackgroundStars Component
 * Static background stars to provide depth and parallax context.
 */
const BackgroundStars = () => {
  const ref = useRef<THREE.Points>(null!);
  const count = 2000;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for(let i=0; i<count; i++) {
      // Sphere distribution
      const r = 20 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i*3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i*3+2] = r * Math.cos(phi);
      
      // Blue-ish stars for background contrast against Gold foreground
      const starColor = new THREE.Color().setHSL(0.6, 0.5, Math.random());
      colors[i*3] = starColor.r;
      colors[i*3+1] = starColor.g;
      colors[i*3+2] = starColor.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    // Very slow background rotation
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

const CameraRig = () => {
  useFrame((state) => {
    // Mouse Parallax: Inverse movement for depth feeling
    const x = state.pointer.x * 0.3;
    const y = state.pointer.y * 0.3;
    
    // Smooth Lerp
    state.camera.position.x += (x - state.camera.position.x) * 0.02;
    state.camera.position.y += (y + 2 - state.camera.position.y) * 0.02; // Keep camera slightly elevated (+2)
    
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

const Hero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#020202]">
      <Canvas
        camera={{ position: [0, 2, 7], fov: 40 }}
        dpr={[1, 2]} // Limit DPR to 2 for performance on 4k screens
        gl={{ 
          antialias: false, // Disable MSAA for performance (particles look fine without it)
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <fog attach="fog" args={['#020202', 5, 20]} />
        
        {/* Floating motion for the whole system */}
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          <AccretionDisk />
        </Float>
        
        <BackgroundStars />
        <CameraRig />
      </Canvas>
      
      {/* Cinematic Vignette Overlay (CSS) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_120%)] pointer-events-none opacity-90" />
      
      {/* Noise Texture for Film Grain */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

export default Hero3D;