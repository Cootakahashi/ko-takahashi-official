'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Image as DreiImage } from '@react-three/drei';
import * as THREE from 'three';

/**
 * InteractivePortrait
 * Ko Takahashi's portrait with advanced WebGL effects:
 * - Mouse-reactive displacement
 * - Glitch effect on hover
 * - Particle disintegration at edges
 */

// Vertex shader for displacement
const vertexShader = `
  varying vec2 vUv;
  varying float vDisplacement;
  
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  
  void main() {
    vUv = uv;
    
    vec3 pos = position;
    
    // Mouse-based displacement
    float dist = distance(uv, uMouse);
    float displacement = smoothstep(0.5, 0.0, dist) * 0.1 * uHover;
    pos.z += displacement;
    
    // Wave effect
    pos.z += sin(pos.x * 10.0 + uTime) * 0.01;
    pos.z += cos(pos.y * 8.0 + uTime * 0.8) * 0.01;
    
    vDisplacement = displacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment shader with glitch effect
const fragmentShader = `
  varying vec2 vUv;
  varying float vDisplacement;
  
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uGlitch;
  uniform float uHover;
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Glitch displacement
    float glitchIntensity = uGlitch * 0.03;
    if (random(vec2(floor(uTime * 20.0), 0.0)) > 0.9) {
      uv.x += (random(vec2(uTime)) - 0.5) * glitchIntensity;
    }
    
    // RGB split on hover
    float rgbSplit = uHover * 0.005;
    float r = texture2D(uTexture, uv + vec2(rgbSplit, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(rgbSplit, 0.0)).b;
    
    vec4 color = vec4(r, g, b, 1.0);
    
    // Vignette
    float vignette = 1.0 - smoothstep(0.4, 0.8, distance(vUv, vec2(0.5)));
    color.rgb *= vignette;
    
    // Add golden tint on displacement
    color.rgb += vec3(0.83, 0.69, 0.22) * vDisplacement * 2.0;
    
    gl_FragColor = color;
  }
`;

interface PortraitMeshProps {
  imageUrl: string;
}

const PortraitMesh: React.FC<PortraitMeshProps> = ({ imageUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  
  const texture = useTexture(imageUrl);
  
  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHover: { value: 0 },
    uGlitch: { value: 0 },
  }), [texture]);
  
  // Periodic glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Smooth hover transition
      const targetHover = isHovered ? 1 : 0;
      materialRef.current.uniforms.uHover.value += 
        (targetHover - materialRef.current.uniforms.uHover.value) * 0.1;
      
      // Glitch
      materialRef.current.uniforms.uGlitch.value = glitchActive ? 1 : 0;
      
      // Mouse position
      const x = (state.pointer.x + 1) / 2;
      const y = (state.pointer.y + 1) / 2;
      materialRef.current.uniforms.uMouse.value.set(x, y);
    }
    
    // Subtle floating
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02;
      meshRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <planeGeometry args={[2, 2.5, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};

/**
 * EdgeParticles - Particles that flow around the portrait edges
 */
const EdgeParticles: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 500;
  
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Start at edges of portrait
      const edge = Math.floor(Math.random() * 4);
      let x, y;
      
      switch (edge) {
        case 0: // Top
          x = (Math.random() - 0.5) * 2;
          y = 1.25;
          break;
        case 1: // Bottom
          x = (Math.random() - 0.5) * 2;
          y = -1.25;
          break;
        case 2: // Left
          x = -1;
          y = (Math.random() - 0.5) * 2.5;
          break;
        default: // Right
          x = 1;
          y = (Math.random() - 0.5) * 2.5;
          break;
      }
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.random() * 0.5;
      
      // Velocity away from center
      vel[i * 3] = x * 0.01;
      vel[i * 3 + 1] = y * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];
        
        // Reset if too far
        const dist = Math.sqrt(
          positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2
        );
        
        if (dist > 3) {
          const edge = Math.floor(Math.random() * 4);
          switch (edge) {
            case 0:
              positions[i3] = (Math.random() - 0.5) * 2;
              positions[i3 + 1] = 1.25;
              break;
            case 1:
              positions[i3] = (Math.random() - 0.5) * 2;
              positions[i3 + 1] = -1.25;
              break;
            case 2:
              positions[i3] = -1;
              positions[i3 + 1] = (Math.random() - 0.5) * 2.5;
              break;
            default:
              positions[i3] = 1;
              positions[i3 + 1] = (Math.random() - 0.5) * 2.5;
              break;
          }
          positions[i3 + 2] = 0;
        }
      }
      
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#D4AF37"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

interface InteractivePortraitProps {
  className?: string;
}

const InteractivePortrait: React.FC<InteractivePortraitProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <PortraitMesh imageUrl="/ko/takahashi-ko.jpg" />
        <EdgeParticles />
        
        {/* Ambient light */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={0.5} />
      </Canvas>
      
      {/* Frame */}
      <div className="absolute inset-0 border border-gold/20 pointer-events-none" />
      <div className="absolute -inset-2 border border-gold/10 pointer-events-none" />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/50" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/50" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/50" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/50" />
    </div>
  );
};

export default InteractivePortrait;
