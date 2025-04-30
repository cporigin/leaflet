/**
 * Custom polygon component with additional functionality
 */
import { FC, useEffect, useMemo, useRef } from "react";
import { Pane, Polygon, Path } from "react-leaflet";
import { map } from "lodash";
import CustomEditControl from "../edit-control";
import componentStore from "../stores/component.store";
import floorPlanStore from "../stores/floor-plan.store";
import polygonStore from "../stores/polygon.store";
import {
  calculateCenterOfPositions,
  calculatePolybelOfPositions,
} from "../utils/leaflet";
import { IBaseComponentProps, ILayer, IPosition } from "../types/common";

interface CustomPolygonProps extends IBaseComponentProps {
  layer: ILayer;
  selectedLayer?: boolean;
}

/**
 * Enhanced polygon component with editing capabilities and visual features
 * 
 * @param props - Component props including layer data and selection state
 * @returns Polygon component with appropriate editing controls
 */
const CustomPolygon: FC<CustomPolygonProps> = (props) => {
  const { layer, selectedLayer } = props;
  const polygonRef = useRef<Path>();

  const statusColor = polygonStore((e) => e.statusColor);

  const [disabledMarker, mode] = floorPlanStore((e) => [
    e.mode === "edit" && selectedLayer,
    e.mode,
  ]);

  const { Tooltip, Label, PolygonMarker, polygonHandleClick, polygonProps } =
    componentStore();

  const status = props.layer.status;

  // Calculate the center of the polygon for positioning related elements
  const center = useMemo(
    () =>
      layer.position_data?.[0] && layer.position_data.length === 4
        ? calculateCenterOfPositions(layer.position_data)
        : calculatePolybelOfPositions(layer.position_data || []),
    [layer.position_data]
  );

  const childrenProps = useMemo(
    () => ({ ...layer, center, status }),
    [layer, center, status]
  );

  // Enable editing for selected polygons in edit mode
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
        ref={polygonRef as any}
        key={`${layer.id}-${layer?.category ?? ""}`}
        attribution={String(layer.id)}
        color="#2b2b2b"
        fillColor={statusColor?.[layer?.category ?? ""]?.color}
        pathOptions={{
          fillOpacity: 0.85,
        }}
        eventHandlers={{
          click: () => polygonHandleClick(layer.id),
        }}
        positions={map(layer.position_data || [], (position: IPosition) => [
          position.lat,
          position.lng,
        ])}
        {...polygonProps({ layer, status, center })}
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
};

export default CustomPolygon;