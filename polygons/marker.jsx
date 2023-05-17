import { useTheme } from "@mui/material/styles";
import { isEmpty } from "lodash";
import { CircleMarker } from "react-leaflet";
import { SPACE_STATUS } from "../constants/space";

export default function ChildrenMarker(props) {
  if (isEmpty(props.position_data)) {
    return <></>;
  }

  const theme = useTheme();

  return (
    <CircleMarker
      center={props.center}
      pathOptions={{
        fillOpacity: 1,
        color: SPACE_STATUS[props.status].color,
        pointerEvents: "none",
      }}
      radius={10}
    >
      {props.children}
    </CircleMarker>
  );
}
