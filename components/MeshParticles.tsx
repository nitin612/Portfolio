"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MeshParticlesProps {
  hovered: boolean;
}

const vertexShader = `
uniform float uTime;
varying vec3 vPos;

void main() {
  vec3 pos = position;
  vPos = pos;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  
  // Base point size based on depth - slightly smaller for sharper, distinct particles
  gl_PointSize = 45.0 / -mvPosition.z;
  
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
uniform float uOpacity;
varying vec3 vPos;

void main() {
  // Circular points
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r = dot(cxy, cxy);
  if (r > 1.0) discard;
  
  // Softer edges
  float alpha = (1.0 - r) * uOpacity;
  
  // Gradient from Green (top-left) to Blue (bottom-right)
  vec3 colorGreen = vec3(0.2, 0.9, 0.5);
  vec3 colorBlue = vec3(0.1, 0.4, 0.9);
  vec3 colorCyan = vec3(0.2, 0.7, 0.8);
  
  // x-y direction gives a diagonal gradient
  float mixVal = smoothstep(-15.0, 15.0, vPos.x - vPos.y);
  vec3 baseColor = mix(colorGreen, colorBlue, mixVal);
  
  // Add some cyan highlights near the center
  float distToCenter = length(vPos);
  float centerHighlight = smoothstep(12.0, 0.0, distToCenter);
  vec3 finalColor = mix(baseColor, colorCyan, centerHighlight * 0.3);
  
  // Dim outer rings slightly compared to inner core
  float fadeOut = smoothstep(25.0, 15.0, distToCenter);
  finalColor = finalColor * (0.6 + 0.4 * fadeOut);
  
  gl_FragColor = vec4(finalColor, alpha);
}
`;

const ParticleGrid = ({ hovered }: { hovered: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const [positions] = useMemo(() => {
    const particles = [];
    const count = 45000; 
    
    // 60% in the central sphere
    const sphereCount = Math.floor(count * 0.6);
    const sphereRadius = 13;
    for (let i = 0; i < sphereCount; i++) {
        // Combination of thick shell and solid volume for depth
        let r;
        if (Math.random() > 0.4) {
            // Shell
            r = sphereRadius * (0.9 + 0.1 * Math.random());
        } else {
            // Volume
            r = sphereRadius * Math.cbrt(Math.random());
        }
        
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        
        particles.push(x, y, z);
    }

    // 40% in distinct rings
    const ringCount = count - sphereCount;
    const rings = [
        { r: 16.5, w: 0.2 },
        { r: 18.0, w: 0.1 },
        { r: 21.0, w: 0.5 },
        { r: 24.5, w: 0.8 },
        { r: 26.0, w: 0.2 }
    ];
    
    for(let i = 0; i < ringCount; i++) {
        const ring = rings[Math.floor(Math.random() * rings.length)];
        const r = ring.r + (Math.random() - 0.5) * ring.w;
        const theta = Math.random() * 2 * Math.PI;
        
        const x = r * Math.cos(theta);
        // Rings are mostly flat but with slight vertical variance
        const y = (Math.random() - 0.5) * 0.3; 
        const z = r * Math.sin(theta);
        
        particles.push(x, y, z);
    }
    
    return [new Float32Array(particles)];
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uOpacity: { value: 0.8 }
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    
    if (pointsRef.current) {
      // Tilt the entire system to see rings at an angle
      pointsRef.current.rotation.x = Math.PI * 0.15; 
      
      // Slowly rotate the sphere around its Y axis
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }

    const targetZ = hovered ? 35 : 45; 
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, (state.pointer.x * 2), 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, (state.pointer.y * 2), 0.05);
    state.camera.lookAt(0, 0, 0); 
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export function MeshParticles({ hovered }: MeshParticlesProps) {
  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 48], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ParticleGrid hovered={hovered} />
      </Canvas>
    </div>
  );
}
