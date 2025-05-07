/**
 * Custom marker component that switches between different marker types
 */
import { FC, memo, useMemo } from "react";
import PinMarker from "./pin";
import CicleMarker from "./circle";
import floorPlanStore from "../stores/floor-plan.store";
import { IBaseComponentProps } from "../types/common";

interface MarkerProps extends IBaseComponentProps {
  type?: string;
  id?: string | number;
  top?: number | string;
  left?: number | string;
}

// Map of marker type implementations
const markers: Record<string, FC<any>> = {
  pin: PinMarker,
  circle: CicleMarker,
};

const defaultType = "circle";

/**
 * Custom marker component with selection state handling
 * 
 * @param props - Component properties including marker type and position
 * @returns The appropriate marker component based on type
 */
const CustomMarker = memo(function Marker(props: MarkerProps) {
  const selectedSpace = floorPlanStore((e) => e.selectedSpace);

  const MotionMarker = markers[props.type ?? defaultType];

  const { id, top, left } = { ...props };

  const status = useMemo(
    () => (id === selectedSpace?.id ? "selected" : "default"),
    [id, selectedSpace?.id]
  );
  const isSelected = status === "selected";

  return (
    <MotionMarker
      type={selectedSpace.type}
      id={`marker-${props.id}`}
      className={`marker-pin-${props?.id}`}
      animate={status}
      isSelected={isSelected}
      {...props}
    />
  );
});

export default CustomMarker;