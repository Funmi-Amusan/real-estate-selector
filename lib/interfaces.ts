import { RefObject } from "react"
import { ActiveImage } from "./types"

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
    unitType: 'Studio' | '1 Bedroom' | '2 Bedroom' | '3 Bedroom' | 'Penthouse'| 'Amenities';
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

  export interface GalleryModalProps {
    activeImage: ActiveImage;
    floorGallery: Gallery[];
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    modalRef: RefObject<HTMLDivElement | null>;
    layoutId: string;
  }

  export interface FloorModalProps {
    onClose: () => void;
    onImageSelect: (item: Gallery, index: number) => void; 
  }

  export interface SceneProps {
    onFloorClick: (floorIndex: number) => void
    onFloorHover: (floorIndex: number | null) => void
    selectedFloor: number | null
    hoveredFloor: number | null
  }