/**
 * Label component for displaying text on map elements
 */
import { FC } from "react";
import { Grid, Typography } from "@mui/material";
import { JSXMarker } from "../markers/jsx-marker";
import { IBaseComponentProps } from "../types/common";

export interface LabelProps extends IBaseComponentProps {
  center: [number, number];
  code?: string;
}

/**
 * A label component for displaying text on map elements
 * 
 * @param props - Component props including position and text content
 * @returns Label component
 */
const CustomLabel: FC<LabelProps> = (props) => {
  return (
    <JSXMarker
      position={props.center}
      // @ts-ignore
      className="jsx-marker"
      attribution="polygon-jsx-marker"
      iconOptions={{
        className: "polygon-jsx-marker",
        iconSize: [100, 100],
        iconAnchor: [50, 50],
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        height="inherit"
        mt={4}
        sx={{
          pointerEvents: "none",
        }}
      >
        <Typography fontWeight={600}>{props.code}</Typography>
      </Grid>
    </JSXMarker>
  );
};

export default CustomLabel;