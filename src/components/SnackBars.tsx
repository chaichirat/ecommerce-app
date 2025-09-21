import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import type { SyntheticEvent } from "react";

type ISnackBarsProps = {
  open: boolean;
  setOpen: (values: boolean) => void;
  label: string;
};

export const SnackBars = (props: ISnackBarsProps) => {
  const { open, label, setOpen } = props;

  const handleClose = (
    _: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {label}
        </Alert>
      </Snackbar>
    </>
  );
};
