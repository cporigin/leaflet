import { Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Tooltip } from "react-leaflet";

export default function ChildrenTooltip(props) {
  return (
    <Tooltip direction="top" offset={[0, -10]} center={props.center}>
      <Box p={1.3} pr={10} textAlign="left">
        <Typography fontSize={20} color="black">
          {props.code}
        </Typography>
        <Typography fontSize={16} color="#545454">
          {props.category}
        </Typography>
        <Chip
          color={props.status}
          label={props.status === "success" ? "ว่าง" : "ไม่ว่าง"}
          sx={{
            mt: 1,
          }}
        />
      </Box>
    </Tooltip>
  );
}
