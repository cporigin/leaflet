import { Box } from "@mui/material";
import MarkerToolTip from "../tooltip";
import markerStore from "@/stores/marker.store";

export default function CicleMarker(props) {
  const statusColor = markerStore((e) => e.statusColor);

  return (
    <MarkerToolTip>
      <Box
        bgcolor={`${statusColor?.[props.status]?.color}.main` ?? "#1F8A70"}
        sx={{
          marginTop: "-6%",
          width: 20,
          height: 20,
          borderRadius: "50%",
        }}
      />
    </MarkerToolTip>
  );
}
