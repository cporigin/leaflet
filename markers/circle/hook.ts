/**
 * Hook for managing marker state and animations for circle markers
 */
import produce from "immer";
import floorPlanStore from "../../stores/floor-plan.store";

interface VariantStyles {
  cursor?: string;
  scale?: number;
  fill?: string;
  border?: string;
}

interface MarkerState {
  variants: {
    default: VariantStyles;
    selected: VariantStyles;
  };
  whileHover: VariantStyles;
  whileDrag: VariantStyles;
}

/**
 * Custom hook for circle marker state management
 * 
 * @param status - Optional status of the marker
 * @returns Object containing variant styles for different marker states
 */
export default function useMarkerState(status?: string): MarkerState {
  const mode = floorPlanStore((e) => e.mode);

  const defaultVariants: MarkerState["variants"] = {
    default: {
      // scale: newScale
      cursor: undefined,
      scale: undefined,
      fill: undefined,
      border: undefined,
    },
    selected: {
      // scale: newScale,
      fill: "red",
      cursor: undefined,
      scale: undefined,
      border: undefined,
    },
  };

  const variants = {
    add: defaultVariants,
    edit: produce(defaultVariants, (draft) => {
      draft.default.cursor = "pointer";
      // draft.selected['cursor'] = 'grab';
    }),
    default: defaultVariants,
  };

  const whileHover = {
    add: {},
    edit: {
      // scale: newScale,
    },
    default: {},
  };

  const whileDrag = {
    cursor: "grabbing",
    // scale: newScale
  };

  return {
    variants: variants[mode as keyof typeof variants] || variants.default,
    whileHover: whileHover[mode as keyof typeof whileHover] || whileHover.default,
    whileDrag,
  };
}