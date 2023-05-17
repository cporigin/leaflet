import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import ChildrenTooltip from "../common/tooltip";
import Label from "../common/tooltip";

const componentState = {
  Label,
  Tooltip: ChildrenTooltip,
};

const componentStore = create(
  immer(
    combine(componentState, (set, get) => ({
      setComponents: (components) => set({ ...components }),
      setTooltip: (Tooltip) => set({ Tooltip }),
    }))
  )
);

export default componentStore;
