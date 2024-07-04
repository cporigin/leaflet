import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { default as Label, default as Tooltip } from "../common/tooltip";
import PolygonMarker from "../polygons/marker";

export type TComponentStore = {
  Label: any;
  Tooltip: any;
  PolygonMarker: any;
  polygonProps: (props: any) => any;
  polygonHandleClick: () => void;
  setComponents: (components: TComponentStore) => void;
};

const componentStore = create<TComponentStore>()(
  immer((set, get) => ({
    Label,
    Tooltip,
    PolygonMarker,
    polygonProps: (props) => {},
    polygonHandleClick: () => {},
    setComponents: (components) => set({ ...components }),
  }))
);

export default componentStore;
