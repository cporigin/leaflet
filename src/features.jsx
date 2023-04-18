import { isEmpty } from 'lodash';
import floorPlanStore from './stores/floor-plan.store';
import CustomEditControl from './edit-control';
import Markers from './markers';
import Polygons from './polygons';

export default function FeatureLeaflet() {
  const [tempMarkers, selectedLayerNotEmpty, isNotAdding] = floorPlanStore(
    (e) => [e.tempLayers, !isEmpty(e.selectedLayer), e.mode !== 'add']
  );

  if (isEmpty(tempMarkers)) {
    return <CustomEditControl />;
  }

  return (
    // if mode === 'add' will enable and must
    <CustomEditControl disabled={isNotAdding || selectedLayerNotEmpty}>
      <Markers />
      <Polygons />
    </CustomEditControl>
  );
}
