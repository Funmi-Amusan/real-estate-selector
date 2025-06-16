export interface Tower {
    id: string
    name: string
    floors: number
    description: string
    img: string
    imgLandscape: string
    location: string
    gallery: Gallery[]
  }

  export interface Floor {
    id: string;
    number: number;
    area: number;
    unitType: 'Studio' | '1 Bedroom' | '2 Bedroom' | '3 Bedroom' | 'Penthouse';
    rooms: number;
    gallery: Gallery[];
    total: number
  }

  export interface Gallery {
    id: string;
    title: string;
    description: string;
    image: string;
  }