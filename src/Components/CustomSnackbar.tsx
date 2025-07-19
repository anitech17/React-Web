// src/components/CustomSnackbar.tsx
import { forwardRef } from "react";
import { useSnackbar } from "notistack";
import type { CustomContentProps } from "notistack"; // ✅ type-only import

import { Box, Typography, IconButton } from "@mui/material";
import {
  CheckCircle,
  Error,
  Info,
  Warning,
  Close as CloseIcon,
} from "@mui/icons-material";

const iconMap = {
  success: <CheckCircle sx={{ mr: 1, color: "#2e7d32" }} />,
  error: <Error sx={{ mr: 1, color: "#d32f2f" }} />,
  warning: <Warning sx={{ mr: 1, color: "#ed6c02" }} />,
  info: <Info sx={{ mr: 1, color: "#0288d1" }} />,
  default: null,
};

export const CustomSnackbar = forwardRef<HTMLDivElement, CustomContentProps>(
  function CustomSnackbar(props, ref) {
    const { closeSnackbar } = useSnackbar(); // ✅ use hook
    const { id, message, variant = "default", className, style } = props;

    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...style,
          backgroundColor: "#fff",
          color: "#333",
          borderLeft: `5px solid ${
            variant === "success"
              ? "#2e7d32"
              : variant === "error"
              ? "#d32f2f"
              : variant === "warning"
              ? "#ed6c02"
              : "#0288d1"
          }`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          borderRadius: 8,
          minWidth: 300,
          display: "flex",
          alignItems: "center",
          padding: "12px 16px",
        }}
        role="alert"
      >
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          {iconMap[variant]}
          <Typography>{message}</Typography>
        </Box>
        <IconButton onClick={() => closeSnackbar(id)} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
    );
  }
);
