export const SPACE_STATUS = {
  vacant: {
    value: "vacant",
    label: "ว่าง",
    color: (theme) => theme.palette.success.main,
    background: "rgba(0, 167, 67, 0.2)",
  },
  occupied: {
    value: "occupied",
    label: "ไม่ว่าง",
    color: (theme) => theme.palette.error.main,
    background: "rgba(246, 80, 80, 0.2)",
  },
  temp: {
    value: "temp",
    label: "temp",
    color: (theme) => theme.palette.warning.main,
    background: "rgba(246, 210, 80, 0.2)",
  },
};
