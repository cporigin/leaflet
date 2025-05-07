/**
 * Floor plan store - central state management for floor plan and map features
 */
import { remove } from "lodash";
import { createRef } from "react";
import { Map as LeafletMap } from "leaflet";
import { create } from 'zustand';
import { ILayer, IPosition, ISelectedSpace, ITempPayload } from "../types/common";

/**
 * Interface for the floor plan store state and actions
 */
interface FloorPlanState {
  /** Current interaction mode (default, add, edit, etc.) */
  mode: string;
  
  /** Currently selected layer */
  selectedLayer: Partial<ILayer>;
  
  /** All layers on the map */
  layers: ILayer[];
  
  /** Temporary layers (e.g., during editing) */
  tempLayers: ILayer[];
  
  /** Zoom level amplification factor */
  zoomAmplified: number;
  
  /** Reference to the map control */
  mapControl: Partial<LeafletMap>;
  
  /** Selected space information */
  selectedSpace: ISelectedSpace;
  
  /** Function to fly to a location on the map */
  flyTo: () => void;
  
  /** Function to remove a control from the map */
  removeControl: () => void;
  
  /**
   * Set the current interaction mode
   * @param newMode - The new mode to set
   */
  setMode: (newMode: string) => void;
  
  /**
   * Set the selected layer
   * @param selectedLayer - The layer to select
   */
  setSelectedLayer: (selectedLayer: { id: string | number }) => void;
  
  /** Clear the selected layer */
  clearSelectedLayer: () => void;
  
  /**
   * Set all layers
   * @param layers - The layers to set
   */
  setLayers: (layers: ILayer[]) => void;
  
  /**
   * Set temporary layers
   * @param tempLayers - The temporary layers to set
   */
  setTempLayers: (tempLayers: ILayer[]) => void;
  
  /**
   * Add a temporary layer
   * @param payload - The layer payload to add
   */
  addTempLayer: (payload: ITempPayload) => void;
  
  /**
   * Update a temporary layer
   * @param payload - The updated layer payload
   */
  updateTempLayer: (payload: ITempPayload) => void;
  
  /**
   * Remove a layer by id
   * @param id - The id of the layer to remove
   */
  removeLayer: (id: string | number) => void;
  
  /**
   * Remove a temporary layer by id
   * @param id - The id of the temporary layer to remove
   */
  removeTempLayer: (id: string | number) => void;
  
  /**
   * Remove multiple temporary layers by ids
   * @param ids - Array of ids to remove
   */
  removeTempLayers: (ids: number[]) => void;
  
  /** Clear all layers */
  clearLayers: () => void;
  
  /** Save temporary layers to permanent layers */
  saveTempLayers: () => void;
  
  /** Reset temporary layers to match permanent layers */
  resetTempLayers: () => void;
  
  /**
   * Set zoom amplification factor
   * @param zoomAmplified - The zoom amplification factor to set
   */
  setZoomAmplified: (zoomAmplified: number) => void;
  
  /**
   * Set the selected space
   * @param selectedSpace - The space to select
   */
  setSelectedSpace: (selectedSpace: ISelectedSpace) => void;
  
  /**
   * Set the map reference
   * @param map - The map reference to set
   */
  setMap: (map: LeafletMap) => void;
  
  /**
   * Set the flyTo function
   * @param flyTo - The flyTo function to set
   */
  setFlyTo: (flyTo: () => void) => void;
  
  /**
   * Set the removeControl function
   * @param removeControl - The removeControl function to set
   */
  setRemoveControl: (removeControl: () => void) => void;
}

/**
 * Create the floor plan store with initial state and actions
 */
const floorPlanStore = create<FloorPlanState>()((set, get) => ({
  mode: "default",
  selectedLayer: {},
  layers: [],
  tempLayers: [],
  zoomAmplified: 0.5,
  mapControl: {},
  selectedSpace: {},
  flyTo: () => {},
  removeControl: () => {},

  setMode: (newMode) => {
    const isDeselected = !newMode || newMode === "default";
    set({
      mode: newMode,
      ...(isDeselected && { selectedLayer: {}, selectedSpace: {} }),
    });
  },

  setSelectedLayer: (selectedLayer) =>
    set((state) => ({
      selectedLayer:
        state.selectedSpace.id === selectedLayer.id ? {} : selectedLayer,
    })),

  clearSelectedLayer: () => set({ selectedLayer: {} }),

  setLayers: (layers) =>
    set({
      layers,
      tempLayers: layers,
    }),

  setTempLayers: (tempLayers) => set({ tempLayers }),

  addTempLayer: (payload) =>
    set((state) => {
      const newLayer = {
        ...state.selectedSpace,
        ...payload,
      } as ILayer;
      return {
        tempLayers: [...state.layers, newLayer],
        selectedLayer: newLayer,
      };
    }),

  updateTempLayer: (payload) =>
    set((state) => {
      const markerIndex = state.layers.findIndex(
        (layer) => layer.id === state.selectedSpace.id
      );
      const tempLayers = [...state.tempLayers];
      tempLayers[markerIndex] = {
        ...state.selectedSpace,
        ...payload,
      } as ILayer;
      return { tempLayers };
    }),

  removeLayer: (id) =>
    set((state) => ({
      layers: state.layers.filter((e) => e.id !== id),
      tempLayers: state.layers.filter((e) => e.id !== id),
    })),

  removeTempLayer: (id) =>
    set((state) => ({
      tempLayers: state.tempLayers.filter((e) => e.id !== id),
    })),

  removeTempLayers: (ids) =>
    set((state) => ({
      tempLayers: remove([...state.tempLayers], (layer) => !ids.includes(Number(layer.id))),
    })),

  clearLayers: () => set({ layers: [], tempLayers: [] }),

  saveTempLayers: () =>
    set((state) => ({ mode: "default", layers: [...state.tempLayers] })),

  resetTempLayers: () =>
    set((state) => ({ mode: "default", tempLayers: state.layers })),

  setZoomAmplified: (zoomAmplified) =>
    set({ zoomAmplified: zoomAmplified / 2 }),

  setSelectedSpace: (selectedSpace) => set({ selectedSpace }),

  setMap: (map) => set({ mapControl: map }),

  setFlyTo: (flyTo) => set({ flyTo }),

  setRemoveControl: (removeControl) => set({ removeControl }),
}));

export default floorPlanStore;
