'use client'

import { Floor } from '@/lib/interfaces'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const FloorSelect = ({floors}: {floors: Floor[]}) => {

    const router = useRouter()
    const searchParam = useSearchParams()
    const handleFloorSelect = (floor: Floor) => {
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
        const newUrl = `${currentPath}?floor=${floor.number}`;
        router.push(newUrl);
    }

  return (
    <>
  <h2  className=' text-black font-bold rounded pt-6 pb-2'>
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
                hover:scale-105 transition-colors duration-100
                text-sm font-bold   ${+((searchParam.get('floor') ?? '')) === floor.number ? 'bg-transparent border-2 border-foreground' : ' bg-foreground text-white'} `}
            >
              {floor.number}
            </button>
          </div>
      ))}
    </div>
    </>
  )
}

export default FloorSelect