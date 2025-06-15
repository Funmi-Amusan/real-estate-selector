import Image from 'next/image';
import { Floor } from "@/lib/interfaces";


const FloorModal = ({ floor, onClose }: { floor: Floor | null; onClose: () => void }) => {


    console.log('floor', floor)

    if (!floor) return null
  
    return ( 
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
            {floor.gallery?.length > 0 && (
  <Image
    src={floor.gallery[0].image}
    alt={`floor ${floor.number} layout image`}
    width={600}
    height={600}
    className="h-full w-auto object-cover"
  />
)}
  
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
