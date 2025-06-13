import { towers } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { TiArrowRight } from "react-icons/ti";


export default function Home() {
  return (
    <section className="h-screen">
      <h1 className="text-center font-bold text-3xl uppercase">Explore Towers in 3D</h1>
    <div className=" grid md:grid-cols-3 gap-6 py-12 px-8">
    {towers.map((tower) => (
      <Link
        key={tower.id}
        href={`towers/${tower.id}`}
        className="cursor-pointer transition-all duration-300 hover:scale-105"
      >
         <Image 
          src={tower.img} 
          alt={tower.name} 
          width={200} 
          height={150} 
          className="object-cover object-bottom w-full h-[60vh] mb-4 mx-auto" 
        />
     <p className="flex items-center uppercase font-semibold text-lg">{tower.name} <TiArrowRight className="inline-block text-foreground" /></p>
      </Link>
    ))}
  </div>
    </section>
  );
}