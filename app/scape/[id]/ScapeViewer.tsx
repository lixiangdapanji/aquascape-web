'use client';

import { Canvas } from '@react-three/fiber';
import { Lighting, Tank, WaterVolume } from '@aquascape/render';

/**
 * Client-only wrapper for the 3D canvas.
 *
 * Keeps the React Three Fiber tree out of the RSC boundary — @react-three/fiber
 * relies on a DOM and a WebGL context, both unavailable at server render time.
 *
 * The scene itself is currently the Phase-1 primitives exported from
 * @aquascape/render (Tank, Lighting, WaterVolume). The full <Aquarium>
 * composition will drop in here once render-agent publishes it.
 */
export function ScapeViewer() {
  const tankSizeCm: [number, number, number] = [60, 30, 36];

  return (
    <div className="aspect-video w-full bg-ink-900">
      <Canvas
        camera={{ position: [60, 40, 70], fov: 35 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0A1F18']} />
        <Lighting sizeCm={tankSizeCm} />
        <Tank sizeCm={tankSizeCm} />
        <WaterVolume sizeCm={tankSizeCm} />
      </Canvas>
    </div>
  );
}
