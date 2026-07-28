"use client";

import { useRef, useMemo, useEffect } from "react";
import { Float, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

interface AbstractKeyboardProps {
  scale?: [number, number, number];
  chassisColor?: string;
  accentColor?: string;
  metalness?: number;
  roughness?: number;
  rotation?: [number, number, number];
  floatSpeed?: number;
  floatIntensity?: number;
}

const KEY_COUNT = 60;
const COLS = 15;
const COL_SPACING = 0.75;
const ROW_SPACING = 0.8;
const APPNITY = "APPNITY";
const APPNITY_ROW = 1;
const APPNITY_COL_START = 4;

// Shared geometry — computed once, reused across all instances
const keyGeometry = new THREE.BoxGeometry(0.58, 0.28, 0.58);
keyGeometry.translate(0, 0.14, 0); // Lift pivot to bottom face

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

export default function AbstractKeyboard({
  scale = [1.2, 1.2, 1.2],
  chassisColor = "#050505",
  accentColor = "#d8d83f",
  metalness = 0.8,
  roughness = 0.1,
  rotation = [0, 0, 0],
  floatSpeed = 2,
  floatIntensity = 0.5,
}: AbstractKeyboardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Pre-compute key metadata once
  const keyData = useMemo(() => {
    const data: {
      row: number;
      col: number;
      isAppnity: boolean;
      char: string | null;
      targetX: number;
      targetZ: number;
    }[] = [];

    for (let i = 0; i < KEY_COUNT; i++) {
      const row = Math.floor(i / COLS);
      const col = i % COLS;
      const isAppnity = row === APPNITY_ROW && col >= APPNITY_COL_START && col < APPNITY_COL_START + APPNITY.length;
      const char = isAppnity ? APPNITY[col - APPNITY_COL_START] : null;

      data.push({
        row,
        col,
        isAppnity,
        char,
        targetX: -5.5 + col * COL_SPACING,
        targetZ: -1.5 + row * ROW_SPACING,
      });
    }
    return data;
  }, []);

  // Place all keys at their final resting positions immediately
  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < KEY_COUNT; i++) {
      const k = keyData[i];
      tempObject.position.set(k.targetX, 0, k.targetZ);
      tempObject.scale.set(1, 1, 1);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    // Apply per-instance colors
    for (let i = 0; i < KEY_COUNT; i++) {
      const k = keyData[i];
      if (k.isAppnity) {
        tempColor.set(accentColor);
      } else {
        tempColor.set("#1a1a1a");
      }
      meshRef.current.setColorAt(i, tempColor);
    }
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [keyData, accentColor]);

  // APPNITY character labels
  const appnityChars = useMemo(() => {
    return keyData
      .filter((k) => k.isAppnity && k.char)
      .map((k) => ({
        char: k.char!,
        position: [k.targetX, 0.3, k.targetZ] as [number, number, number],
      }));
  }, [keyData]);

  return (
    <group ref={groupRef} scale={scale} rotation={rotation}>
      <Float speed={floatSpeed} rotationIntensity={0.4} floatIntensity={floatIntensity}>
        {/* Chassis — single mesh */}
        <RoundedBox args={[12, 0.5, 4]} radius={0.1} smoothness={2} position={[0, -0.25, 0]}>
          <meshStandardMaterial color={chassisColor} roughness={roughness} metalness={metalness} />
        </RoundedBox>

        {/* Glass Plate — simplified material */}
        <RoundedBox args={[11.8, 0.08, 3.8]} radius={0.05} smoothness={2} position={[0, 0.02, 0]}>
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.85}
            opacity={1}
            metalness={0.1}
            roughness={0.05}
            ior={1.5}
            thickness={0.3}
            transparent
          />
        </RoundedBox>

        {/* All 60 Keys — ONE single draw call via InstancedMesh */}
        <instancedMesh
          ref={meshRef}
          args={[keyGeometry, undefined, KEY_COUNT]}
          frustumCulled={false}
        >
          <meshStandardMaterial
            vertexColors
            roughness={0.35}
            metalness={0.5}
          />
        </instancedMesh>

        {/* APPNITY Text Labels — only 7 tiny Text meshes */}
        {appnityChars.map((item, idx) => (
          <Text
            key={idx}
            position={item.position}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.22}
            color={accentColor}
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            {item.char}
          </Text>
        ))}
      </Float>
    </group>
  );
}
