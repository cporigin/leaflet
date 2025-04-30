/**
 * Common type definitions for the leaflet project
 */

/**
 * Geographic position with latitude and longitude
 */
export interface IPosition {
  lat: number;
  lng: number;
}

/**
 * Collection of positions
 */
export interface IPositions {
  positions?: IPosition[];
}

/**
 * Selected space object
 */
export interface ISelectedSpace {
  id?: string | number;
  type?: string;
  [key: string]: any;
}

/**
 * Payload structure for temporary layers
 */
export interface ITempPayload {
  type: "marker" | "polygon";
  position_data: IPosition[];
}

/**
 * Status color object structure
 */
export interface IStatusColor {
  value?: string;
  label?: string;
  color: string;
  background?: string;
}

/**
 * Status colors map
 */
export interface IStatusColorMap {
  [key: string]: IStatusColor;
}

/**
 * Common component props
 */
export interface IBaseComponentProps {
  [key: string]: any;
}

/**
 * Layer object structure
 */
export interface ILayer {
  id: string | number;
  type?: string;
  position_data?: IPosition[];
  status?: string;
  category?: string;
  code?: string;
  [key: string]: any;
}