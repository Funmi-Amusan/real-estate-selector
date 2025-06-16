'use client'

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { useFloorStore } from '@/stores/floor-store';
import { useEffect, useId, useRef, useState } from 'react';
import { Gallery } from '@/lib/interfaces';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import GalleryModal from '../GalleryModal';

type ActiveImage = {
  src: string;
  alt: string;
  index: number;
  title: string;
  description: string;
} | null;

const FloorModal = ({ onClose }: {  onClose: () => void }) => {

  const [activeImage, setActiveImage] = useState<ActiveImage>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  
  const { floor } = useFloorStore();

  useEffect(() => {
    function onKeyDown(event: { key: string; }) {
      if (event.key === "Escape") {
        if (activeImage) {
          setActiveImage(null);
        } else {
          onClose();
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
  }, [activeImage, onClose]);

  useOutsideClick(ref, () => setActiveImage(null));

  if (!floor) return null;

  const handleImageClick = (item: Gallery, index: number) => {
    setActiveImage({
      src: item.image,
      alt: item.title,
      title: item.title,
      description: item.description,
      index
    });
  };

  const handlePrevImage = () => {
    if (activeImage) {
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
    if (activeImage) {
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
  
    return ( 
      <>
      <AnimatePresence>
        {activeImage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 h-full w-full z-50"
            />
            <GalleryModal
              activeImage={activeImage}
              floorGallery={floor.gallery}
              onClose={() => setActiveImage(null)}
              onNext={handleNextImage}
              onPrev={handlePrevImage}
              modalRef={ref}
              layoutId={id}
            />
          </>
        )}
      </AnimatePresence>

      <div className="  z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full h-fit overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Floor {floor.number}</h2>
                <p>{floor.unitType}</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
<div className='grid grid-cols-2 gap-2 '>
   {floor.gallery.map((item, index) => (
                <motion.div
                  layoutId={`image-${index}`}
                  key={index}
                  className='
                    group                              
                    relative                            
                    flex-none 
                    cursor-pointer
                    overflow-hidden           
                  '
                  onClick={() => handleImageClick(item, index)}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={item.image}
                    alt={`Floor ${floor.number} - Image ${index + 1}`}
                    width={320}
                    height={240}
                    className="
                      object-cover w-full h-full rounded-md
                      transition-transform duration-500 ease-in-out 
                      group-hover:scale-105                     
                    "
                  />
                  <div className="
                    absolute inset-0 bg-black/20
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 ease-in-out
                                        
                  "></div>
                  
                </motion.div>
              ))}

</div>
  
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className=" p-1 rounded-lg flex items-center gap-2">
                  <p className="text-sm text-gray-600">Rooms</p>
                  <p className="text-base font-semibold text-gray-800">{floor.rooms}</p>
                </div>
                <div className=" p-1 rounded-lg flex items-center gap-2">
                  <p className="text-sm text-gray-600"> Area</p>
                  <p className="text-base font-semibold text-gray-800">{floor.area}m²</p>
                </div>
              </div>
  
            
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }

  export default FloorModal
