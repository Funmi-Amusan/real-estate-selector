import React, { useRef } from 'react'
import BuildingModel from './BuildingModel'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { SceneProps } from '@/lib/interfaces'

const Scene: React.FC<SceneProps> = ({
  onFloorClick,
  onFloorHover,
  selectedFloor,
  hoveredFloor
}) => {

  const controlsRef = useRef<OrbitControlsImpl | null>(null)

  // Simple tree component
  const Tree = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => (
    <group position={position} scale={scale}>
      {/* Tree trunk */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 4]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      {/* Tree foliage */}
      <mesh position={[0, 5, 0]}>
        <sphereGeometry args={[2.5]} />
        <meshStandardMaterial color="#228B22" roughness={0.7} />
      </mesh>
      {/* Additional foliage layer for more natural look */}
      <mesh position={[0, 6, 0]}>
        <sphereGeometry args={[2]} />
        <meshStandardMaterial color="#32CD32" roughness={0.6} />
      </mesh>
    </group>
  )

  const Bush = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => (
    <group position={position} scale={scale}>
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[1.2]} />
        <meshStandardMaterial color="#228B22" roughness={0.8} />
      </mesh>
    </group>
  )

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[100, 150, 80]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={200}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-bias={-0.0005}
      />

      {/* Ground/Grass */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[70, 1, 70]} />
        <meshStandardMaterial color="#4a7c59" roughness={0.9} />
      </mesh>

      {/* Sidewalk around building */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[50, 0.1, 40]} />
        <meshStandardMaterial color="#d3d3d3" roughness={0.8} />
      </mesh>

      {/* Building */}
      <BuildingModel
        onFloorClick={onFloorClick}
        onFloorHover={onFloorHover}
        selectedFloor={selectedFloor}
        hoveredFloor={hoveredFloor}
      />

      <Tree position={[-15, 0, 30]} scale={0.8} />
      <Tree position={[-10, 0, -20]} scale={1.1} />
      <Tree position={[30, 0, 20]} scale={0.7} />
      <Tree position={[-30, 0, 10]} scale={0.9} />

      <Bush position={[-30, 0, 25]} scale={0.6} />
      <Bush position={[35, 0, 30]} scale={0.8} />
      <Bush position={[-25, 0, -30]} scale={0.7} />
      <Bush position={[30, 0, -25]} scale={0.5} />

      <Bush position={[-8, 0, 20]} scale={0.4} />
      <Bush position={[8, 0, 20]} scale={0.4} />

      {/* Camera controls */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.5}
        minDistance={60}
        maxDistance={200}
        maxPolarAngle={Math.PI / 2 - 0.05}
        target={[0, 20, 0]}
      />
    </>
  )
}

export default Scene