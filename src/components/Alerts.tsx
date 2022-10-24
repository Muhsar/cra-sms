import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Slide, { SlideProps } from "@material-ui/core/Slide";
import { Alert, Color } from "@material-ui/lab";

type TransitionProps = Omit<SlideProps, "direction">;


const useToast = () => {

  const [show, setAlertOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState<Color|undefined>();
  const [message, setMessage] = React.useState<string | null>(null);
  const [duration, setDurationInMs] = React.useState<number>(6000);

  const showAlert = ({
    severity: s,
    message: m,
    durationInMs = duration,
  }: {
    severity: Color|undefined;
    message: string | null;
    durationInMs: number;
  }) => {
    setAlertOpen(true);
    setSeverity(s);
    setMessage(m);
    // eslint-disable-next-line no-unused-expressions
    durationInMs && setDurationInMs(durationInMs);
  };

  const hideAlert = () => {
    setAlertOpen(false);
    setSeverity(undefined);
    setMessage(null);
  };

  const Toast = () => (
    <Snackbar
      open={show}
      onClose={hideAlert}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={6000}
    >
      <Alert
        onClose={hideAlert}
        severity={severity}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );

  return {
    Toast,
    showAlert,
    hideAlert,
  };
};

export default useToast;
