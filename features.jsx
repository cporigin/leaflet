import { isEmpty } from "lodash";
import CustomEditControl from "./edit-control";
import Markers from "./markers";
import floorPlanStore from "./stores/floor-plan.store";

export default function FeatureLeaflet() {
  const [tempMarkers, selectedLayerNotEmpty, isNotAdding] = floorPlanStore(
    (e) => [e.tempLayers, !isEmpty(e.selectedLayer), e.mode !== "add"]
  );

  if (isEmpty(tempMarkers)) {
    return <CustomEditControl />;
  }

  return (
    // if mode === 'add' will enable and must
    <CustomEditControl disabled={isNotAdding || selectedLayerNotEmpty}>
      <Markers />
    </CustomEditControl>
  );
}
