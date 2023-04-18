import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const markerState = {
  statusColor: {}
};

const markerStore = create(
  immer(
    combine(markerState, (set, get) => ({
      setStatusColor: (statusColor: {}) => set({ statusColor })
    }))
  )
);

export default markerStore;
