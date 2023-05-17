import { Grid, Typography } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { Pane, Polygon } from "react-leaflet";
import {
  calculateCenterOfPositions,
  calculatePolybelOfPositions,
} from "../utils/leaflet";
import CustomEditControl from "../edit-control";
import { JSXMarker } from "../markers/jsx-marker";
import ChildrenMarker from "./marker";
import floorPlanStore from "../stores/floor-plan.store";
import polygonStore from "../stores/polygon.store";
import componentStore from "../stores/component.store";

export default function CustomPolygon(props) {
  const { layer, selectedLayer } = props;
  const polygonRef = useRef();
  const statusColor = polygonStore((e) => e.statusColor);
  const [disabledMarker, mode] = floorPlanStore((e) => [
    e.mode === "edit" && selectedLayer,
    e.mode,
  ]);

  const Tooltip = componentStore((e) => e.Tooltip);
  const status = props.layer.status;

  const center = useMemo(
    () =>
      layer.position_data.length === 4
        ? calculateCenterOfPositions(layer.position_data)
        : calculatePolybelOfPositions(layer.position_data),
    [layer.positions]
  );

  const childrenProps = useMemo(
    () => ({ ...layer, center, status }),
    [center, status]
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
        key={layer.id}
        attribution={layer.id}
        color="#2b2b2b"
        fillColor={statusColor?.[props.layer.category]?.color}
        pathOptions={{
          fillOpacity: 0.85,
        }}
        positions={
          layer.position_data?.[0]
            ? layer.position_data?.map((position) => [
                position.lat,
                position.lng,
              ])
            : []
        }
      >
        <Pane style={{ zIndex: 105 }}>
          <Tooltip {...childrenProps} />
        </Pane>
        {!disabledMarker && (
          <Pane style={{ zIndex: 100 }}>
            <ChildrenMarker {...childrenProps}>
              <Pane style={{ zIndex: 105 }}>
                {/* fix cant set eventsPointer: none */}
                <Tooltip {...childrenProps} />
              </Pane>
            </ChildrenMarker>
            <Label {...childrenProps} />
          </Pane>
        )}
      </Polygon>
    </CustomEditControl>
  );
}
