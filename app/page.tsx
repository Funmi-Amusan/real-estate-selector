import { Pointer } from "@/components/CustomCursor";
import { towers } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <section className="h-screen pt-16">
      <h1 className="text-center text-2xl md:text-4xl uppercase">Explore Towers</h1>
    <div className=" grid md:grid-cols-3 gap-6 py-12 px-8">
    {towers.map((tower) => (
      
      <Link
        key={tower.id}
        href={`towers/${tower.id}`}
        className="cursor-pointer transition-all duration-300 "
      >
           <Pointer>
           <span className="bg-blue-500 text-sm w-14 h-14 flex items-center justify-center rounded-full text-white font-bold">
  Open
</span>
           </Pointer>
     <div className="overflow-clip">
  <Image 
    src={tower.img} 
    alt={tower.name} 
    width={1000} 
    height={1500} 
    className="object-cover object-bottom w-full md:h-[60vh] mb-4 mx-auto transform rounded-2xl transition-transform duration-500 ease-in-out hover:scale-105"
    priority
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7+mv8AGMuJuBEzUsOByVwCxZ4pFadlxvdP7KdM1+DfMJ2XL5LovUn8o="
/>
</div>
     <p className="flex items-center uppercase font-semibold text-base">{tower.name} </p>
      </Link>
    ))}
  </div>
    </section>
  );
}