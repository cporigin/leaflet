/**
 * Component that renders all polygons on the map
 */
import { useMemo } from "react";
import { filter, isEmpty, map } from "lodash";
import floorPlanStore from "../stores/floor-plan.store";
import Polygon from "./polygon";
import { ILayer } from "../types/common";

/**
 * Container component for all polygons on the map
 * Filters layers with position data from the store and renders them
 *
 * @returns Collection of polygon components
 */
export default function Polygons() {
  const tempLayers = floorPlanStore((e) => e.tempLayers);
  const selectedSpace = floorPlanStore((e) => e.selectedSpace);

  const tempMarkers = useMemo(
    () => filter(tempLayers, (el) => el.position_data) as ILayer[],
    [tempLayers]
  );

  if (isEmpty(tempMarkers)) {
    return <></>;
  }

  return (
    <>
      {map(tempMarkers, (layer, index) => (
        <Polygon
          key={layer.id?.toString() || index}
          layer={layer}
          selectedLayer={layer.id === selectedSpace.id}
        />
      ))}
    </>
  );
}
