import Link from 'next/link';
import React from 'react'
import { Gi3dMeeple } from "react-icons/gi";
import { IoIosMenu } from "react-icons/io";
const Header = () => {
  return (
    <div className='fixed md:static backdrop-blur-sm h-16 text-foreground flex justify-between items-center w-full  px-8'>
        <Link href={'/'} aria-label='link to homepage' className='flex gap-1 items-center '>
          <Gi3dMeeple className='h-8 w-8' />
          <span className='font-bold text-lg uppercase tracking-wider'>
        3D Homes
          </span>
        </Link>
        <div className='ml-auto'>
          <IoIosMenu className='h-8 w-8' />
        </div>
    </div>
  )
}

export default Header