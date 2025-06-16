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

  return (
    <>
      {/* ...  lighting setup ... */}
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

      {/* Building */}
      <BuildingModel
        onFloorClick={onFloorClick}
        onFloorHover={onFloorHover}
        selectedFloor={selectedFloor}
        hoveredFloor={hoveredFloor}
      />

      {/* Camera controls */}
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={false} // Kept your original settings
        enableRotate={false} // Kept your original settings
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

export default Scene;