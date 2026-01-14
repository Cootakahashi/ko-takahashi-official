import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Beyond the Script - Cinematic Hero Background
 * 夜明けの空と温かみのあるパーティクル
 * フィルムグレインとドキュメンタリー風の演出
 */

// 夜明けの星空と温かい光のパーティクル
const DawnParticles = () => {
  const ref = useRef<THREE.Points>(null!);
  const count = 3000;
  
  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    // 温かい色のパレット（夜明け）
    const warmColors = [
      new THREE.Color('#FFE4B5'), // Moccasin - 柔らかいオレンジ
      new THREE.Color('#FFA07A'), // Light Salmon - 夜明けのピンク
      new THREE.Color('#87CEEB'), // Sky Blue - 空の青
      new THREE.Color('#FFEFD5'), // Papaya Whip - 温かいクリーム
      new THREE.Color('#E6E6FA'), // Lavender - 静かな紫
    ];

    for (let i = 0; i < count; i++) {
      // 広がりのある球状分布（空のような広がり）
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 5 + Math.random() * 15;
      
      // 上半分に集中（空のイメージ）
      const y = Math.abs(Math.cos(phi)) * radius;
      
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      pos[i * 3 + 1] = y - 3; // 少し下げて視界の中に
      pos[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius - 5;

      // 温かい色をランダムに
      const color = warmColors[Math.floor(Math.random() * warmColors.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      // 様々なサイズ
      siz[i] = Math.random() * 0.04 + 0.01;
    }
    
    return [pos, col, siz];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (ref.current) {
      // ゆっくりと回転（瞬きのような動き）
      ref.current.rotation.y = t * 0.02;
      
      // ゆっくり呼吸するような動き
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // 小さな揺らぎ
        positions[i3 + 1] += Math.sin(t + i * 0.01) * 0.001;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} sizes={sizes}>
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
};

// 静かに流れる雲のようなパーティクル
const FloatingDust = () => {
  const ref = useRef<THREE.Points>(null!);
  const count = 500;
  
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 8 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    
    return [pos];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // ゆっくり左から右へ流れる
        positions[i3] += 0.005;
        if (positions[i3] > 10) positions[i3] = -10;
        
        // 小さな上下の揺らぎ
        positions[i3 + 1] += Math.sin(t * 0.5 + i) * 0.002;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        color="#FFF8DC" // Cornsilk - 温かい白
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
};

// マウスパララックス
const CameraRig = () => {
  useFrame((state) => {
    const x = state.pointer.x * 0.3;
    const y = state.pointer.y * 0.2;
    
    state.camera.position.x += (x - state.camera.position.x) * 0.02;
    state.camera.position.y += (y + 1 - state.camera.position.y) * 0.02;
    
    state.camera.lookAt(0, 0, -5);
  });
  return null;
};

/**
 * Hero3D - Beyond the Script
 * シネマティックな夜明けの背景
 */
const Hero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* グラデーション背景（夜明けの空） */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #533483 80%, #e94560 95%, #ff6b6b 100%)',
          opacity: 0.7
        }}
      />
      
      <Canvas
        camera={{ position: [0, 1, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <fog attach="fog" args={['#1a1a2e', 10, 30]} />
        
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
          <DawnParticles />
        </Float>
        
        <FloatingDust />
        <CameraRig />
        
        {/* 温かいアンビエントライト */}
        <ambientLight intensity={0.3} color="#FFF8DC" />
      </Canvas>
      
      {/* フィルムグレイン */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"
        }}
      />
      
      {/* ビネット（フィルム風の周辺減光） */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
        }}
      />
    </div>
  );
};

export default Hero3D;