import { memo } from 'react';
import motionStore from 'stores/motion.store';
import CustomMarker from 'components/branch/floor-plan/marker';
import { filter, isEmpty } from 'lodash';
import { JSXMarker } from './jsx-marker';
import CustomEditControl from './edit-control';

const Markers = memo(function MarkersComponent() {
  const [tempMarkers, selectedSpace] = motionStore((e) => [
    filter(e.tempLayers, { type: 'marker' }),
    e.selectedSpace
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
                className: 'jsx-marker',
                iconSize: [100, 100],
                iconAnchor: [50, 50]
              }}>
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
