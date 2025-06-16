import Image from 'next/image';
import { Floor } from "@/lib/interfaces";
import { motion } from 'motion/react';


const FloorModal = ({ floor, onClose }: { floor: Floor | null; onClose: () => void }) => {

    console.log('floor', floor)

    if (!floor) return null
  
    return ( 
      <div className="  z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full h-fit overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Floor {floor.number - 1}</h2>
                <p>{floor.unitType}</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* {floor.gallery?.length > 0 && (
//   <Image
//     src={floor.gallery[0].image}
//     alt={`floor ${floor.number} layout image`}
//     width={600}
//     height={600}
//     className="h-full w-auto object-cover"
//   />
<motion.div
// layoutId={`floor-${index}-${id}`}
// key={index}
className='
  group                              
  relative                            
  flex-none w-[90%] md:w-1/3
  rounded-xl shadow-md
  cursor-pointer
  overflow-hidden
  bg-gray-100               
'
// onClick={() => handleImageClick(item, index)}
whileHover={{ scale: 1.03, y: -5 }}
whileTap={{ scale: 0.98 }}
transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
<Image
  src={floor.gallery[0].image}
  alt={`floor ${floor.number} layout image`}
  width={320}
  height={240}
  className="
    object-cover w-full h-full rounded-xl
    transition-transform duration-500 ease-in-out 
    group-hover:scale-105                       
  "
/>
<div className="
  absolute inset-0 bg-gradient-to-t from-black/20 to-transparent
  opacity-0 group-hover:opacity-100
  transition-opacity duration-300 ease-in-out
  rounded-xl                                      
"></div>
</motion.div>
)} */}

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
                //   onClick={() => handleImageClick(item, index)}
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
                      object-cover w-full h-full rounded-xl
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
    )
  }

  export default FloorModal
