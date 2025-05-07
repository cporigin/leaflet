/**
 * Marker store - manages state related to map markers
 */
import { create } from 'zustand';
import { IStatusColorMap } from '../types/common';

/**
 * Interface for the marker store state
 */
interface MarkerState {
  /** Map of status colors for markers */
  statusColor: IStatusColorMap;
  
  /**
   * Set status color map for markers
   * @param statusColor - The status color map to set
   */
  setStatusColor: (statusColor: IStatusColorMap) => void;
}

/**
 * Create the marker store with initial state and actions
 */
const markerStore = create<MarkerState>()((set) => ({
  statusColor: {},
  setStatusColor: (statusColor) => set({ statusColor })
}));

export default markerStore;
