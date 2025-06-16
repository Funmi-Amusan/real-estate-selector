'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import Image from "next/image";
import { Gallery } from '@/lib/interfaces'; 
import { AnimatePresence, motion } from 'motion/react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import GalleryModal from './GalleryModal';
import { useParams } from 'next/navigation';
import { towers } from '@/lib/data';
import { ActiveImage } from '@/lib/types';


const BuildingGallery
 = () => {
    const [activeImage, setActiveImage] = useState<ActiveImage | null>(null);
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);

    const param = useParams()
    const tower = towers.find((tower) => tower.id === param.towerId)
    useEffect(() => {
      function onKeyDown(event: { key: string; }) {
        if (event.key === "Escape") {
          setActiveImage(null);
        }
      }
  
      if (activeImage) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
  
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [activeImage]);
  
    useOutsideClick(ref, () => setActiveImage(null));

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
        const prevImage = tower?.gallery[prevIndex];
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
        const nextImage = tower?.gallery[nextIndex];
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

    if (!tower) {
      return (
        <div className='p-6'>
          <p>No floor data available to building gallery.</p>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen">
       
       <AnimatePresence>
  {activeImage && (
    <>
      <motion.div
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 h-full w-full z-10"
      />
      <GalleryModal
        activeImage={activeImage}
        floorGallery={tower.gallery}
        onClose={() => setActiveImage(null)}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
        modalRef={ref}
        layoutId={id}
      />
    </>
  )}
</AnimatePresence>
        <div className='p-6'>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-3xl font-bold mb-6 text-center uppercase text-gray-800'
          >
           {tower.name}
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4"> Gallery</h3>
            <div className='flex overflow-x-auto gap-6 pb-4 hide-scrollbar'>
              {tower.gallery.map((item, index) => (
                <motion.div
                  layoutId={`image-${index}-${id}`}
                  key={index}
                  className='
                    group                              
                    relative                            
                    flex-none w-[90%] md:w-1/3
                    rounded-xl shadow-md
                    cursor-pointer
                    overflow-hidden
                    bg-gray-100               
                  '
                  onClick={() => handleImageClick(item, index)}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={item.image}
                    alt={`Floor ${tower.name} - Image ${index + 1}`}
                    width={320}
                    height={240}
                    className="
                      object-cover w-full h-full rounded-xl
                      transition-transform duration-500 ease-in-out 
                      group-hover:scale-110                       
                    "
                  />
                  <div className="
                    absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 ease-in-out
                    rounded-xl                                      
                  "></div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 flex items-end justify-center rounded-xl p-4"
                  >
                    <div className="text-white text-center">
                      <p className="text-sm font-semibold mb-1">{item.title}</p>
                      <p className="text-xs opacity-90">Click to view fullscreen</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  };
export default BuildingGallery
;