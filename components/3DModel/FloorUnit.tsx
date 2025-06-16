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
  const cornerRadius = 3
  
  // Ground floor specific configuration
  const isGroundFloor = floorIndex === 1
  const entranceWidth = 8

  // Create different geometry based on whether it's ground floor or not
  const mainWallGeometry = useMemo(() => {
    if (isGroundFloor) {
      return createGroundFloorGeometry(width, height, depth, cornerRadius, entranceWidth)
    } else {
      return createRoundedRectangleGeometry(width, height, depth, cornerRadius)
    }
  }, [isGroundFloor, width, height, depth, cornerRadius, entranceWidth])

  // Window configuration
  const windowWidth = 2.5
  const windowHeight = 2.8
  const windowSpacing = 3.2
  const windowVerticalOffset = height * 0.2 // Start windows 20% from bottom

  // Determine floor color based on state
  const getFloorColor = () => {
    if (isSelected) return "#7fff8c" // Green when selected
    if (isHovered) return "#94e8ff" // Blue when hovered
    return isGroundFloor ? "#e8e8e8" : "#f3f3f3" // Slightly darker for ground floor
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

  function createGroundFloorGeometry(width: number, height: number, depth: number, radius: number, entranceWidth: number) {
    // Create the main shape with an opening for the entrance
    const shape = new THREE.Shape()
    const x = width / 2
    const y = depth / 2
    const entranceHalfWidth = entranceWidth / 2
  
    // Start from bottom left, go clockwise but skip the entrance area
    shape.moveTo(-x + radius, -y)
    
    // Bottom edge to entrance start
    shape.lineTo(entranceHalfWidth, -y)
    
    // Skip entrance area - move to entrance end
    shape.moveTo(-entranceHalfWidth, -y)
    shape.lineTo(-x + radius, -y)
    
    // Left edge
    shape.quadraticCurveTo(-x, -y, -x, -y + radius)
    shape.lineTo(-x, y - radius)
    
    // Top left corner
    shape.quadraticCurveTo(-x, y, -x + radius, y)
    
    // Top edge
    shape.lineTo(x - radius, y)
    
    // Top right corner
    shape.quadraticCurveTo(x, y, x, y - radius)
    
    // Right edge
    shape.lineTo(x, -y + radius)
    
    // Bottom right corner
    shape.quadraticCurveTo(x, -y, x - radius, -y)
    
    // Bottom edge back to entrance
    shape.lineTo(entranceHalfWidth, -y)

    // Create holes for the entrance opening
    const entranceHole = new THREE.Path()
    entranceHole.moveTo(-entranceHalfWidth, -y)
    entranceHole.lineTo(entranceHalfWidth, -y)
    entranceHole.lineTo(entranceHalfWidth, -y + 0.5) // Small depth to create opening
    entranceHole.lineTo(-entranceHalfWidth, -y + 0.5)
    entranceHole.lineTo(-entranceHalfWidth, -y)
    
    shape.holes.push(entranceHole)
  
    const extrudeSettings = {
      depth: height,
      bevelEnabled: false,
    }
  
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geometry.rotateX(Math.PI / 2)
    geometry.translate(0, height / 2, 0)
  
    return geometry
  }

  // Function to create windows along a wall
  const createWindowsAlongWall = (wallLength: number, wallPosition: [number, number, number], wallRotation: [number, number, number], isVertical = false, skipCenter = false) => {
    const windows = []
    const numWindows = Math.floor(wallLength / windowSpacing)
    const startOffset = -(numWindows - 1) * windowSpacing / 2
    
    for (let i = 0; i < numWindows; i++) {
      // Skip center windows if entrance is there
      if (skipCenter && Math.abs(startOffset + i * windowSpacing) < entranceWidth / 2) {
        continue
      }
      
      const offset = startOffset + i * windowSpacing
      const windowPos: [number, number, number] = isVertical 
        ? [wallPosition[0], wallPosition[1] + windowVerticalOffset, wallPosition[2] + offset]
        : [wallPosition[0] + offset, wallPosition[1] + windowVerticalOffset, wallPosition[2]]
      
      windows.push(
        <group key={`window-${i}`} position={windowPos} rotation={wallRotation}>
          {/* Window frame */}
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[windowWidth + 0.15, windowHeight + 0.15, 0.05]} />
            <meshStandardMaterial color="#666666" roughness={0.8} />
          </mesh>
          {/* Window glass */}
          <mesh position={[0, 0, 0.05]}>
            <boxGeometry args={[windowWidth, windowHeight, 0.02]} />
            <meshStandardMaterial 
              color="#87ceeb" 
              transparent 
              opacity={0.4} 
              metalness={0.9} 
              roughness={0.05} 
            />
          </mesh>
          {/* Window divider (cross pattern) */}
          <mesh position={[0, 0, 0.06]}>
            <boxGeometry args={[0.08, windowHeight, 0.01]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <boxGeometry args={[windowWidth, 0.08, 0.01]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
        </group>
      )
    }
    return windows
  }

  // Ground floor entrance components - simplified since the slab is now open
  const renderGroundFloorEntrance = () => {
    if (!isGroundFloor) return null
    
    return (
      <>
      
        
        {/* Building name/number above entrance */}
        {/* <Html position={[0, entranceHeight + 2, depth / 2 + 0.5]} center>
          <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-lg font-bold pointer-events-none">
            TOWER {floorIndex}
          </div>
        </Html> */}
      </>
    )
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

      {/* WINDOWS */}
      {/* FRONT WALL WINDOWS (skip center for entrance on ground floor) */}
      {createWindowsAlongWall(width * 0.8, [0, 0, depth / 2], [0, 0, 0], false, isGroundFloor)}

      {/* BACK WALL WINDOWS */}
      {createWindowsAlongWall(width * 0.8, [0, 0, -depth / 2], [0, Math.PI, 0])}

      {/* LEFT WALL WINDOWS */}
      {createWindowsAlongWall(depth * 0.8, [-width / 2, 0, 0], [0, -Math.PI / 2, 0], true)}

      {/* RIGHT WALL WINDOWS */}
      {createWindowsAlongWall(depth * 0.8, [width / 2, 0, 0], [0, Math.PI / 2, 0], true)}

      {/* Ground floor entrance */}
      {renderGroundFloorEntrance()}
    </group>
  )
}

export default FloorUnit