import React, { useMemo, useRef } from 'react'
import { Group } from 'three'
import * as THREE from "three"

const DetailedBalcony = ({
    position,
    rotation,
    // width,
    // depth,
    floorHeight,
  }: {
    position: [number, number, number]
    rotation: number
    width: number
    depth: number
    floorHeight: number
  }) => {


    const balconyGroup = useRef<Group>(null)
    const railingHeight = 1.0
    const balconyWidth = 8
    const balconyDepth = 2.5
    const curveRadius = 1.2

    function createCurvedRectangleGeometry(width: number, depth: number, height: number, radius: number) {
        const shape = new THREE.Shape()
        const w = width / 2
        const d = depth / 2
      
        shape.moveTo(-w, -d)
        shape.lineTo(w, -d)
        shape.lineTo(w, d - radius)
        shape.quadraticCurveTo(w, d, w - radius, d)
        shape.lineTo(-w + radius, d)
        shape.quadraticCurveTo(-w, d, -w, d - radius)
        shape.lineTo(-w, -d)
      
        const extrudeSettings = {
          depth: height,
          bevelEnabled: false,
        }
      
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
        geometry.rotateX(Math.PI / 2)
        geometry.translate(0, height / 2, 0)
      
        return geometry
      }
  
    const balconyFloorGeometry = useMemo(
      () => createCurvedRectangleGeometry(balconyWidth, balconyDepth, 0.2, curveRadius),
      [],
    )
  
    const overhangGeometry = useMemo(
      () => createCurvedRectangleGeometry(balconyWidth + 0.2, balconyDepth + 0.2, 0.2, curveRadius),
      [],
    )

    return (
        <group ref={balconyGroup} position={position} rotation={[0, rotation, 0]}>
          {/* Balcony Floor */}
          <mesh geometry={balconyFloorGeometry} position={[0, floorHeight, 0]}>
            <meshStandardMaterial color="#696969" />
          </mesh>
    
          {/* Overhang */}
          <mesh geometry={overhangGeometry} position={[0, floorHeight + floorHeight - 0.2, 0]}>
            <meshStandardMaterial color="#696969" />
          </mesh>
    
          {/* Glass Panels */}
          <group position={[0, floorHeight, 0]}>
            {/* Front glass panel */}
            <mesh position={[0, railingHeight * 0.45, balconyDepth / 2]}>
              <planeGeometry args={[balconyWidth, railingHeight * 0.9]} />
              <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
            </mesh>
    
            {/* Back glass panel */}
            <mesh position={[0, railingHeight * 0.45, -balconyDepth / 2]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[balconyWidth, railingHeight * 0.9]} />
              <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
            </mesh>
    
            {/* Side glass panels */}
            <mesh position={[-balconyWidth / 2, railingHeight * 0.45, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[balconyDepth, railingHeight * 0.9]} />
              <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
            </mesh>
    
            <mesh position={[balconyWidth / 2, railingHeight * 0.45, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[balconyDepth, railingHeight * 0.9]} />
              <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} metalness={0.9} roughness={0.05} />
            </mesh>
          </group>
    
          {/* Handrails */}
          <group position={[0, floorHeight, 0]}>
            {/* Front rail */}
            <mesh position={[0, railingHeight, balconyDepth / 2]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.05, 0.05, balconyWidth, 8]} />
              <meshStandardMaterial color="#696969" />
            </mesh>
    
            {/* Side rails */}
            <mesh position={[-balconyWidth / 2, railingHeight, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, balconyDepth, 8]} />
              <meshStandardMaterial color="#696969" />
            </mesh>
    
            <mesh position={[balconyWidth / 2, railingHeight, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, balconyDepth, 8]} />
              <meshStandardMaterial color="#696969" />
            </mesh>
          </group>
        </group>
      )
}

export default DetailedBalcony
