export const SPACE_STATUS = {
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
    color: (theme) => theme.palette.warning.main,
    background: "#F6D250",
  },
};
