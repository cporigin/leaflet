/**
 * Space status constants used throughout the application
 */
import { Theme } from '@mui/material';
import { IStatusColorMap } from '../types/common';

/**
 * Map of space statuses with associated metadata like color and label
 */
export const SPACE_STATUS: IStatusColorMap = {
  vacant: {
    value: "vacant",
    label: "ว่าง",
    color: "#F65050",
    background: "rgba(0, 167, 67, 0.2)",
  },
  occupied: {
    value: "occupied",
    label: "ไม่ว่าง",
    color: "#00A743",
    background: "rgba(246, 80, 80, 0.2)",
  },
  temp: {
    value: "temp",
    label: "temp",
    // @ts-ignore
    color: (theme: Theme) => theme.palette.warning.main,
    background: "#F6D250",
  },
};