'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { IoChevronForward, IoChevronBackOutline } from 'react-icons/io5';
import React, { RefObject } from 'react';
import { Gallery } from '@/lib/interfaces';

type ActiveImage = {
  src: string;
  alt: string;
  index: number;
  title: string;
  description: string;
};

interface GalleryModalProps {
  activeImage: ActiveImage;
  floorGallery: Gallery[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  modalRef: RefObject<HTMLDivElement|null>;
  layoutId: string;
}

const GalleryModal = ({
  activeImage,
  floorGallery,
  onClose,
  onNext,
  onPrev,
  modalRef,
  layoutId
}: GalleryModalProps) => {
  return (
    <div className="fixed inset-0 grid place-items-center z-[100]">
      <motion.button
        key={`button-${activeImage.index}-${layoutId}`}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.05 } }}
        className="flex absolute top-4 right-4 items-center justify-center bg-white rounded-full h-10 w-10 z-10 shadow-lg hover:bg-gray-100 transition-colors"
        onClick={onClose}
      >
        <p>X</p>
      </motion.button>

      {floorGallery[activeImage.index - 1] && (
        <IoChevronBackOutline
          onClick={onPrev}
          className="flex absolute top-1/2 left-4 items-center justify-center text-white/50 h-10 w-10 z-10 shadow-lg hover:text-white transition-colors"
        />
      )}

      <motion.div
        layoutId={`image-${activeImage.index}-${layoutId}`}
        ref={modalRef}
        className="w-fit max-w-[100vw] h-[100dvh] flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative w-full h-full  p-4 flex flex-col items-center justify-center"
        >
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            width={1600}
            height={1000}
            className=" h-full w-auto object-contain  shadow-2xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 text-center bg-gradient-to-t from-black/40  to-transparent w-[calc(100%-2rem)] pb-4 pt-8 "
          >
            <h3 className="font-semibold  text-lg mb-1 text-white">
              {activeImage.title}
            </h3>
            <p className=" text-sm text-white/70 font-semibold">
              {activeImage.description}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {floorGallery[activeImage.index + 1] && (
        <IoChevronForward
          onClick={onNext}
          className="flex absolute top-1/2 right-4 items-center justify-center text-white/50 h-10 w-10 z-10 shadow-lg hover:text-white transition-colors"
        />
      )}
    </div>
  );
};

export default GalleryModal;
