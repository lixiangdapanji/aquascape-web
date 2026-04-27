"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useMemo, useRef } from "react"
import * as THREE from "three"

export interface AquaScenePlant {
  id: string
  name: string
  growthForm: string
  colorHex: string
  qty: number
}

interface Props {
  tankW: number   // cm
  tankD: number   // cm
  tankH: number   // cm
  plants: AquaScenePlant[]
}

// ---------- helpers ----------
function seededRand(seed: number) {
  let s = (seed + 1) * 2654435761
  return () => {
    s ^= s << 13; s ^= s >> 17; s ^= s << 5
    return ((s >>> 0) / 0x100000000)
  }
}

function hex2rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16)
  return [(n >> 16) / 255, ((n >> 8) & 0xff) / 255, (n & 0xff) / 255]
}

function adjustColor(hex: string, factor: number): string {
  const [r, g, b] = hex2rgb(hex)
  const f = (v: number) => Math.min(255, Math.round(v * factor * 255)).toString(16).padStart(2, "0")
  return `#${f(r)}${f(g)}${f(b)}`
}

// ---------- Leaf shape (bezier ellipse) ----------
function leafShape(len: number, wid: number): THREE.Shape {
  const s = new THREE.Shape()
  s.moveTo(0, 0)
  s.bezierCurveTo(wid * 0.8, len * 0.15, wid, len * 0.5, 0, len)
  s.bezierCurveTo(-wid, len * 0.5, -wid * 0.8, len * 0.15, 0, 0)
  return s
}

// ---------- Stem plant ----------
function StemPlant({ pos, height, color, rng }: {
  pos: [number, number, number]; height: number; color: string; rng: () => number
}) {
  const dark = adjustColor(color, 0.55)
  const light = adjustColor(color, 1.2)
  const nodeCount = Math.max(4, Math.round(height / 0.025))
  const stemRadius = 0.003
  const leafLen = height * 0.18
  const leafWid = leafLen * 0.35
  const shape = useMemo(() => leafShape(leafLen, leafWid), [leafLen, leafWid])
  const lean = (rng() - 0.5) * 0.18

  return (
    <group position={pos} rotation={[lean, rng() * Math.PI * 2, 0]}>
      {/* Stem */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[stemRadius * 0.7, stemRadius, height, 4]} />
        <meshStandardMaterial color={dark} roughness={0.85} />
      </mesh>
      {/* Leaf pairs at each node */}
      {Array.from({ length: nodeCount }, (_, i) => {
        const y = (height / nodeCount) * (i + 0.5)
        const rot = i * (Math.PI / 2.1) + rng() * 0.3
        const col = i % 2 === 0 ? color : light
        return (
          <group key={i} position={[0, y, 0]} rotation={[0, rot, 0]}>
            {([-1, 1] as const).map((side) => (
              <mesh key={side} position={[side * leafWid * 0.6, 0, 0]}
                rotation={[0.25, 0, side * 0.55]}>
                <shapeGeometry args={[shape]} />
                <meshStandardMaterial color={col} roughness={0.6} side={THREE.DoubleSide}
                  transparent opacity={0.93} />
              </mesh>
            ))}
          </group>
        )
      })}
    </group>
  )
}

// ---------- Rosette plant ----------
function RosettePlant({ pos, height, color, rng }: {
  pos: [number, number, number]; height: number; color: string; rng: () => number
}) {
  const leafCount = Math.round(7 + rng() * 4)
  const leafLen = height * 0.9
  const leafWid = leafLen * 0.22
  const shape = useMemo(() => leafShape(leafLen, leafWid), [leafLen, leafWid])
  const dark = adjustColor(color, 0.7)

  return (
    <group position={pos}>
      {Array.from({ length: leafCount }, (_, i) => {
        const angle = (i / leafCount) * Math.PI * 2 + rng() * 0.3
        const tilt = 0.35 + rng() * 0.3
        const col = i % 3 === 0 ? dark : color
        return (
          <group key={i} rotation={[0, angle, 0]}>
            <mesh position={[0, leafLen * 0.1, 0]} rotation={[tilt, 0, 0]}>
              <shapeGeometry args={[shape]} />
              <meshStandardMaterial color={col} roughness={0.62} side={THREE.DoubleSide} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

// ---------- Epiphyte (Java Fern / Anubias) ----------
function EphiphytePlant({ pos, height, color, rng }: {
  pos: [number, number, number]; height: number; color: string; rng: () => number
}) {
  const leafCount = Math.round(4 + rng() * 3)
  const leafLen = height * 0.95
  const leafWid = leafLen * 0.28
  const shape = useMemo(() => leafShape(leafLen, leafWid), [leafLen, leafWid])
  const dark = adjustColor(color, 0.6)

  return (
    <group position={pos}>
      {/* Rhizome */}
      <mesh position={[0, 0.01, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.004, 0.004, height * 0.5, 5]} />
        <meshStandardMaterial color={dark} roughness={0.9} />
      </mesh>
      {Array.from({ length: leafCount }, (_, i) => {
        const angle = (i / leafCount) * Math.PI * 1.8 - 0.4
        const tilt = -0.25 - rng() * 0.25
        return (
          <group key={i} position={[(i / leafCount - 0.5) * height * 0.4, 0.01, 0]}
            rotation={[tilt, angle, 0]}>
            <mesh>
              <shapeGeometry args={[shape]} />
              <meshStandardMaterial color={color} roughness={0.6} side={THREE.DoubleSide} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

// ---------- Carpeting grass ----------
function CarpetPatch({ pos, color, rng }: {
  pos: [number, number, number]; color: string; rng: () => number
}) {
  const bladeCount = 14
  const bladeH = 0.025 + rng() * 0.02
  const dark = adjustColor(color, 0.7)

  return (
    <group position={pos}>
      {Array.from({ length: bladeCount }, (_, i) => {
        const bx = (rng() - 0.5) * 0.035
        const bz = (rng() - 0.5) * 0.035
        const lean = (rng() - 0.5) * 0.5
        const col = rng() > 0.4 ? color : dark
        return (
          <mesh key={i} position={[bx, bladeH / 2, bz]}
            rotation={[lean, rng() * Math.PI * 2, 0]}>
            <boxGeometry args={[0.0018, bladeH, 0.0008]} />
            <meshStandardMaterial color={col} roughness={0.7} />
          </mesh>
        )
      })}
    </group>
  )
}

// ---------- Moss ----------
function MossPatch({ pos, color, rng }: {
  pos: [number, number, number]; color: string; rng: () => number
}) {
  const clumps = 18
  const dark = adjustColor(color, 0.65)
  const light = adjustColor(color, 1.15)

  return (
    <group position={pos}>
      {Array.from({ length: clumps }, (_, i) => {
        const r = rng() * 0.04
        const a = rng() * Math.PI * 2
        const h = 0.008 + rng() * 0.015
        const col = i % 3 === 0 ? light : i % 3 === 1 ? color : dark
        return (
          <mesh key={i} position={[Math.cos(a) * r, h / 2, Math.sin(a) * r]}>
            <sphereGeometry args={[0.008 + rng() * 0.006, 5, 4]} />
            <meshStandardMaterial color={col} roughness={0.85} />
          </mesh>
        )
      })}
    </group>
  )
}

// ---------- Water surface (animated) ----------
function WaterSurface({ W, D, y }: { W: number; D: number; y: number }) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.opacity = 0.18 + Math.sin(clock.elapsedTime * 0.8) * 0.03
    }
  })
  return (
    <mesh position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[W, D, 1, 1]} />
      <meshStandardMaterial ref={matRef} color="#4ab8c8" transparent opacity={0.2}
        roughness={0.05} metalness={0.1} />
    </mesh>
  )
}

// ---------- Glass tank ----------
function GlassTank({ W, H, D }: { W: number; H: number; D: number }) {
  const thickness = 0.005
  const glassMat = (
    <meshPhysicalMaterial color="#b8e4ec" transparent opacity={0.12}
      roughness={0.0} metalness={0.0} transmission={0.9} thickness={0.5} />
  )
  return (
    <group>
      {/* Front */}
      <mesh position={[0, H / 2, D / 2]}>
        <boxGeometry args={[W, H, thickness]} />{glassMat}
      </mesh>
      {/* Back */}
      <mesh position={[0, H / 2, -D / 2]}>
        <boxGeometry args={[W, H, thickness]} />{glassMat}
      </mesh>
      {/* Left */}
      <mesh position={[-W / 2, H / 2, 0]}>
        <boxGeometry args={[thickness, H, D]} />{glassMat}
      </mesh>
      {/* Right */}
      <mesh position={[W / 2, H / 2, 0]}>
        <boxGeometry args={[thickness, H, D]} />{glassMat}
      </mesh>
      {/* Bottom */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[W, thickness, D]} />
        <meshStandardMaterial color="#1a1a1a" roughness={1} />
      </mesh>
    </group>
  )
}

// ---------- Substrate ----------
function Substrate({ W, D }: { W: number; D: number }) {
  return (
    <mesh position={[0, 0.016, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[W - 0.01, D - 0.01, 20, 20]} />
      <meshStandardMaterial color="#3d2b1a" roughness={1.0} metalness={0} />
    </mesh>
  )
}

// ---------- Overhead light bar ----------
function TankLighting({ W, H, D }: { W: number; H: number; D: number }) {
  return (
    <>
      <ambientLight color="#1a3020" intensity={2.5} />
      <directionalLight
        color="#e8f5e0"
        intensity={4}
        position={[0, H * 3, D * 0.3]}
        castShadow={false}
      />
      <directionalLight color="#8fc2a0" intensity={1.5} position={[-W, H * 2, D]} />
      <pointLight color="#c8e8d0" intensity={2} position={[0, H * 1.8, 0]} distance={W * 4} />
    </>
  )
}

// ---------- Plant dispatcher ----------
function PlantInstance({ plant, pos, rng }: {
  plant: AquaScenePlant
  pos: [number, number, number]
  rng: () => number
}) {
  const base = pos[1]
  const p: [number, number, number] = [pos[0], base, pos[2]]

  switch (plant.growthForm) {
    case "stem":
      return <StemPlant pos={p} height={0.16 + rng() * 0.14} color={plant.colorHex} rng={rng} />
    case "rosette":
      return <RosettePlant pos={p} height={0.10 + rng() * 0.10} color={plant.colorHex} rng={rng} />
    case "epiphyte":
      return <EphiphytePlant pos={p} height={0.10 + rng() * 0.08} color={plant.colorHex} rng={rng} />
    case "moss":
      return <MossPatch pos={p} color={plant.colorHex} rng={rng} />
    case "carpeting":
    default:
      return <CarpetPatch pos={p} color={plant.colorHex} rng={rng} />
  }
}

// Plant zone by growth form (Z: negative=back, positive=front)
const ZONES: Record<string, [number, number]> = {
  stem:      [-0.90, -0.25],
  rosette:   [-0.30,  0.20],
  epiphyte:  [-0.75, -0.10],
  moss:      [-0.80, -0.15],
  carpeting: [ 0.05,  0.90],
  floating:  [-0.50,  0.50],
}

// ---------- Main component ----------
export function AquaScene({ tankW, tankD, tankH, plants }: Props) {
  const W = tankW / 100
  const D = tankD / 100
  const H = tankH / 100
  const SUBSTRATE_Y = 0.018

  const plantInstances = useMemo(() => {
    const instances: { plant: AquaScenePlant; pos: [number, number, number]; seed: number }[] = []
    let globalSeed = 1

    for (const plant of plants) {
      const zone = ZONES[plant.growthForm] ?? ZONES.stem!
      const count =
        plant.growthForm === "carpeting" ? Math.min(plant.qty * 6, 24)
        : plant.growthForm === "moss"    ? Math.min(plant.qty * 5, 18)
        : Math.min(plant.qty * 2, 8)

      const rng = seededRand(globalSeed++)
      for (let i = 0; i < count; i++) {
        const xFrac = (rng() * 2 - 1) * 0.85
        const zNorm = zone[0]! + (zone[1]! - zone[0]!) * rng()
        instances.push({
          plant,
          pos: [xFrac * W * 0.46, SUBSTRATE_Y, zNorm * D * 0.46],
          seed: Math.floor(rng() * 99999),
        })
      }
    }
    return instances
  }, [plants, W, D])

  const camZ = Math.max(W, D) * 1.7
  const camY = H * 1.4
  const waterY = H * 0.93

  return (
    <Canvas
      shadows={false}
      camera={{ position: [0, camY, camZ], fov: 38 }}
      style={{ background: "linear-gradient(180deg, #020e08 0%, #071912 100%)" }}
    >
      <TankLighting W={W} H={H} D={D} />
      <GlassTank W={W} H={H} D={D} />
      <Substrate W={W} D={D} />
      <WaterSurface W={W} D={D} y={waterY} />

      {plantInstances.map(({ plant, pos, seed }, i) => {
        const rng = seededRand(seed + i)
        return <PlantInstance key={`${plant.id}-${i}`} plant={plant} pos={pos} rng={rng} />
      })}

      <OrbitControls
        makeDefault
        enablePan={false}
        target={[0, H * 0.35, 0]}
        minDistance={Math.max(W, D) * 0.8}
        maxDistance={Math.max(W, D) * 3.5}
        minPolarAngle={Math.PI * 0.12}
        maxPolarAngle={Math.PI * 0.72}
      />
      <Environment preset="forest" />
    </Canvas>
  )
}
