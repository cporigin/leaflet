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
  polygonHandleClick: () => {},
};

const componentStore = create(
  immer(
    combine(componentState, (set, get) => ({
      setComponents: (components) => set({ ...components }),
    }))
  )
);

export default componentStore;
