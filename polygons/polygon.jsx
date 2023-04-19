import { Grid, Typography } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';
import { Pane, Polygon } from 'react-leaflet';
import {
  calculateCenterOfPositions,
  calculatePolybelOfPositions
} from '../utils/leaflet';
import CustomEditControl from '../edit-control';
import { JSXMarker } from '../jsx-marker';
import ChildrenMarker from './marker';
import floorPlanStore from '../stores/floor-plan.store';
import ChildrenTooltip from './tooltip';
import polygonStore from '../stores/polygon.store';

export default function CustomPolygon(props) {
  const { layer, selectedLayer } = props;
  const polygonRef = useRef();
  const statusColor = polygonStore((e) => e.statusColor);
  const [disabledMarker, mode] = floorPlanStore((e) => [
    e.mode === 'edit' && selectedLayer,
    e.mode
  ]);

  const status = props.layer.status ? 'error' : 'success';

  const center = useMemo(
    () =>
      layer.positions.length === 4
        ? calculateCenterOfPositions(layer.positions)
        : calculatePolybelOfPositions(layer.positions),
    [layer.positions]
  );

  const childrenProps = useMemo(
    () => ({ ...layer, center, status }),
    [center, status]
  );

  useEffect(() => {
    if (polygonRef.current && props?.selectedLayer) {
      polygonRef.current.editing.enable();
    }
    if (mode !== 'edit') {
      polygonRef.current.editing.disable();
    }
  }, [props?.selectedLayer, mode]);

  return (
    <CustomEditControl disabled={!selectedLayer}>
      <Polygon
        ref={polygonRef}
        key={layer.id}
        attribution={layer.id}
        color="#2b2b2b"
        fillColor={statusColor?.[props.layer.category]?.color}
        pathOptions={{
          fillOpacity: 0.85
        }}
        positions={
          layer.positions?.[0]
            ? layer.positions?.map((position) => [position.lat, position.lng])
            : []
        }>
        <Pane style={{ zIndex: 105 }}>
          <ChildrenTooltip {...childrenProps} />
        </Pane>
        {!disabledMarker && (
          <Pane style={{ zIndex: 100 }}>
            <ChildrenMarker {...childrenProps}>
              <Pane style={{ zIndex: 105 }}>
                {/* fix cant set eventsPointer: none */}
                <ChildrenTooltip {...childrenProps} />
              </Pane>
            </ChildrenMarker>
            <CustomLabel {...childrenProps} />
          </Pane>
        )}
      </Polygon>
    </CustomEditControl>
  );
}

function CustomLabel(props) {
  return (
    <JSXMarker
      position={props.center}
      className="jsx-marker"
      attribution="polygon-jsx-marker"
      iconOptions={{
        className: 'polygon-jsx-marker',
        iconSize: [100, 100],
        iconAnchor: [50, 50]
      }}>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        height="inherit"
        mt={4}
        // mt={8}
        sx={{
          pointerEvents: 'none'
        }}>
        {/* <Chip size="small" color={props.status} label={props.code} /> */}
        <Typography fontWeight={600}>
          {props.code}
          {/* <br />
          {faker.company.companyName()} */}
        </Typography>
      </Grid>
    </JSXMarker>
  );
}
