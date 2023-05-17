import { Grid, Typography } from "@mui/material";
import { JSXMarker } from "../markers/jsx-marker";

export default function CustomLabel(props) {
  return (
    <JSXMarker
      position={props.center}
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
        // mt={8}
        sx={{
          pointerEvents: "none",
        }}
      >
        <Typography fontWeight={600}>{props.code}</Typography>
      </Grid>
    </JSXMarker>
  );
}
