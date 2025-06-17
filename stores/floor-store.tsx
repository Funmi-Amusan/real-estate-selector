// stores/floor-store.ts

import { Floor } from '@/lib/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FloorStore {
    floor: Floor | null;
    update: (floor: Floor) => void;
    clear: () => void;
}

export const useFloorStore = create<FloorStore>()(
    persist(
        (set) => ({
            floor: null,
            update: (floor) => set({ floor }),
            clear: () => set({ floor: null }),
        }),
        {
            name: 'floor-storage', 
        }
    )
);