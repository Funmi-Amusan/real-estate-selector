import { Html } from '@react-three/drei'
import React, { useRef } from 'react'
import { Group } from 'three'
import FloorUnit from './FloorUnit'
import { useFrame } from '@react-three/fiber'

const BuildingModel = ({
    onFloorClick,
    onFloorHover,
    selectedFloor,
    hoveredFloor,
  }: {
    onFloorClick: (floorIndex: number) => void
    onFloorHover: (floorIndex: number | null) => void
    selectedFloor: number | null
    hoveredFloor: number | null
  }) => {

    const buildingRef = useRef<Group>(null)
  
    useFrame((state) => {
      if (buildingRef.current) {
        buildingRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.02
      }
    })
  
    const floorHeight = 3.5
    const numFloors = 15
    const buildingWidth = 35
    const buildingDepth = 24
    const baseHeight = 7.0
    const baseWidth = buildingWidth + 0.5
    const baseDepth = buildingDepth + 0.5
  

    return (
        <group ref={buildingRef}>
          {/* Base Floor - Interactive */}
          <mesh
            position={[0, baseHeight / 2, 0]}
            castShadow
            receiveShadow
            onClick={(e) => {
              e.stopPropagation()
              onFloorClick(0)
            }}
            onPointerEnter={(e) => {
              e.stopPropagation()
              onFloorHover(0)
              document.body.style.cursor = "pointer"
            }}
            onPointerLeave={(e) => {
              e.stopPropagation()
              onFloorHover(null)
              document.body.style.cursor = "default"
            }}
          >
            <boxGeometry args={[baseWidth, baseHeight, baseDepth]} />
            <meshStandardMaterial
              color={selectedFloor === 0 ? "#4ade80" : hoveredFloor === 0 ? "#60a5fa" : "#6b705c"}
              roughness={0.8}
              transparent
              opacity={hoveredFloor === 0 ? 0.9 : 1.0}
            />
          </mesh>
    
          {/* Base floor label */}
          {hoveredFloor === 0 && (
            <Html position={[0, baseHeight / 2, baseDepth / 2 + 2]} center>
              <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-medium pointer-events-none">
                Ground Floor - Commercial
              </div>
            </Html>
          )}
    
          {/* Front Base Glass */}
          <mesh position={[0, baseHeight / 2, baseDepth / 2 + 0.1]} castShadow>
            <boxGeometry args={[baseWidth * 0.9, baseHeight * 0.8, 0.2]} />
            <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
          </mesh>
    
          {/* Back Base Wall */}
          <mesh position={[0, baseHeight / 2, -baseDepth / 2 - 0.15]} castShadow>
            <boxGeometry args={[baseWidth * 0.95, baseHeight * 0.9, 0.3]} />
            <meshStandardMaterial color="#f3f3f3" roughness={0.9} metalness={0.1} />
          </mesh>
    
          {/* Back Base Small Windows */}
          {Array.from({ length: 5 }, (_, i) => (
            <group key={i}>
              <mesh position={[(i - 2) * 2.5, baseHeight * 0.3, -baseDepth / 2 - 0.2]}>
                <boxGeometry args={[2, 1.5, 0.05]} />
                <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
              </mesh>
              <mesh position={[(i - 2) * 2.5, baseHeight * 0.7, -baseDepth / 2 - 0.2]}>
                <boxGeometry args={[2, 1.5, 0.05]} />
                <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
              </mesh>
            </group>
          ))}
    
          {/* Side Base Walls */}
          <mesh position={[-baseWidth / 2 - 0.15, baseHeight / 2, 0]} castShadow>
            <boxGeometry args={[0.3, baseHeight * 0.9, baseDepth * 0.9]} />
            <meshStandardMaterial color="#f3f3f3" roughness={0.9} metalness={0.1} />
          </mesh>
          <mesh position={[baseWidth / 2 + 0.15, baseHeight / 2, 0]} castShadow>
            <boxGeometry args={[0.3, baseHeight * 0.9, baseDepth * 0.9]} />
            <meshStandardMaterial color="#f3f3f3" roughness={0.9} metalness={0.1} />
          </mesh>
    
          {/* Entrance */}
          <mesh position={[0, baseHeight / 3, baseDepth / 2 + 0.5]} castShadow>
            <boxGeometry args={[30, 8, 1.0]} />
            <meshStandardMaterial color="#e8e8e8" roughness={0.8} />
          </mesh>
    
          {/* Main Floors */}
          {Array.from({ length: numFloors }, (_, i) => {
            const yPos = baseHeight + i * floorHeight
            const floorIndex = i + 1 // Offset by 2 (ground + mezzanine)
    
            return (
              <FloorUnit
                key={i}
                position={[0, yPos, 0]}
                width={buildingWidth}
                depth={buildingDepth}
                height={floorHeight}
                floorIndex={floorIndex}
                isSelected={selectedFloor === floorIndex}
                isHovered={hoveredFloor === floorIndex}
                onFloorClick={onFloorClick}
                onFloorHover={onFloorHover}
              />
            )
          })}
    
          {/* Roof Structure */}
          <group>
            {/* Main roof */}
            <mesh position={[0, baseHeight + numFloors * floorHeight + 0.5, 0]} castShadow>
              <boxGeometry args={[buildingWidth + 1.5, 1.0, buildingDepth + 1.5]} />
              <meshStandardMaterial color="#c4c4c4" roughness={0.7} />
            </mesh>
    
            {/* Roof fins */}
            {Array.from({ length: 12 }, (_, i) => {
              const spacing = 1.5
              const xPos = -buildingWidth / 2 + 2 + i * spacing
              const roofY = baseHeight + numFloors * floorHeight + 1.0
    
              return (
                <group key={i}>
                  <mesh position={[xPos, roofY + 0.4, buildingDepth / 2 - 3]} castShadow>
                    <boxGeometry args={[0.1, 0.8, 4]} />
                    <meshStandardMaterial color="#94deff" roughness={0.7} />
                  </mesh>
                  <mesh position={[xPos, roofY + 0.4, -buildingDepth / 2 + 3]} castShadow>
                    <boxGeometry args={[0.1, 0.8, 4]} />
                    <meshStandardMaterial color="#94deff" roughness={0.7} />
                  </mesh>
                </group>
              )
            })}
    
            {/* Small roof details */}
            {Array.from({ length: 4 }, (_, i) => {
              const side = i < 2 ? -1 : 1
              const pos = i % 2 === 0 ? -buildingDepth / 3 : buildingDepth / 3
              const roofY = baseHeight + numFloors * floorHeight + 0.5
    
              return (
                <mesh key={i} position={[side * (buildingWidth / 2 + 0.5), roofY, pos]} castShadow>
                  <boxGeometry args={[2, 0.5, 0.8]} />
                  <meshStandardMaterial color="#b0b0b0" roughness={0.7} />
                </mesh>
              )
            })}
          </group>
    
          {/* Building label */}
          {/* <Html position={[0, baseHeight + numFloors * floorHeight + 5, 0]} center>
            <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Interactive Building - Click Floors
            </div>
          </Html> */}
        </group>
      )
}

export default BuildingModel

