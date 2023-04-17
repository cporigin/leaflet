import { filter, isEmpty, map } from 'lodash';
import motionStore from 'stores/motion.store';
import Polygon from './polygon';

export default function Polygons() {
  const [tempMarkers, selectedSpace] = motionStore((e) => [
    filter(e.tempLayers, { type: 'polygon' }),
    e.selectedSpace
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
