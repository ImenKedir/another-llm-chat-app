import {create} from 'zustand';

type FilterState = {
    selectedFilters: string[];
    setSelectedFilters: (value: string[] | ((prevFilters: string[]) => string[])) => void;
  };
  
export const useFilterStore = create<FilterState>((set) => ({
    selectedFilters: [],
    setSelectedFilters: (value) =>
      set((state) => ({
        selectedFilters: typeof value === 'function' ? value(state.selectedFilters) : value,
      })),
  }));