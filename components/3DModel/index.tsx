"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import * as THREE from "three"
import LoadingScreen from "./LoadingScreen"
import Scene from "./Scene"
import FloorModal from './FloorModal'
import { Floor } from "@/lib/interfaces"

export default function InteractiveBuilding({floors}: {floors: Floor[]}) {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null)
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleFloorClick = (floorIndex: number) => {
    setSelectedFloor(floorIndex)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedFloor(null)
  }

  const handleFloorHover = (floorIndex: number | null) => {
    setHoveredFloor(floorIndex)
  }
 
  return (
    <div className="w-[50vw] flex h-full relative">
      {/* Header */}
      {/* <div className="absolute top-6 left-6 z-10">
        <h1 className="text-3xl font-bold text-white">Interactive Building</h1>
        <p className="text-sm text-gray-300">Click on any floor to view details</p>
      </div> */}

      {/* Instructions */}
      {/* <div className="absolute top-6 right-6 z-10 bg-black/60 backdrop-blur-sm p-4 rounded-xl">
        <p className="text-white text-sm font-medium mb-2">🖱️ Click floors for details</p>
        <p className="text-gray-300 text-xs">Hover to highlight • Drag to rotate</p>
      </div> */}

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [80, 50, 100], fov: 40 }}
        className="w-full h-full"
        gl={{
          antialias: true,
          shadowMap: { enabled: true, type: THREE.PCFSoftShadowMap },
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <Scene 
            onFloorClick={handleFloorClick}
            onFloorHover={handleFloorHover}
            selectedFloor={selectedFloor}
            hoveredFloor={hoveredFloor}
          />
        </Suspense>
      </Canvas>

      {/* Modal rendered outside Canvas */}
      {showModal && selectedFloor !== null && (
        <FloorModal floor={floors[selectedFloor]} onClose={closeModal} />
      )}
    </div>
  )
}