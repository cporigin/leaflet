import { filter, isEmpty, map } from "lodash";
import floorPlanStore from "../stores/floor-plan.store";
import Polygon from "./polygon";

export default function Polygons() {
  const [tempMarkers, selectedSpace] = floorPlanStore((e) => [
    filter(e.tempLayers, { type: "polygon" }),
    e.selectedSpace,
  ]);

  if (isEmpty(tempMarkers)) {
    return <></>;
  }

  return (
    <>
      {map(tempMarkers, (e, index) => (
        <Polygon layer={e} selectedLayer={e.id === selectedSpace.id} />
      ))}
    </>
  );
}
