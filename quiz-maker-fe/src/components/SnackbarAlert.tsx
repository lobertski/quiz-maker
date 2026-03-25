import { Alert, type AlertColor, Snackbar } from "@mui/material";

interface SnackbarAlertProps {
  message: string | null;
  onClose: () => void;
  severity?: AlertColor;
  variant?: "filled" | "outlined" | "standard";
  autoHideDuration?: number;
}

export default function SnackbarAlert({
  message,
  onClose,
  severity = "error",
  variant = "filled",
  autoHideDuration = 5000,
}: SnackbarAlertProps) {
  return (
    <Snackbar
      open={!!message}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      onClose={onClose}
    >
      <Alert severity={severity} variant={variant} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
