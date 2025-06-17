"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useState, useId, useRef } from "react"
import LoadingScreen from "./LoadingScreen"
import Scene from "./Scene"
import FloorModal from './FloorModal'
import { Floor, Gallery } from "@/lib/interfaces" 
import { useRouter } from "next/navigation"
import { useFloorStore } from "@/stores/floor-store"
import { AnimatePresence, motion } from "framer-motion" 
import { useOutsideClick } from "@/hooks/useOutsideClick"; 
import GalleryModal from "../GalleryModal"
import { ActiveImage } from "@/lib/types"

export default function InteractiveBuilding({floors}: {floors: Floor[]}) {

    const router = useRouter()
    const {update, floor, clear} = useFloorStore();

    const [selectedFloor, setSelectedFloor] = useState<number | null>(null)
    const [hoveredFloor, setHoveredFloor] = useState<number | null>(null)
    const [showFloorModal, setShowFloorModal] = useState(false) 
    const [activeImage, setActiveImage] = useState<ActiveImage| null>(null);
    const galleryModalId = useId(); 
    const galleryModalRef = useRef<HTMLDivElement>(null);
    useOutsideClick(galleryModalRef, () => {
        setActiveImage(null);
    });
    useEffect(() => {
        function onKeyDown(event: { key: string; }) {
            if (event.key === "Escape") {
                if (activeImage) {
                    setActiveImage(null);
                } else if (showFloorModal) {
                    setShowFloorModal(false); 
                }
            }
        }
        if (activeImage) {
          document.body.style.overflow = "hidden";
      } else {
          document.body.style.overflow = "auto";
      }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [activeImage, clear, showFloorModal, update]);


    useEffect(() => {
        if (floor) {
            const floorIndex = floors.findIndex(f => f.number === floor.number);
            if (floorIndex !== -1) {
                setSelectedFloor(floor.number);
                setShowFloorModal(true); 
            }
        } else {
            setSelectedFloor(null);
            setShowFloorModal(false);
        }
    }, [floor, floors]);

    const handleFloorClick = (floorIndex: number) => {
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
        const newUrl = `${currentPath}?floor=${floorIndex}`;
        router.push(newUrl); 
        const floorData = floors[floorIndex]
        update(floorData) 
        setSelectedFloor(floorIndex)
        setShowFloorModal(true) 
    }

    const closeFloorModal = () => {
        setShowFloorModal(false)
    }

    const handleImageSelectFromFloorModal = (item: Gallery, index: number) => {
        setShowFloorModal(false);
        setActiveImage({ 
            src: item.image,
            alt: item.title,
            title: item.title,
            description: item.description,
            index
        });
    };

    const handlePrevImage = () => {
        if (activeImage && floor) {
            const prevIndex = activeImage.index - 1;
            const prevImage = floor.gallery[prevIndex];
            if (prevImage) {
                setActiveImage({
                    src: prevImage.image,
                    alt: prevImage.title,
                    title: prevImage.title,
                    description: prevImage.description,
                    index: prevIndex
                });
            }
        }
    };

    const handleNextImage = () => {
        if (activeImage && floor) { 
            const nextIndex = activeImage.index + 1;
            const nextImage = floor.gallery[nextIndex];
            if (nextImage) {
                setActiveImage({
                    src: nextImage.image,
                    alt: nextImage.title,
                    title: nextImage.title,
                    description: nextImage.description,
                    index: nextIndex
                });
            }
        }
    };

    const closeGalleryModal = () => {
        setActiveImage(null);
    };

    const handleFloorHover = (floorIndex: number | null) => {
        setHoveredFloor(floorIndex)
    }

    return (
        <div className="w-full h-full relative">
      <div className="absolute -top-5 md:-top-12 left-1/2 transform -translate-x-1/2 w-screen md:w-auto text-black py-2 px-4  z-10">
        <span className="font-bold text-sm  flex">Interactive Building Viewer - click a floor to explore</span>
      </div>
            <Canvas
                shadows
                camera={{ position: [80, 50, 100], fov: 45 }}
                className="w-full h-full"
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

            <AnimatePresence>
              <div>
                {showFloorModal && selectedFloor !== null && (
                    <FloorModal
                        onClose={closeFloorModal}
                        onImageSelect={handleImageSelectFromFloorModal} 
                    />
                )}
              </div>
            </AnimatePresence>
            <AnimatePresence>
                {activeImage && floor && ( 
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/80 h-full w-full z-[90]" 
                        />
                        <GalleryModal
                            activeImage={activeImage}
                            floorGallery={floor.gallery} 
                            onClose={closeGalleryModal}
                            onNext={handleNextImage}
                            onPrev={handlePrevImage}
                            modalRef={galleryModalRef}
                            layoutId={galleryModalId}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
