/**
 * Custom rectangle component with additional functionality
 */
import { FC, useEffect, useMemo, useRef } from "react";
import { Pane, Rectangle } from "react-leaflet";
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

interface CustomRectangleProps extends IBaseComponentProps {
	layer: ILayer;
	selectedLayer?: boolean;
}

/**
 * Enhanced rectangle component with editing capabilities and visual features
 *
 * @param props - Component props including layer data and selection state
 * @returns Rectangle component with appropriate editing controls
 */
const CustomRectangle: FC<CustomRectangleProps> = (props) => {
	const { layer, selectedLayer } = props;
	const rectangleRef = useRef<Path>(null);
	const statusColor = polygonStore((e) => e.statusColor);
	const disabledMarker = floorPlanStore(
		(e) => e.mode === "edit" && selectedLayer,
	);
	const mode = floorPlanStore((e) => e.mode);

	const { Tooltip, Label, PolygonMarker, polygonHandleClick, polygonProps } =
		componentStore();

	const status = props.layer.status;

	// Calculate the center of the rectangle for positioning related elements
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

	// Calculate rectangle bounds from position data
	const bounds = useMemo(() => {
		if (!layer.position_data || layer.position_data.length < 4) {
			return undefined;
		}

		const lats = layer.position_data.map(pos => pos.lat);
		const lngs = layer.position_data.map(pos => pos.lng);

		return [
			[Math.min(...lats), Math.min(...lngs)] as [number, number],
			[Math.max(...lats), Math.max(...lngs)] as [number, number],
		];
	}, [layer.position_data]);

	// Enable editing for selected rectangles in edit mode
	useEffect(() => {
		if (rectangleRef.current && props?.selectedLayer) {
			// @ts-ignore
			rectangleRef.current?.editing?.enable?.();
		}
		if (mode !== "edit") {
			// @ts-ignore
			rectangleRef.current?.editing?.disable?.();
		}
	}, [props?.selectedLayer, mode]);

	if (!bounds) {
		return null;
	}

	return (
		<CustomEditControl disabled={!selectedLayer}>
			<Rectangle
				ref={rectangleRef as any}
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
				bounds={bounds}
				{...polygonProps({ layer, status, center })}
			>
				<Pane name={`tooltip-pane-${nanoid()}`}>
					<Tooltip {...childrenProps} />
				</Pane>
				{!disabledMarker && (
					<Pane name={`rectangle-marker-pane-${nanoid()}`}>
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
			</Rectangle>
		</CustomEditControl>
	);
};

export default CustomRectangle;