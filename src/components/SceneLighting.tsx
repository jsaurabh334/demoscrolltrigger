"use client";

/**
 * Lightweight scene lighting that replaces the heavy Environment preset="studio".
 * Environment loads a 2MB+ HDR cubemap texture from CDN on every single canvas mount.
 * This provides equivalent visual quality using simple analytical lights at zero network cost.
 */
export default function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-3, 4, -3]} intensity={0.6} color="#d8d83f" />
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#ffffff" distance={20} decay={2} />
    </>
  );
}
