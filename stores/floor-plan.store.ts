import { remove } from "lodash";
import { createRef } from "react";
import { createWithEqualityFn as create } from 'zustand/traditional'

interface ISelectedSpace {
  id?: string | number;
}

interface IPosition {
  lat?: number;
  lng?: number;
}

interface IPositions {
  positions?: IPosition[];
}

interface ITempPayload {
  type: "marker" | "polygon";
  position_data: IPositions[];
}

interface FloorPlanState {
  mode: string;
  selectedLayer: Record<string, any>;
  layers: any[];
  tempLayers: any[];
  zoomAmplified: number;
  mapControl: Record<string, any>;
  selectedSpace: ISelectedSpace;
  flyTo: () => void;
  removeControl: () => void;
  setMode: (newMode: string) => void;
  setSelectedLayer: (selectedLayer: { id: any }) => void;
  clearSelectedLayer: () => void;
  setLayers: (layers: any[]) => void;
  setTempLayers: (tempLayers: any[]) => void;
  addTempLayer: (payload: ITempPayload) => void;
  updateTempLayer: (payload: ITempPayload) => void;
  removeLayer: (id: any) => void;
  removeTempLayer: (id: any) => void;
  removeTempLayers: (ids: number[]) => void;
  clearLayers: () => void;
  saveTempLayers: () => void;
  resetTempLayers: () => void;
  setZoomAmplified: (zoomAmplified: number) => void;
  setSelectedSpace: (selectedSpace: any) => void;
  setMap: (map: any) => void;
  setFlyTo: (flyTo: any) => void;
  setRemoveControl: (removeControl: any) => void;
}

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
      ...(isDeselected && { selected: {}, selectedSpace: {} }),
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
      };
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
      };
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
      tempLayers: remove(state.tempLayers, ids),
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
