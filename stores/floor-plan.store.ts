import { remove } from "lodash";
import { createRef } from "react";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface ISelectedSpace {
  id?: string | number;
}

interface IPosition {
  lat?: number;
  lng?: number;
}

interface ITempPayload {
  type: "marker" | "polygon";
  positions?: IPosition[];
}

const floorPlanState = {
  mode: "default",
  selectedLayer: {},
  layers: [] as any[],
  tempLayers: [] as any[],
  mapControl: {},
  mapRef: createRef(),
  selectedSpace: {} as ISelectedSpace,
  flyTo: () => {},
  removeControl: () => {},
  isDownload: false,
};

const floorPlanStore = create(
  immer(
    combine(floorPlanState, (set, get) => ({
      setMode: (newMode: string) => {
        const isDeselected = !newMode || newMode === "default";

        set({
          mode: newMode,
          ...(isDeselected && { selected: {}, selectedSpace: {} }),
        });
      },
      setSelectedLayer: (selectedLayer: { id: any }) =>
        set((e) => {
          if (e.selectedSpace.id === selectedLayer.id) {
            return { selectedSpace: {} };
          }
          return { selectedLayer };
        }),
      clearSelectedLayer: () => set({ selectedLayer: {} }),
      setLayers: (layers: never[]) =>
        set({
          layers,
          tempLayers: layers,
        }),
      setTempLayers: (tempLayers: any[]) => set({ tempLayers }),
      addTempLayer: (payload: ITempPayload) =>
        set((draft) => {
          const newLayer = {
            ...draft.selectedSpace,
            ...payload,
          };

          draft.tempLayers = [...draft?.layers, newLayer];
          draft.selectedLayer = newLayer;
        }),
      updateTempLayer: (payload: ITempPayload) =>
        set((e) => {
          const markerIndex = e.layers.findIndex(
            (layer: { id: any }) => layer.id === e.selectedSpace.id
          );

          e.tempLayers[markerIndex] = {
            ...e.selectedSpace,
            ...payload,
          };
        }),
      removeLayer: (id: any) =>
        set((draft) => {
          draft.layers = draft.layers.filter((e: { id: any }) => e.id !== id);
          draft.tempLayers = draft.layers;
        }),
      removeTempLayer: (id: any) =>
        set((draft) => {
          draft.tempLayers = draft.tempLayers.filter(
            (e: { id: any }) => e.id !== id
          );
        }),
      removeTempLayers: (ids: number[]) =>
        set((draft) => {
          draft.tempLayers = remove(draft.tempLayers, ids);
        }),
      clearLayers: () => set({ layers: [] }),
      saveTempLayers: () =>
        set((e) => ({ mode: "default", layers: [...e.tempLayers] })),
      resetTempLayers: () =>
        set((e) => ({ mode: "default", tempLayers: e.layers })),
      setSelectedSpace: (selectedSpace: any) => set({ selectedSpace }),
      // cosmetic
      setMap: (map: any) => set({ mapControl: map }),
      setFlyTo: (flyTo: any) => set({ flyTo }),
      setRemoveControl: (removeControl: any) => set({ removeControl }),
      setIsDownload: (isDownload: boolean) => set({ isDownload }),
    }))
  )
);

export default floorPlanStore;
