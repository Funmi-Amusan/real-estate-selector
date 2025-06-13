export interface Tower {
    id: string
    name: string
    floors: number
    description: string
    img: string
    imgLandscape: string
    location: string
  }

  export interface Floor {
    id: string;
    number: number;
    area: number;
    unitType: 'Studio' | '1BR' | '2BR' | '3BR' | 'Penthouse';
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
