
import Link from 'next/link';
import React from 'react'
import { FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import { RiInstagramFill } from 'react-icons/ri';
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-background flex flex-col justify-center md:flex-row md:!justify-between py-10 px-8">
    <p className="text-black text-body-gray text-sm font-inter text-center">
    &copy; {year} Mini Real Estate Floor Selector
    </p>
  <div className=" flex flex-row items-center mx-auto md:m-0 gap-8 ">
    <Link href={''} ></Link>
 <FaXTwitter color="gray" size={24} />
  <RiInstagramFill color="gray" size={24} />
  <FaLinkedin color="gray" size={24}  />
  <FaYoutube color="gray" size={24}  />
  </div>
</footer>
  )
}

export default Footer