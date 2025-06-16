import { Floor } from "./interfaces"

export const generateFloors = (towerFloors: number): Floor[] => {
    const unitTypes: Floor["unitType"][] = ["Studio", "1 Bedroom", "2 Bedroom", "3 Bedroom"];
    return Array.from({ length: towerFloors }, (_, i) => ({
      id: `floor-${i + 1}`,
      number: i + 1,
      total: Math.floor(Math.random() * 10) + 1,
      area: Math.floor(Math.random() * 500) + 400, 
      unitType: unitTypes[Math.floor(Math.random() * unitTypes.length)], 
      rooms: Math.floor(Math.random() * 4) + 1, 
      gallery: [
        {
            id: `gallery-${i + 1}`,
            title: `Floor ${i + 1} Layout`,
            description: `A peaceful retreat with refined aesthetics, plush furnishings, and abundant natural light for a cozy ambiance`,
            image: '/layout.jpg'
        },
        {
            id: `gallery-${i + 1}`,
            title: `Floor ${i + 1} Kitchen`,
            description: `A chef’s dream, equipped with high-end appliances, elegant countertops, and a thoughtful layout that blends beauty with function.`,
            image: '/kitchen.jpg'
        },
        {
            id: `gallery-${i + 1}`,
            title: `Floor ${i + 1} Living Room`,
            description: `A spacious haven with stylish decor, comfortable seating, and an inviting atmosphere perfect for relaxation.`,
            image: '/livingRoom.jpg'
        },
        {
            id: `gallery-${i + 1}`,
            title: `Floor ${i + 1} Bedroom`,
          
            description: `Sleek and modern, featuring premium finishes, soft lighting, and a spa-like tranquility for ultimate comfort.`,
            image: '/bedroom.jpg'
        },
      ],
    }));
  };
  