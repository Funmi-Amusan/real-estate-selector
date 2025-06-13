import { towers } from '@/lib/data'
import { generateFloors } from '@/lib/helpers'
import React from 'react'
import Image from "next/image";
import LayoutGallery from '@/components/LayoutGallery';
import FloorSelect from '@/components/FloorSelect';

interface PageProps {
  params: { towerId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = ({ params, searchParams }: PageProps) => {
  const tower = towers.find((t) => t.id === params.towerId)
  if (!tower) {
    return <div>Tower not found</div>
  }

  const floors = generateFloors(tower.floors)
const floor: number = searchParams.floor !== undefined ? +searchParams.floor : floors[0].number

const floorGallery = floors.find(f => f.id === `floor-${floor}`);

if (!floorGallery) {
  return <div>Floor not found</div>;
}

  return (
    <section className='pt-4'>
      <div className=' grid grid-cols-1 md:grid-cols-6 gap-4 p-8'>
       <div className=' p-4 col-span-2'>
         <h1 className='text-4xl font-bold'>{tower.name}</h1>
        
         <table className='w-full my-6 '>
            <tbody>
              <tr className='flex justify-between py-2 border-t'>
                <td className='font-bold'>Floors</td>
                <td>{tower?.floors}</td>
              </tr>
              <tr className='flex justify-between py-2 border-t'>
                <td className='font-bold'>Apartments</td>
                <td>{floors?.reduce((acc, floor) => acc + floor.total, 0)}</td>
              </tr>
              <tr className='flex justify-between py-2 border-t border-b'>
                <td className='font-bold'>Location</td>
                <td>{tower?.location}</td>
              </tr>
            </tbody>
         </table>
         <p>{tower?.description}</p>
         <FloorSelect floors={floors} />
       </div>
        <Image src={tower?.imgLandscape} alt={tower?.name} width={200} height={150} className=" object-cover col-span-4 rounded-xl w-full h-[60vh] mb-4" />
      </div>
     <LayoutGallery floor={floorGallery} />
    </section>
  )
}

export default page