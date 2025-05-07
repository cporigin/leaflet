/**
 * Child marker component for polygons
 */
import { FC } from "react";
import { isEmpty } from "lodash";
import { CircleMarker, CircleMarkerProps } from "react-leaflet";
import markerStore from "../stores/marker.store";
import { IBaseComponentProps } from "../types/common";

export interface ChildrenMarkerProps extends IBaseComponentProps {
  position_data?: any[];
  center: [number, number];
  status?: string;
  eventHandlers?: any;
  children?: React.ReactNode;
}

/**
 * Child marker component that represents a polygon center point
 * 
 * @param props - Component properties including position and status
 * @returns Circle marker component or empty fragment if no position data
 */
const ChildrenMarker: FC<ChildrenMarkerProps> = (props) => {
  const statusColor = markerStore((e) => e.statusColor);

  if (isEmpty(props.position_data)) {
    return <></>;
  }

  return (
    <CircleMarker
      center={props.center}
      pathOptions={{
        fillOpacity: 1,
        color: statusColor?.[props.status || '']?.color,
      }}
      radius={10}
      eventHandlers={props.eventHandlers}
    >
      {props.children}
    </CircleMarker>
  );
};

export default ChildrenMarker;