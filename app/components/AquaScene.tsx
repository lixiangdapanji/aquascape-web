"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { PlantedTank, Lighting, WaterVolume } from "@aquascape-studio/render"
import type { PlantEntry } from "@aquascape-studio/render"
import { useMemo } from "react"

// Growth-form to plant zone (Z axis: negative = back, positive = front)
const ZONE: Record<string, { zRange: [number, number]; yHeight: (h: number) => number }> = {
  stem:      { zRange: [-0.9, -0.3], yHeight: (d) => 0.18 + d * 0.15 },
  rosette:   { zRange: [-0.3,  0.2], yHeight: (d) => 0.12 + d * 0.08 },
  epiphyte:  { zRange: [-0.7, -0.1], yHeight: (d) => 0.13 + d * 0.06 },
  moss:      { zRange: [-0.8, -0.2], yHeight: (d) => 0.05 + d * 0.03 },
  carpeting: { zRange: [ 0.1,  0.9], yHeight: ()  => 0.035 },
  floating:  { zRange: [-0.5,  0.5], yHeight: ()  => 0.035 },
  rhizome:   { zRange: [-0.6,  0.0], yHeight: (d) => 0.10 + d * 0.05 },
}

export interface AquaScenePlant {
  id: string
  name: string
  growthForm: string
  colorHex: string
  qty: number
}

interface Props {
  tankW: number  // cm
  tankD: number  // cm
  tankH: number  // cm
  plants: AquaScenePlant[]
}

function seededRand(seed: number) {
  let s = seed
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff }
}

export function AquaScene({ tankW, tankD, tankH, plants }: Props) {
  const W = tankW / 100  // metres
  const D = tankD / 100
  const H = tankH / 100
  const SUBSTRATE_Y = 0.03

  const plantEntries = useMemo<PlantEntry[]>(() => {
    const entries: PlantEntry[] = []
    let seedBase = 42
    for (const plant of plants) {
      const zone = ZONE[plant.growthForm] ?? ZONE.stem!
      const count = plant.growthForm === "carpeting" ? Math.min(plant.qty * 5, 15)
                  : plant.growthForm === "moss"      ? Math.min(plant.qty * 4, 10)
                  : Math.min(plant.qty * 2, 6)
      const rng = seededRand(seedBase++)
      for (let i = 0; i < count; i++) {
        const t = rng()
        const xFrac = rng() * 2 - 1          // -1..1
        const zFrac = zone.zRange[0]! + (zone.zRange[1]! - zone.zRange[0]!) * t
        const x = xFrac * (W * 0.44)
        const z = zFrac * (D * 0.44)
        const h = zone.yHeight(rng())
        entries.push({ position: [x, SUBSTRATE_Y, z], height: h, color: plant.colorHex })
      }
    }
    return entries
  }, [plants, W, D]) // eslint-disable-line react-hooks/exhaustive-deps

  // Camera distance scales with tank size
  const camDist = Math.max(W, D, H) * 2.8
  const sizeCm: [number, number, number] = [tankW, tankD, tankH]

  return (
    <Canvas
      camera={{ position: [camDist * 0.55, camDist * 0.45, camDist * 0.75], fov: 32 }}
      style={{ background: "#071912" }}
    >
      <color attach="background" args={["#071912"]} />
      <Lighting sizeCm={sizeCm} />
      <WaterVolume sizeCm={sizeCm} />
      <PlantedTank width={W} height={H} depth={D} plants={plantEntries} />
      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={camDist * 0.5}
        maxDistance={camDist * 2}
        target={[0, H * 0.4, 0]}
      />
    </Canvas>
  )
}
