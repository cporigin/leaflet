import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const polygonState = {
  statusColor: {}
};

const polygonStore = create(
  immer(
    combine(polygonState, (set, get) => ({
      setStatusColor: (statusColor: {}) => set({ statusColor })
    }))
  )
);

export default polygonStore;
