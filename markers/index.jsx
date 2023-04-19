import { memo } from "react";
import { filter, isEmpty } from "lodash";
import CustomMarker from "./markers";
import { JSXMarker } from "./jsx-marker";
import CustomEditControl from "./edit-control";
import floorPlanStore from "../stores/floor-plan.store";

const Markers = memo(function MarkersComponent() {
  const [tempMarkers, selectedSpace] = floorPlanStore((e) => [
    filter(e.tempLayers, { type: "marker" }),
    e.selectedSpace,
  ]);

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
              attribution={marker.id}
              position={[marker.positions?.[0].lat, marker.positions?.[0].lng]}
              iconOptions={{
                className: "jsx-marker",
                iconSize: [100, 100],
                iconAnchor: [50, 50],
              }}
            >
              <div>
                <CustomMarker />
              </div>
            </JSXMarker>
          </CustomEditControl>
        );
      })}
    </>
  );
});

export default Markers;
