import { towers } from '@/lib/data'
import { generateFloors } from '@/lib/helpers'
import React from 'react'
import LayoutGallery from '@/components/LayoutGallery';
import FloorSelect from '@/components/FloorSelect';
import InteractiveBuilding from '@/components/3DModel';

interface PageProps {
  params: Promise<{ towerId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const page = ({ params }: PageProps) => {
  const tower = towers.find(async (t) => t.id === (await params).towerId)
  if (!tower) {
    return <div>Tower not found</div>
  }

  const floors = generateFloors(tower.floors)

  return (
    <section className='pt-16 md:pt-4'>
      <div className='grid grid-cols-1 md:grid-cols-6 gap-4 p-4 md:p-8'>
       <div className='p-4 md:p-4 col-span-1 md:col-span-2'>
         <h1 className='text-3xl md:text-4xl text-center md:text-start'>{tower.name}</h1>
         <table className='w-full my-6'>
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
         <FloorSelect floors={floors} />
       </div>
       <div className='col-span-1  md:col-span-4 min-h-[70vh] md:min-h-auto'>
         <InteractiveBuilding floors={floors} />
       </div>
     </div>
     <LayoutGallery />
    </section>
  )
}

export default page