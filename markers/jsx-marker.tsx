/**
 * Custom JSX marker for Leaflet that allows rendering React components as markers
 */
import L, { DivIconOptions, Marker as LeafletMarker } from "leaflet";
import React, { ForwardedRef, ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Marker, MarkerProps } from "react-leaflet";

interface JSXMarkerProps extends MarkerProps {
  children: ReactNode;
  iconOptions: DivIconOptions;
}

/**
 * React-leaflet marker that allows for fully interactive JSX in icon
 * This component creates a standard Leaflet marker but renders React components inside it
 */
export const JSXMarker = React.forwardRef(
  ({ children, iconOptions, ...rest }: JSXMarkerProps, refInParent: ForwardedRef<LeafletMarker>) => {
    const [ref, setRef] = useState<LeafletMarker | null>(null);
    const [renderedChildren, setRenderedChildren] = useState<ReactNode | null>(null);

    useEffect(() => {
      if (ref) {
        const element = ref.getElement();
        if (element) {
          const node = ReactDOM.createRoot(element);
          // Using render with proper type handling
          node.render(<>{children}</>);
          // We don't need to store the rendered output, just the fact that rendering happened
          setRenderedChildren(children);
        }
      }
    }, [ref, children]);

    return (
      <>
        <Marker
          {...rest}
          ref={(r: LeafletMarker | null) => {
            setRef(r);
            if (refInParent && typeof refInParent === 'object' && r) {
              refInParent.current = r;
            }
          }}
          icon={L.divIcon(iconOptions)}
        />
      </>
    );
  }
);

JSXMarker.displayName = "JSXMarker";