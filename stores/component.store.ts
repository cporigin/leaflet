import { create } from "zustand";
import { default as Label, default as Tooltip } from "../common/tooltip";
import PolygonMarker from "../polygons/marker";

export type TComponentStore = {
  Label: any;
  Tooltip: any;
  PolygonMarker: any;
  polygonProps: (props: any) => any;
  polygonHandleClick: () => void;
  setComponents: (components: Partial<TComponentStore>) => void;
};

const componentStore = create<TComponentStore>()((set) => ({
  Label,
  Tooltip,
  PolygonMarker,
  polygonProps: (props) => ({}),
  polygonHandleClick: () => {},
  setComponents: (components) => set((state) => ({ ...state, ...components })),
}));

export default componentStore;
