/**
 * Hook for managing marker state and animations for pin markers
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
 * Custom hook for pin marker state management
 * 
 * @param status - Optional status of the marker
 * @returns Object containing variant styles for different marker states
 */
export default function useMarkerState(status?: string): MarkerState {
  const mode = floorPlanStore((e) => e.mode);

  const defaultVariants: Record<string, VariantStyles> = {
    default: {
      // scale: newScale
    },
    selected: {
      // scale: newScale,
      fill: "red",
      // border: '3px solid black'
    },
  };

  const variants: Record<string, Record<string, VariantStyles>> = {
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
    variants: {
      default: variants[mode as keyof typeof variants]?.default || variants.default.default,
      selected: variants[mode as keyof typeof variants]?.selected || variants.default.selected,
    },
    whileHover: whileHover[mode as keyof typeof whileHover] || whileHover.default,
    whileDrag,
  };
}