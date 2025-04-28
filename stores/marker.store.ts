import { create } from 'zustand';

interface MarkerState {
  statusColor: Record<string, any>;
  setStatusColor: (statusColor: Record<string, any>) => void;
}

const markerStore = create<MarkerState>()((set) => ({
  statusColor: {},
  setStatusColor: (statusColor) => set({ statusColor })
}));

export default markerStore;
