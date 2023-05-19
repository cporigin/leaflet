import { isEmpty } from "lodash";
import { CircleMarker } from "react-leaflet";
import markerStore from "../stores/marker.store";

export default function ChildrenMarker(props) {
  const statusColor = markerStore((e) => e.statusColor);

  if (isEmpty(props.position_data)) {
    return <></>;
  }

  return (
    <CircleMarker
      center={props.center}
      pathOptions={{
        fillOpacity: 1,
        color: statusColor?.[props.status]?.color,
      }}
      radius={10}
      eventHandlers={props.eventHandlers}
    >
      {props.children}
    </CircleMarker>
  );
}
