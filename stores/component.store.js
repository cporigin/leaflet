import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { default as Label, default as Tooltip } from "../common/tooltip";
import CicleMarker from "../markers/circle";
import PolygonMarker from "../polygons/marker";

const componentState = {
  Label,
  Tooltip,
  PolygonMarker,
  polygonHandleClick: () => {},
  CicleMarker,
  circleMarkerHandleClick: () => {},
};

const componentStore = create(
  immer(
    combine(componentState, (set, get) => ({
      setComponents: (components) => set({ ...components }),
    }))
  )
);

export default componentStore;
