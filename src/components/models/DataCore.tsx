"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

type DataCoreProps = {
  status: string;
};

export default function DataCore({ status }: DataCoreProps) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  // Target values based on status
  const targetValues = useMemo(() => {
    switch (status) {
      case "INPUT_ACTIVE":
        return {
          speed: 2.0,
          distort: 0.4,
          color: new THREE.Color("#d8d83f"), // Accent yellow
          scale: 1.1,
        };
      case "TRANSMITTING...":
        return {
          speed: 8.0,
          distort: 0.8,
          color: new THREE.Color("#ffffff"), // Bright white
          scale: 0.9,
        };
      case "TRANSMISSION_SUCCESS":
        return {
          speed: 0.5,
          distort: 0.0,
          color: new THREE.Color("#4ade80"), // Green
          scale: 1.3,
        };
      case "AWAITING_INPUT":
      default:
        return {
          speed: 0.5,
          distort: 0.2,
          color: new THREE.Color("#333333"), // Dark gray
          scale: 1.0,
        };
    }
  }, [status]);

  useFrame((state, delta) => {
    if (outerRef.current && innerRef.current && materialRef.current) {
      // Smoothly interpolate rotation speed
      outerRef.current.rotation.x += delta * targetValues.speed * 0.5;
      outerRef.current.rotation.y += delta * targetValues.speed;
      
      innerRef.current.rotation.x -= delta * targetValues.speed;
      innerRef.current.rotation.y -= delta * targetValues.speed * 0.8;

      // Smoothly interpolate scale
      outerRef.current.scale.lerp(new THREE.Vector3(targetValues.scale, targetValues.scale, targetValues.scale), 0.1);
      innerRef.current.scale.lerp(new THREE.Vector3(targetValues.scale * 0.8, targetValues.scale * 0.8, targetValues.scale * 0.8), 0.1);

      // Smoothly interpolate material properties
      if ('distort' in materialRef.current) {
        (materialRef.current as any).distort = THREE.MathUtils.lerp((materialRef.current as any).distort, targetValues.distort, 0.1);
      }
      materialRef.current.color.lerp(targetValues.color, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Inner Core */}
        <Sphere ref={innerRef} args={[1.5, 32, 32]}>
          <MeshDistortMaterial
            ref={materialRef}
            color="#333333"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            distort={0.2}
            speed={2}
          />
        </Sphere>
        
        {/* Outer Wireframe */}
        <Icosahedron ref={outerRef} args={[2, 1]}>
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
        </Icosahedron>

        {/* Dynamic Point Light */}
        <pointLight 
          position={[0, 0, 0]} 
          intensity={status === "TRANSMITTING..." ? 5 : 2} 
          distance={10} 
          color={targetValues.color} 
        />
      </group>
    </Float>
  );
}
