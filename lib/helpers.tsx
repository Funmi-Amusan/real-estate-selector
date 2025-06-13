import { Floor } from "./interfaces"

export const generateFloors = (towerFloors: number): Floor[] => {
    const unitTypes: Floor["unitType"][] = ["Studio", "1BR", "2BR", "3BR"];
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
            title: `Floor ${i + 1} Bedroom`,
            description: `Explore the stunning views and modern design of Floor ${i + 1}.`,
            image: '/greenRoom.jpg'
        },
        {
            id: `gallery-${i + 1}`,
            title: `Floor ${i + 1} Living Room`,
            description: `Explore the stunning views and modern design of Floor ${i + 1}.`,
            image: '/greenRoom.jpg'
        },
        {
            id: `gallery-${i + 1}`,
            title: `Floor ${i + 1} Bathroom`,
            description: `Explore the stunning views and modern design of Floor ${i + 1}.`,
            image: '/greenRoom.jpg'
        },
        {
            id: `gallery-${i + 1}`,
            title: `Floor ${i + 1} Kitchen`,
            description: `Explore the stunning views and modern design of Floor ${i + 1}.`,
            image: '/greenRoom.jpg'
        },
      ],
    }));
  };
  