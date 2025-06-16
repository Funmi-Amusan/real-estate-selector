import { Html } from '@react-three/drei'
import React, { useMemo, useRef } from 'react'
import DetailedBalcony from './DetailedBalcony'
import { Mesh } from 'three'
import * as THREE from "three"

const FloorUnit = ({
    position,
    width,
    depth,
    height,
    floorIndex,
    isSelected,
    isHovered,
    onFloorClick,
    onFloorHover,
  }: {
    position: [number, number, number]
    width: number
    depth: number
    height: number
    floorIndex: number
    isSelected: boolean
    isHovered: boolean
    onFloorClick: (floorIndex: number) => void
    onFloorHover: (floorIndex: number | null) => void
  }) => {

    const floorRef = useRef<Mesh>(null)
  const cornerRadius = 2
  const mainWallGeometry = useMemo(() => createRoundedRectangleGeometry(width, height, depth, cornerRadius), [])

  const centerWindowWidth = 2.0
  const sideWindowWidth = 4

  // Determine floor color based on state
  const getFloorColor = () => {
    if (isSelected) return "#4ade80" // Green when selected
    if (isHovered) return "#60a5fa" // Blue when hovered
    return "#f3f3f3" // Default white
  }

  function createRoundedRectangleGeometry(width: number, height: number, depth: number, radius: number) {
    const shape = new THREE.Shape()
    const x = width / 2
    const y = depth / 2
  
    shape.moveTo(-x + radius, -y)
    shape.lineTo(x - radius, -y)
    shape.quadraticCurveTo(x, -y, x, -y + radius)
    shape.lineTo(x, y - radius)
    shape.quadraticCurveTo(x, y, x - radius, y)
    shape.lineTo(-x + radius, y)
    shape.quadraticCurveTo(-x, y, -x, y - radius)
    shape.lineTo(-x, -y + radius)
    shape.quadraticCurveTo(-x, -y, -x + radius, -y)
  
    const extrudeSettings = {
      depth: height,
      bevelEnabled: false,
    }
  
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geometry.rotateX(Math.PI / 2)
    geometry.translate(0, height / 2, 0)
  
    return geometry
  }

  return (
    <group position={position}>
      {/* Main Structure with curved edges - Interactive */}
      <mesh
        ref={floorRef}
        geometry={mainWallGeometry}
        onClick={(e) => {
          e.stopPropagation()
          onFloorClick(floorIndex)
        }}
        onPointerEnter={(e) => {
          e.stopPropagation()
          onFloorHover(floorIndex)
          document.body.style.cursor = "pointer"
        }}
        onPointerLeave={(e) => {
          e.stopPropagation()
          onFloorHover(null)
          document.body.style.cursor = "default"
        }}
      >
        <meshStandardMaterial
          color={getFloorColor()}
          roughness={0.9}
          metalness={0.1}
          transparent
          opacity={isHovered ? 0.9 : 1.0}
        />
      </mesh>

      {/* Floor number label */}
      {isHovered && (
        <Html position={[35, 0, 0]} center>
          <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap font-medium pointer-events-none">
            {`Floor ${floorIndex }`}
          </div>
        </Html>
      )}

      {/* Balconies on all four sides */}
      <DetailedBalcony
        position={[0, 0, depth / 2 + 1.25]}
        rotation={0}
        width={width}
        depth={depth}
        floorHeight={height}
      />
      <DetailedBalcony
        position={[0, 0, -depth / 2 - 1.25]}
        rotation={Math.PI}
        width={width}
        depth={depth}
        floorHeight={height}
      />
      <DetailedBalcony
        position={[-width / 2 - 1.25, 0, 0]}
        rotation={-Math.PI / 2}
        width={width}
        depth={depth}
        floorHeight={height}
      />
      <DetailedBalcony
        position={[width / 2 + 1.25, 0, 0]}
        rotation={Math.PI / 2}
        width={width}
        depth={depth}
        floorHeight={height}
      />

      {/* FRONT SIDE WINDOWS */}
      {/* Central window */}
      <mesh position={[0, height / 2, depth / 2 + 0.05]}>
        <boxGeometry args={[centerWindowWidth, height, 0.1]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
      </mesh>
      <mesh position={[0, height / 2, depth / 2]}>
        <boxGeometry args={[centerWindowWidth + 0.2, height, 0.1]} />
        <meshStandardMaterial color="#94deff" roughness={0.7} />
      </mesh>

      {/* Side windows */}
      <mesh position={[-width / 2 + sideWindowWidth, height / 2, depth / 2 + 0.05]}>
        <boxGeometry args={[sideWindowWidth, height * 0.7, 0.1]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
      </mesh>
      <mesh position={[width / 2 - sideWindowWidth, height / 2, depth / 2 + 0.05]}>
        <boxGeometry args={[sideWindowWidth, height * 0.7, 0.1]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
      </mesh>

      {/* BACK SIDE WINDOWS */}
      <mesh position={[0, height / 2, -depth / 2 - 0.05]}>
        <boxGeometry args={[centerWindowWidth, height, 0.1]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
      </mesh>
      <mesh position={[0, height / 2, -depth / 2]}>
        <boxGeometry args={[centerWindowWidth + 0.2, height, 0.1]} />
        <meshStandardMaterial color="#94deff" roughness={0.7} />
      </mesh>

      <mesh position={[-width / 2 + sideWindowWidth, height / 2, -depth / 2 - 0.05]}>
        <boxGeometry args={[sideWindowWidth, height * 0.7, 0.1]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
      </mesh>
      <mesh position={[width / 2 - sideWindowWidth, height / 2, -depth / 2 - 0.05]}>
        <boxGeometry args={[sideWindowWidth, height * 0.7, 0.1]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
      </mesh>

      {/* LEFT SIDE WINDOWS */}
      <mesh position={[-width / 2 - 0.05, height / 2, 0]}>
        <boxGeometry args={[0.1, height, centerWindowWidth]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
      </mesh>
      <mesh position={[-width / 2, height / 2, 0]}>
        <boxGeometry args={[0.1, height, centerWindowWidth + 0.2]} />
        <meshStandardMaterial color="#94deff" roughness={0.7} />
      </mesh>

      <mesh position={[-width / 2 - 0.05, height / 2, -depth / 2 + sideWindowWidth]}>
        <boxGeometry args={[0.1, height * 0.7, sideWindowWidth]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
      </mesh>
      <mesh position={[-width / 2 - 0.05, height / 2, depth / 2 - sideWindowWidth]}>
        <boxGeometry args={[0.1, height * 0.7, sideWindowWidth]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
      </mesh>

      {/* RIGHT SIDE WINDOWS */}
      <mesh position={[width / 2 + 0.05, height / 2, 0]}>
        <boxGeometry args={[0.1, height, centerWindowWidth]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
      </mesh>
      <mesh position={[width / 2, height / 2, 0]}>
        <boxGeometry args={[0.1, height, centerWindowWidth + 0.2]} />
        <meshStandardMaterial color="#94deff" roughness={0.7} />
      </mesh>

      <mesh position={[width / 2 + 0.05, height / 2, -depth / 2 + sideWindowWidth]}>
        <boxGeometry args={[0.1, height * 0.7, sideWindowWidth]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
      </mesh>
      <mesh position={[width / 2 + 0.05, height / 2, depth / 2 - sideWindowWidth]}>
        <boxGeometry args={[0.1, height * 0.7, sideWindowWidth]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
      </mesh>
    </group>
  )
}

export default FloorUnit
