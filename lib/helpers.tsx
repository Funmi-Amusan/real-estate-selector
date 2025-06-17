import { Floor } from "./interfaces"

export const generateFloors = (towerFloors: number): Floor[] => {
  const unitTypes: Floor["unitType"][] = ["Studio", "1 Bedroom", "2 Bedroom", "3 Bedroom"];
  
  // Generate ground floor
  const groundFloor: Floor = {
    id: "floor-ground",
    number: 0,
    total: 0, 
    area: Math.floor(Math.random() * 1000) + 1500, 
    unitType: "Amenities",
    rooms: 0, 
    gallery: [
      {
          id: `gallery-1`,
          title: `NeverWood Tower Lobby`,
          description: `A grand entrance with sleek modern design, warm lighting, and inviting decor that sets the tone for luxury.`,
          image: '/lobby.jpg'
      },
      {
          id: `gallery-2`,
          title: `NeverWood Tower Balcony`,
          description: `Breathtaking cityscape views paired with elegant railing and comfortable seating—a perfect spot to unwind.`,
          image: '/balcony.jpg'
      },
      {
          id: `gallery-3`,
          title: `NeverWood Tower poolside`,
          description: `Crystal-clear waters, stylish loungers, and a serene atmosphere make this a dreamy escape in the heart of the tower.`,
          image: '/poolside.jpg'
      },
      {
          id: `gallery-4`,
          title: `NeverWood Tower Gym`,
          description: `State-of-the-art equipment in a spacious, well-lit environment designed for peak performance and motivation.`,
          image: '/gym.jpg'
      },
    ],
  };

  // Generate regular residential floors
  const residentialFloors = Array.from({ length: towerFloors }, (_, i) => ({
    id: `floor-${i + 1}`,
    number: i + 1,
    total: Math.floor(Math.random() * 10) + 1,
    area: Math.floor(Math.random() * 500) + 400, 
    unitType: unitTypes[Math.floor(Math.random() * unitTypes.length)], 
    rooms: Math.floor(Math.random() * 4) + 1, 
    gallery: [
      {
        id: `gallery-${i + 1}-layout`,
        title: `Floor ${i + 1} Layout`,
        description: `A peaceful retreat with refined aesthetics, plush furnishings, and abundant natural light for a cozy ambiance`,
        image: '/layout.jpg'
      },
      {
        id: `gallery-${i + 1}-kitchen`,
        title: `Floor ${i + 1} Kitchen`,
        description: `A chef's dream, equipped with high-end appliances, elegant countertops, and a thoughtful layout that blends beauty with function.`,
        image: '/kitchen.jpg'
      },
      {
        id: `gallery-${i + 1}-living`,
        title: `Floor ${i + 1} Living Room`,
        description: `A spacious haven with stylish decor, comfortable seating, and an inviting atmosphere perfect for relaxation.`,
        image: '/livingRoom.jpg'
      },
      {
        id: `gallery-${i + 1}-bedroom`,
        title: `Floor ${i + 1} Bedroom`,
        description: `Sleek and modern, featuring premium finishes, soft lighting, and a spa-like tranquility for ultimate comfort.`,
        image: '/bedroom.jpg'
      },
    ],
  }));

  // Return ground floor first, then residential floors
  return [groundFloor, ...residentialFloors];
};