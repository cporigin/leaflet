import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import ChildrenTooltip from "../common/tooltip";

const componentState = {
  Tooltip: ChildrenTooltip,
};

const componentStore = create(
  immer(
    combine(componentState, (set, get) => ({
      setTooltip: (Tooltip: any) => set({ Tooltip }),
    }))
  )
);

export default componentStore;
