/**
 * Tooltip component for map markers with customized styling
 */
import { FC, ReactNode, cloneElement, isValidElement } from "react";
import { Box, Chip, Tooltip, TooltipProps, Typography } from "@mui/material";
import { IBaseComponentProps } from "../types/common";

interface MarkerToolTipProps extends IBaseComponentProps {
  children: ReactNode;
  disabled?: boolean;
}

interface MarkerToolTipContentProps extends IBaseComponentProps {
  title?: string;
  subtitle?: string;
  status?: string;
}

/**
 * Marker tooltip content component
 * 
 * @param props - Component props including title, subtitle, and status
 * @returns Tooltip content component
 */
export function MarkerToolTipContent(props: MarkerToolTipContentProps) {
  return (
    <Box p={1.3} pr={10}>
      <Typography fontSize={20} color="black">
        {props.title || "TG004"}
      </Typography>
      <Typography fontSize={16} color="#545454">
        {props.subtitle || "อาหาร"}
      </Typography>
      <Chip
        color="error"
        label="ไม่ว่าง"
        sx={{
          mt: 1,
        }}
      />
    </Box>
  );
}

/**
 * Styled tooltip component for map markers
 * 
 * @param props - Component props including children elements and disabled state
 * @returns Tooltip component wrapping children
 */
const MarkerToolTip: FC<MarkerToolTipProps> = (props) => {
  if (props.disabled) {
    return <>{props.children}</>;
  }

  // Ensure we're passing a valid ReactElement to Tooltip
  if (!isValidElement(props.children)) {
    return <div>{props.children}</div>;
  }

  return (
    <Tooltip
      className="marker-tooltip"
      placement="top"
      arrow
      title={<MarkerToolTipContent />}
      sx={{ zIndex: "auto" }}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "background.paper",
            border: "1px solid #C7C7C7",
            boxShadow: "0px 5px 6px rgba(0, 0, 0, 0.25)",
            borderRadius: 2,
          },
        },
        arrow: {
          sx: {
            "&:before": {
              border: "1px solid #C7C7C7",
            },
            fontSize: 16,
            color: "background.paper",
          },
        },
      }}
    >
      {props.children}
    </Tooltip>
  );
};

export default MarkerToolTip;
export type { MarkerToolTipProps as TooltipProps };