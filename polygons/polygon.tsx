/**
 * Custom polygon component with additional functionality
 */
import { FC, useEffect, useMemo, useRef } from "react";
import { Pane, Polygon } from "react-leaflet";
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
import { Path } from "leaflet";
import { nanoid } from "nanoid";

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
	const polygonRef = useRef<Path>(null);

	const statusColor = polygonStore((e) => e.statusColor);
	const disabledMarker = floorPlanStore(
		(e) => e.mode === "edit" && selectedLayer,
	);
	const mode = floorPlanStore((e) => e.mode);

	const { Tooltip, Label, PolygonMarker, polygonHandleClick, polygonProps } =
		componentStore();

	const status = props.layer.status;

	// Calculate the center of the polygon for positioning related elements
	const center = useMemo(
		() =>
			layer.position_data?.[0] && layer.position_data.length === 4
				? calculateCenterOfPositions(layer.position_data)
				: calculatePolybelOfPositions(layer.position_data || []),
		[layer.position_data],
	);

	const childrenProps = useMemo(
		() => ({ ...layer, center, status }),
		[layer, center, status],
	);

	// Enable editing for selected polygons in edit mode
	useEffect(() => {
		if (polygonRef.current && props?.selectedLayer) {
			// @ts-ignore
			polygonRef.current?.editing?.enable?.();
		}
		if (mode !== "edit") {
			// @ts-ignore
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
				positions={map(
					layer.position_data || [],
					(position: IPosition) =>
						[position.lat, position.lng] as [number, number],
				)}
				{...polygonProps({ layer, status, center })}
			>
				<Pane name={`tooltip-pane-${nanoid()}`}>
					<Tooltip {...childrenProps} />
				</Pane>
				{!disabledMarker && (
					<Pane name={`polygon-marker-pane-${nanoid()}`}>
						<PolygonMarker
							eventHandlers={{
								click: () => polygonHandleClick(layer.id),
							}}
							{...childrenProps}
						>
							<Pane name={`tooltip-inner-pane-${nanoid()}`}>
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
