import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import Tooltip from "../common/tooltip";
import Label from "../common/tooltip";
import PolygonMarker from "../polygons/marker";
import { FC } from "react";
import { PolygonProps } from "react-leaflet";

export type TComponentStore = {
  Label: FC;
  Tooltip: FC;
  PolygonMarker: FC;
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
