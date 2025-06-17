'use client'
import Link from 'next/link';
import { Gi3dMeeple } from "react-icons/gi";
import { motion } from 'motion/react';

const Header = () => {
 
  return (
    <header className='fixed md:static backdrop-blur-sm h-16 text-foreground flex justify-between items-center w-full px-8 md:px-12 z-50'>
      <Link href={'/'} aria-label='link to homepage' className='flex  gap-1 items-center group'>
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Gi3dMeeple className='h-8 w-8 group-hover:text-blue-500 transition-colors duration-300' />
        </motion.div>
        <span className='font-bold hidden md:block text-lg uppercase tracking-wider group-hover:text-blue-500 transition-colors duration-300'>
          3D Homes
        </span>
      </Link>

    </header>
  );
};

export default Header;