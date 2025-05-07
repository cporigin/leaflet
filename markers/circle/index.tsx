/**
 * Circle marker component for displaying status-colored circular markers
 */
import { FC } from "react";
import { Box } from "@mui/material";
import MarkerToolTip from "../tooltip";
import markerStore from "../../stores/marker.store";
import { IBaseComponentProps } from "../../types/common";

interface CircleMarkerProps extends IBaseComponentProps {
  status?: string;
}

/**
 * A simple circle marker component with color based on status
 * 
 * @param props - Component props including status information
 * @returns Circle marker component
 */
const CicleMarker: FC<CircleMarkerProps> = (props) => {
  const statusColor = markerStore((e) => e.statusColor);

  return (
    <MarkerToolTip>
      <Box
        bgcolor={`${statusColor?.[props.status || ""]?.color}.main`}
        sx={{
          marginTop: "-6%",
          width: 20,
          height: 20,
          borderRadius: "50%",
        }}
      />
    </MarkerToolTip>
  );
};

export default CicleMarker;