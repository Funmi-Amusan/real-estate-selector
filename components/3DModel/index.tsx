"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import * as THREE from "three"
import LoadingScreen from "./LoadingScreen"
import Scene from "./Scene"
import FloorModal from './FloorModal'
import { Floor } from "@/lib/interfaces"
import { useRouter } from "next/navigation"
import { useFloorStore } from "@/stores/floor-store"

export default function InteractiveBuilding({floors}: {floors: Floor[]}) {

    const router = useRouter()
    const {update, floor, clear} = useFloorStore(); // Add clear function

    const [selectedFloor, setSelectedFloor] = useState<number | null>(null)
    const [hoveredFloor, setHoveredFloor] = useState<number | null>(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (floor) {
            const floorIndex = floors.findIndex(f => f.number === floor.number);
            if (floorIndex !== -1) {
                setSelectedFloor(floor.number);
                setShowModal(true);
            }
        } else {
            setSelectedFloor(null);
            setShowModal(false);
        }
    }, [floor, floors]);

    const handleFloorClick = (floorIndex: number) => {
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
        const newUrl = `${currentPath}?floor=${floorIndex}`;
        router.push(newUrl);
        const floorData = floors[floorIndex-1]
        update(floorData)
        setSelectedFloor(floorIndex)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setSelectedFloor(null)
        
        // Clear the floor from store
        clear()
        
        // Clear URL parameter when closing modal
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
        router.push(currentPath);
    }

    const handleFloorHover = (floorIndex: number | null) => {
        setHoveredFloor(floorIndex)
    }
 
    return (
        <div className="w-full h-full relative">
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
                <FloorModal 
                    onClose={closeModal} 
                    setShowModal={setShowModal}
                />
            )}
        </div>
    )
}