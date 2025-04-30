/**
 * Pin marker component for displaying place markers on the map
 */
import { FC } from "react";
import { Place } from "@mui/icons-material";
import { motion, useDragControls } from "framer-motion";
import MarkerToolTip from "../tooltip";
import useMarkerState from "./hook";
import floorPlanStore from "../../stores/floor-plan.store";
import { IBaseComponentProps } from "../../types/common";

interface PinMarkerProps extends IBaseComponentProps {
  isSelected?: boolean;
}

/**
 * A pin marker component with interactive drag behavior
 * 
 * @param props - Component props including selection state
 * @returns Pin marker component
 */
const PinMarker: FC<PinMarkerProps> = (props) => {
  const controls = useDragControls();

  const isEditing = floorPlanStore((e) => e.mode === "edit");

  const markerState = useMarkerState();
  const MotionPin = motion(Place);

  return (
    <MarkerToolTip>
      <MotionPin
        {...props}
        drag={isEditing && !!props.isSelected}
        variants={markerState.variants}
        dragControls={controls}
        dragMomentum={false}
        dragElastic={0}
        dragTransition={{ min: -10, max: -10 }}
        dragPropagation
        style={{
          marginTop: "10%",
          width: 40,
          height: 40,
          borderRadius: "50%",
          fill: "#1F8A70",
        }}
      />
    </MarkerToolTip>
  );
};

export default PinMarker;