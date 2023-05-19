import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import Tooltip from "../common/tooltip";
import Label from "../common/tooltip";
import PolygonMarker from "../polygons/marker";

const componentState = {
  Label,
  Tooltip,
  PolygonMarker,
};

const componentStore = create(
  immer(
    combine(componentState, (set, get) => ({
      setComponents: (components) => set({ ...components }),
      setTooltip: (Tooltip) => set({ Tooltip }),
      setPolygonMarker: (PolygonMarker) => set({ PolygonMarker }),
    }))
  )
);

export default componentStore;
