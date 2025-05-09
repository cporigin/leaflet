/**
 * Component store - provides configurable components for the leaflet implementation
 */
import { ComponentType } from 'react';
import { createWithEqualityFn as create } from 'zustand/traditional';
import { default as DefaultLabel, LabelProps } from "../common/label";
import { default as DefaultTooltip, TooltipProps } from "../common/tooltip";
import DefaultPolygonMarker, { ChildrenMarkerProps } from "../polygons/marker";
import { ILayer } from '../types/common';

/**
 * Interface for the component store state and actions
 */
export interface ComponentStore {
  /** Label component for rendering text labels on the map */
  Label: ComponentType<LabelProps>;
  
  /** Tooltip component for displaying additional information on hover */
  Tooltip: ComponentType<TooltipProps>;
  
  /** Marker component specifically for polygons */
  PolygonMarker: ComponentType<ChildrenMarkerProps>;
  
  /**
   * Function to get additional props for polygon components
   * @param props - Base props for the polygon
   * @returns Additional props to apply to the polygon
   */
  polygonProps: (props: { 
    layer: ILayer; 
    status?: string; 
    center: [number, number];
    [key: string]: any;
  }) => Record<string, any>;
  
  /**
   * Handle click events on polygons
   * @param id - The ID of the clicked polygon
   */
  polygonHandleClick: (id?: string | number) => void;
  
  /**
   * Set custom components in the store
   * @param components - Component overrides to set in the store
   */
  setComponents: (components: Partial<ComponentStore>) => void;
}

/**
 * Create the component store with initial components and actions
 */
const componentStore = create<ComponentStore>()((set) => ({
  Label: DefaultLabel,
  Tooltip: DefaultTooltip,
  PolygonMarker: DefaultPolygonMarker,
  polygonProps: (props) => ({}),
  polygonHandleClick: () => {},
  setComponents: (components) => set((state) => ({ ...state, ...components })),
}));

export default componentStore;
