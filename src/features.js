import { isEmpty } from 'lodash';
import motionStore from 'stores/motion.store';
import CustomEditControl from './edit-control';
import Markers from './markers';
import Polygons from './polygons';

export default function FeatureLeaflet() {
  const [tempMarkers, selectedLayerNotEmpty, isNotAdding] = motionStore((e) => [
    e.tempLayers,
    !isEmpty(e.selectedLayer),
    e.mode !== 'add'
  ]);

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
