import { Floor } from '@/lib/interfaces';
import {create} from 'zustand'

interface floorStore {
    floor: Floor | null;
    update: (floor: Floor) => void
}

export const useFloorStore = create<floorStore>((set) => ({
    floor: null,
    update: (floor) => set(()=> ({floor})),
    clear: () => set({ floor: null }),
}));