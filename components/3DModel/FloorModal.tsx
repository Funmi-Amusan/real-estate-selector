'use client'

import Image from 'next/image';
import { motion } from 'framer-motion'; 
import { useFloorStore } from '@/stores/floor-store';
import { useEffect } from 'react'; 
import { FloorModalProps, Gallery } from '@/lib/interfaces';


const FloorModal = ({ onClose, onImageSelect }: FloorModalProps) => { 
  const { floor } = useFloorStore();

  useEffect(() => {
    function onKeyDown(event: { key: string; }) {
      if (event.key === "Escape") {
        onClose(); 
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]); 

  if (!floor) return null;

  const handleImageClick = (item: Gallery, index: number) => {
    onImageSelect(item, index); 
  };
  
    return ( 
      <>
      <div className=" fixed inset-0 right-0 flex items-center justify-center z-50"> 
        <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full h-fit overflow-y-auto">
          <div className="p-6">
            <div className="flex items-start mb-4">
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className='flex flex-1 flex-col text-center'>
                <h2 className="text-xl font-bold text-gray-800">Floor {floor.number}</h2>
                <p>{floor.unitType}</p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-2 '>
               {floor.gallery.map((item, index) => (
                <motion.div
                  layoutId={`floor-thumbnail-${item.image}`} 
                  key={item.image} 
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
              
            <div className="space-y-4 mt-4"> 
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
