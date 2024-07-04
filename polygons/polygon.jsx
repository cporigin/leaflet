import { useEffect, useMemo, useRef } from "react";
import { Pane, Polygon } from "react-leaflet";
import CustomEditControl from "../edit-control";
import componentStore from "../stores/component.store";
import floorPlanStore from "../stores/floor-plan.store";
import polygonStore from "../stores/polygon.store";
import {
  calculateCenterOfPositions,
  calculatePolybelOfPositions,
} from "../utils/leaflet";
import { map } from "lodash";

export default function CustomPolygon(props) {
  const { layer, selectedLayer } = props;
  const polygonRef = useRef();

  const statusColor = polygonStore((e) => e.statusColor);

  const [disabledMarker, mode] = floorPlanStore((e) => [
    e.mode === "edit" && selectedLayer,
    e.mode,
  ]);

  const { Tooltip, Label, PolygonMarker, polygonHandleClick, polygonProps } =
    componentStore();

  const status = props.layer.status;

  const center = useMemo(
    () =>
      layer.position_data?.[0] && layer.position_data.length === 4
        ? calculateCenterOfPositions(layer.position_data)
        : calculatePolybelOfPositions(layer.position_data),
    [layer.position_data]
  );

  const childrenProps = useMemo(
    () => ({ ...layer, center, status }),
    [layer, center, status]
  );

  useEffect(() => {
    if (polygonRef.current && props?.selectedLayer) {
      polygonRef.current?.editing?.enable?.();
    }
    if (mode !== "edit") {
      polygonRef.current?.editing?.disable?.();
    }
  }, [props?.selectedLayer, mode]);

  return (
    <CustomEditControl disabled={!selectedLayer}>
      <Polygon
        ref={polygonRef}
        key={`${layer.id}-${layer?.category ?? ""}`}
        attribution={layer.id}
        color="#2b2b2b"
        fillColor={statusColor?.[layer?.category]?.color}
        pathOptions={{
          fillOpacity: 0.85,
        }}
        eventHandlers={{
          click: () => polygonHandleClick(layer.id),
        }}
        positions={map(layer.position_data, (position) => [
          position.lat,
          position.lng,
        ])}
        {...polygonProps}
      >
        <Pane style={{ zIndex: 105 }}>
          <Tooltip {...childrenProps} />
        </Pane>
        {!disabledMarker && (
          <Pane style={{ zIndex: 100 }}>
            <PolygonMarker
              eventHandlers={{
                click: () => polygonHandleClick(layer.id),
              }}
              {...childrenProps}
            >
              <Pane style={{ zIndex: 105 }}>
                {/* fix cant set eventsPointer: none */}
                <Tooltip {...childrenProps} />
              </Pane>
            </PolygonMarker>
            <Label {...childrenProps} />
          </Pane>
        )}
      </Polygon>
    </CustomEditControl>
  );
}
