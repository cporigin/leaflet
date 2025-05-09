/**
 * Polygon store - manages state related to map polygons
 */
import { createWithEqualityFn as create } from 'zustand/traditional';
import { IStatusColorMap } from '../types/common';

/**
 * Interface for the polygon store state
 */
interface PolygonState {
  /** Map of status colors for polygons */
  statusColor: IStatusColorMap;
  
  /**
   * Set status color map for polygons
   * @param statusColor - The status color map to set
   */
  setStatusColor: (statusColor: IStatusColorMap) => void;
}

/**
 * Create the polygon store with initial state and actions
 */
const polygonStore = create<PolygonState>()((set) => ({
  statusColor: {},
  setStatusColor: (statusColor) => set({ statusColor })
}));

export default polygonStore;
