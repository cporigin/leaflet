/**
 * Tooltip component for displaying information on map elements
 */
import { FC } from "react";
import { Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Tooltip } from "react-leaflet";
import { IBaseComponentProps } from "../types/common";

interface TooltipProps extends IBaseComponentProps {
  center: [number, number];
  code?: string;
  category?: string;
  status?: string;
}

/**
 * A tooltip component that displays space information
 *
 * @param props - Component props including position and metadata
 * @returns Tooltip component
 */

const ChildrenTooltip: FC<TooltipProps> = (props) => {
  return (
    // @ts-ignore
    <Tooltip direction="top" offset={[0, -10]} center={props.center}>
      <Box p={1.3} pr={10} textAlign="left">
        <Typography fontSize={20} color="black">
          {props.code}
        </Typography>
        <Typography fontSize={16} color="#545454">
          {props.category}
        </Typography>
        <Chip
          // @ts-ignore
          color={props.status}
          label={props.status === "success" ? "ว่าง" : "ไม่ว่าง"}
          sx={{
            mt: 1,
          }}
        />
      </Box>
    </Tooltip>
  );
};

export default ChildrenTooltip;
