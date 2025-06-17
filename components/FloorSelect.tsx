'use client'

import { Floor } from '@/lib/interfaces'
import { useFloorStore } from '@/stores/floor-store'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const FloorSelect = ({ floors }: { floors: Floor[] }) => {
  const { update, clear } = useFloorStore();

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const floorParam = searchParams.get('floor');
    if (floorParam) {
      const selectedFloor = floors.find(f => f.number === +floorParam);
      if (selectedFloor) {
        update(selectedFloor);
      } else {
        
        clear();
      }
    } else {
      const defaultFloor = floors.find(f => f.number === 0);
      if (defaultFloor) {
        update(defaultFloor);
      }
    }
  }, [searchParams, floors, update, clear]); 

  const handleFloorSelect = (floor: Floor) => {
    const params = new URLSearchParams(searchParams);
    params.set('floor', floor.number.toString());
    router.push(`?${params.toString()}`);
  }

  const currentFloorNumber = +(searchParams.get('floor') ?? '');

  return (
    <>
      <h2 className='text-black font-bold text-center md:text-start rounded pt-6 pb-2'>
        Explore Floors
      </h2>

      <div className='flex gap-2 flex-wrap'>
        {floors.map((floor) => (
          <div key={floor.id}>
            <button
              onClick={() => handleFloorSelect(floor)}
              className={`
                w-10 h-10           
                rounded-full       
                flex items-center justify-center 
                hover:scale-105 hover:opacity-70 transition-all duration-100
                text-sm font-bold   
                ${currentFloorNumber === floor.number 
                  ? 'bg-transparent text-foreground border-2 border-foreground' 
                  : 'bg-black text-white'
                }
              `}
            >
              {floor.number}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default FloorSelect;