import { towers } from "@/lib/data";
import TransitionLink from "@/lib/TransitionLink";
import Image from "next/image";


export default function Home() {
  return (
    <section className="h-screen pt-16">
      <h1 className="text-center text-2xl md:text-6xl font-serif text-blue-500 uppercase">Explore Towers</h1>
    <div className=" grid md:grid-cols-3 gap-6 py-12 px-8">
    {towers.map((tower) => (
      <TransitionLink
        key={tower.id}
        href={`towers/${tower.id}`}
        // className="cursor-pointer transition-all duration-300 hover:scale-105"
      >
     <div className="overflow-hidden">
  <Image 
    src={tower.img} 
    alt={tower.name} 
    width={200} 
    height={150} 
    className="object-cover object-bottom w-full h-[60vh] mb-4 mx-auto transform transition-transform duration-500 ease-in-out hover:scale-105"
  />
</div>
     <p className="flex items-center uppercase font-semibold text-base">{tower.name} </p>
      </TransitionLink>
    ))}
  </div>
    </section>
  );
}