import { createWithEqualityFn as create } from 'zustand/traditional'

interface MarkerState {
  statusColor: Record<string, any>;
  setStatusColor: (statusColor: Record<string, any>) => void;
}

const markerStore = create<MarkerState>()((set) => ({
  statusColor: {},
  setStatusColor: (statusColor) => set({ statusColor })
}));

export default markerStore;
