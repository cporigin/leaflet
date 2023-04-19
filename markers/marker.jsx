import { memo, useMemo } from "react";
import PinMarker from "./pin";
import CicleMarker from "./circle";
import floorPlanStore from "../stores/floor-plan.store";

const markers = {
  pin: PinMarker,
  circle: CicleMarker,
};

const defaultType = "circle";

const CustomMarker = memo(function Marker(props) {
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
