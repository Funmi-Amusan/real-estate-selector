'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { IoChevronForward, IoChevronBackOutline, IoCloseCircleSharp } from 'react-icons/io5';
import React from 'react';
import { GalleryModalProps } from '@/lib/interfaces';

const GalleryModal = ({
  activeImage,
  floorGallery,
  onClose,
  onNext,
  onPrev,
  modalRef, 
  layoutId,
}: GalleryModalProps) => {
  return (
    <div className="fixed inset-0 grid place-items-center z-[100]" ref={modalRef}>
      <motion.button
        key={`button-${activeImage.index}-${layoutId}`}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.05 } }}
        className="flex absolute top-4 right-4 items-center justify-center rounded-full z-10 "
        onClick={onClose}
      >
     <IoCloseCircleSharp className='text-white text-5xl hover:text-white/70' />
      </motion.button>

      {activeImage.index > 0 && floorGallery[activeImage.index - 1] && (
        <IoChevronBackOutline
          onClick={onPrev} 
          className="flex absolute top-1/2 left-4 items-center justify-center text-white/50 h-10 w-10 z-10 shadow-lg hover:text-white transition-colors cursor-pointer"
        />
      )}

      <motion.div
        layoutId={`image-${activeImage.index}-${layoutId}`}
        className="w-fit max-w-[100vw] h-[100dvh] flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage.src}
            initial={{ opacity: 0, x: activeImage.index > (floorGallery.findIndex(item => item.image === activeImage.src) -1) ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeImage.index > (floorGallery.findIndex(item => item.image === activeImage.src) -1) ? -50 : 50 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full p-4 flex flex-col items-center justify-center"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              width={1600}
              height={1000}
              className="h-full w-auto object-contain shadow-2xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 text-center bg-gradient-to-t from-black/60 to-transparent w-[calc(100%-2rem)] pb-4 pt-8"
            >
              <h3 className="font-semibold text-lg mb-1 text-white">
                {activeImage.title}
              </h3>
              <p className="text-sm text-white/70 font-semibold">
                {activeImage.description}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {activeImage.index < floorGallery.length - 1 && floorGallery[activeImage.index + 1] && (
        <IoChevronForward
          onClick={onNext} 
          className="flex absolute top-1/2 right-4 items-center justify-center text-white/50 h-10 w-10 z-10 shadow-lg hover:text-white transition-colors cursor-pointer"
        />
      )}
    </div>
  );
};

export default GalleryModal;
