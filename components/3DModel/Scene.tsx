import React, { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import BuildingModel from './BuildingModel'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

interface SceneProps {
  onFloorClick: (floorIndex: number) => void
  onFloorHover: (floorIndex: number | null) => void
  selectedFloor: number | null
  hoveredFloor: number | null
}

const Scene: React.FC<SceneProps> = ({
  onFloorClick,
  onFloorHover,
  selectedFloor,
  hoveredFloor
}) => {
  
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
//   const { camera, gl, scene } = useThree()
//   const initialCameraPosition = useRef(new THREE.Vector3(80, 50, 100))
//   const initialTarget = useRef(new THREE.Vector3(0, 20, 0))

//   useEffect(() => {
//     if (controlsRef.current) {
//       if (selectedFloor !== null) {
//         // Disable controls to prevent user interaction
//         controlsRef.current.enabled = false;

//         // Instantly move camera to the fixed position without animation
//         camera.position.copy(initialCameraPosition.current);
//         camera.lookAt(initialTarget.current);
        
//         // Manually render the scene once with the new camera position
//         gl.render(scene, camera);
        
//       } else {
//         // Re-enable controls when no floor is selected
//         controlsRef.current.enabled = true;
//       }
//     }
//   }, [selectedFloor, camera, gl, scene]);

  // Keep controls target updated when not in a selected state
  useFrame(() => {
    if (selectedFloor === null && controlsRef.current) {
      controlsRef.current.update();
    }
  });


  return (
    <>
      {/* ... your lighting setup ... */}
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