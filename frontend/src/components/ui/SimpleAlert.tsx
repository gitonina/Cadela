import { Snackbar, type SnackbarCloseReason } from "@mui/material";

import { useErrorStore } from "../../stores/errorStore";
import { Alert } from "@mui/material";

const SimpleSnackbar = () => {
  const { alertIsOpen, setAlert, message, alertType } = useErrorStore();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log(event);
    setAlert(false);
  };

  return (
    <>
      <Snackbar
        open={alertIsOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          severity={alertType}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SimpleSnackbar;