/**
 * Component that renders all rectangles on the map
 */
import { useMemo } from "react";
import { filter, isEmpty, map } from "lodash";
import floorPlanStore from "../stores/floor-plan.store";
import Rectangle from "./rectangle";
import { ILayer } from "../types/common";

/**
 * Container component for all rectangles on the map
 * Filters rectangle layers with position data from the store and renders them
 *
 * @returns Collection of rectangle components
 */
export default function Rectangles() {
  const tempLayers = floorPlanStore((e) => e.tempLayers);
  const selectedSpace = floorPlanStore((e) => e.selectedSpace);

  const tempRectangles = useMemo(
    () => filter(tempLayers, (el) => el.type === "rectangle" && el.position_data) as ILayer[],
    [tempLayers]
  );

  if (isEmpty(tempRectangles)) {
    return <></>;
  }

  return (
    <>
      {map(tempRectangles, (layer, index) => (
        <Rectangle
          key={layer.id?.toString() || index}
          layer={layer}
          selectedLayer={layer.id === selectedSpace.id}
        />
      ))}
    </>
  );
}