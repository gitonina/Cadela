import { create } from "zustand";
import type { CyclingRace } from '../types/cyclingRace';
import cyclingRaceService from '../services/cyclingRaces';

interface CyclingRacesState {
  races: CyclingRace[];
  upcomingRaces: CyclingRace[];
  pastRaces: CyclingRace[];
  nextRace: CyclingRace | null;
  isLoading: boolean;
  error: string | null;

  fetchAllRaces: () => Promise<void>;
  fetchUpcomingRaces: () => Promise<void>;
  fetchPastRaces: () => Promise<void>;
  fetchNextRace: () => void;
  getRaceById: (id: string) => Promise<CyclingRace | undefined>;
  getPastRaceById: (id: string) => Promise<CyclingRace | undefined>;
}

export const useCyclingRacesStore = create<CyclingRacesState>((set, get) => ({
  races: [],
  upcomingRaces: [],
  pastRaces: [],
  nextRace: null,
  isLoading: false,
  error: null,

  fetchAllRaces: async () => {
    set({ isLoading: true, error: null });
    try {
      const races = await cyclingRaceService.getAllRaces();
      set({ races, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchUpcomingRaces: async () => {
    set({ isLoading: true, error: null });
    try {
      const upcomingRaces = await cyclingRaceService.getUpcomingRaces();
      set({ upcomingRaces, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchPastRaces: async () => {
    set({ isLoading: true, error: null });
    try {
      const pastRaces = await cyclingRaceService.getPastRaces();
      set({ pastRaces, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchNextRace: async () => {
    set({ isLoading: true, error: null });
    try {
      const nextRace = await cyclingRaceService.getNextRace();
      set({ nextRace, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  getRaceById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const race = await cyclingRaceService.getRaceById(id);
      set({ isLoading: false });
      return race;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  getPastRaceById: async (id: string) => {
    const pastRaces = get().pastRaces;
    set({ isLoading: true, error: null });
    try {
      const race = pastRaces.find(r => r.id === id);
      if (race) {
        set({ isLoading: false });
        return race;
      } else {
        const fetchedRace = await cyclingRaceService.getRaceById(id);
        set({ isLoading: false });
        return fetchedRace;
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));