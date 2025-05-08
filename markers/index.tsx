/**
 * Markers component that renders all map markers
 */
import { memo } from "react";
import { filter, isEmpty } from "lodash";
import CustomMarker from "./marker";
import { JSXMarker } from "./jsx-marker";
import CustomEditControl from "../edit-control";
import floorPlanStore from "../stores/floor-plan.store";
import { ILayer } from "../types/common";

/**
 * Component that renders all markers from the temporary layers
 */
const Markers = memo(function MarkersComponent() {
  const tempMarkers = floorPlanStore((e) => 
    filter(e.tempLayers, { type: "marker" }) as ILayer[]);
  const selectedSpace = floorPlanStore((e) => e.selectedSpace);

  if (isEmpty(tempMarkers)) {
    return <></>;
  }

  return (
    <>
      {tempMarkers.map((marker, key) => {
        const selectedLayer = marker.id === selectedSpace.id;

        return (
          <CustomEditControl key={key} disabled={!selectedLayer}>
            <JSXMarker
              attribution={String(marker.id)}
              position={[
                marker.position_data?.[0].lat ?? 0,
                marker.position_data?.[0].lng ?? 0,
              ]}
              iconOptions={{
                className: "jsx-marker",
                iconSize: [100, 100],
                iconAnchor: [50, 50],
              }}
            >
              <div>
                <CustomMarker
                  type={marker.type}
                  {...marker} // Pass all marker properties
                  id={marker.id}
                />
              </div>
            </JSXMarker>
          </CustomEditControl>
        );
      })}
    </>
  );
});

export default Markers;