import { useTheme } from "@mui/material/styles";
import { isEmpty } from "lodash";
import { CircleMarker } from "react-leaflet";

export default function ChildrenMarker(props) {
  if (isEmpty(props.position_data.positions)) {
    return <></>;
  }

  const theme = useTheme();

  return (
    <CircleMarker
      center={props.center}
      pathOptions={{
        fillOpacity: 1,
        color: `${theme.palette[props.status ?? "error"].main}` ?? "#1F8A70",
        pointerEvents: "none",
      }}
      radius={10}
    >
      {props.children}
    </CircleMarker>
  );
}
