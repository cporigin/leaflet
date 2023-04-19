import { Place } from "@mui/icons-material";
import { motion, useDragControls } from "framer-motion";
import floorPlanStore from "@/stores/floor-plan.store";
import MarkerToolTip from "../tooltip";
import useMarkerState from "./hook";

export default function PinMarker(props) {
  const controls = useDragControls();

  const isEditing = floorPlanStore((e) => e.mode === "edit");

  const markerState = useMarkerState();
  const MotionPin = motion(Place);

  return (
    <MarkerToolTip>
      <MotionPin
        {...props}
        drag={isEditing && props.isSelected}
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
}
