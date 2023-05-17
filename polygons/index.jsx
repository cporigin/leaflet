import { filter, isEmpty, map } from "lodash";
import floorPlanStore from "../stores/floor-plan.store";
import Polygon from "./polygon";

export default function Polygons() {
  const [tempLayers, selectedSpace] = floorPlanStore((e) => [
    e.tempLayers,
    e.selectedSpace,
  ]);

  if (isEmpty(tempLayers)) {
    return <></>;
  }

  return (
    <>
      {map(tempLayers, (e, index) => (
        <Polygon layer={e} selectedLayer={e.id === selectedSpace.id} />
      ))}
    </>
  );
}
