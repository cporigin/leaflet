import { createWithEqualityFn as create } from 'zustand/traditional'

interface PolygonState {
  statusColor: Record<string, any>;
  setStatusColor: (statusColor: Record<string, any>) => void;
}

const polygonStore = create<PolygonState>()((set) => ({
  statusColor: {},
  setStatusColor: (statusColor) => set({ statusColor })
}));

export default polygonStore;
