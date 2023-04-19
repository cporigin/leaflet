import produce from "immer";
import floorPlanStore from "@/stores/floor-plan.store";

export default function useMarkerState(status) {
  const mode = floorPlanStore((e) => e.mode);

  const defaultVariants = {
    default: {
      // scale: newScale
    },
    selected: {
      // scale: newScale,
      fill: "red",
      // border: '3px solid black'
    },
  };

  const variants = {
    add: defaultVariants,
    edit: produce(defaultVariants, (draft) => {
      draft.default.cursor = "pointer";
      // draft.selected['cursor'] = 'grab';
    }),
  };

  const whileHover = {
    add: {},
    edit: {
      // scale: newScale,
    },
  };

  const whileDrag = {
    cursor: "grabbing",
    // scale: newScale
  };

  return {
    variants: variants[mode],
    whileHover: whileHover[mode],
    whileDrag,
  };
}
