import { Box, Chip, Tooltip, Typography } from '@mui/material';

export default function MarkerToolTip(props) {
  if (props.disabled) {
    return props.children;
  }

  return (
    <Tooltip
      className="marker-tooltip"
      placement="top"
      arrow
      title={<MarkerToolTipContent />}
      sx={{ zIndex: 'auto' }}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'background.paper',
            border: '1px solid #C7C7C7',
            boxShadow: '0px 5px 6px rgba(0, 0, 0, 0.25)',
            borderRadius: 2
          }
        },
        arrow: {
          sx: {
            '&:before': {
              border: '1px solid #C7C7C7'
            },
            fontSize: 16,
            color: 'background.paper'
          }
        }
      }}>
      {props.children}
    </Tooltip>
  );
}

export function MarkerToolTipContent(props) {
  return (
    <Box p={1.3} pr={10}>
      <Typography fontSize={20} color="black">
        TG004
      </Typography>
      <Typography fontSize={16} color="#545454">
        อาหาร
      </Typography>
      <Chip
        color="error"
        label="ไม่ว่าง"
        sx={{
          mt: 1
        }}
      />
    </Box>
  );
}
