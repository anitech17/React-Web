import { Box, CircularProgress } from "@mui/material";

export const Spinner = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bgcolor="rgba(255, 255, 255, 0.6)"
      zIndex={1300} // MUI modal z-index
    >
      <CircularProgress size={60} color="primary" />
    </Box>
  );
};
