import { Alert, Snackbar } from "@mui/material";

export function AddActivityToast(props: {
  showAlert: boolean;
  handleClose: (event: any) => void;
  alertType: "success" | "info" | "warning";
}): JSX.Element {
  return (
    <Snackbar
      open={props.showAlert}
      autoHideDuration={6000}
      onClose={props.handleClose}
    >
      <Alert
        onClose={props.handleClose}
        severity={props.alertType}
        sx={{ width: "100%" }}
      >
        {props.alertType === "success"
          ? "Successfully add activity!"
          : props.alertType === "info"
          ? "Activity has already been added."
          : "Activity has been removed."}
      </Alert>
    </Snackbar>
  );
}
