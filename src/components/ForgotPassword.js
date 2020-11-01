import React, { useRef, useState } from "react";
import {
  FormControl,
  Button,
  Card,
  CardContent,
  TextField,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      width: "100%",
    },
    link: {
      width: "100%",
      textAlign: "left",
      paddingTop: theme.spacing(0.5),
    },
  })
);

function Signup() {
  const classes = useStyles();
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h4">Password Reset</Typography>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <form onSubmit={handleSubmit} autoComplete={false}>
            <FormControl
              className={classes.formControl}
              id="email"
              margin="normal"
            >
              <TextField
                type="email"
                inputRef={emailRef}
                required
                label="Email"
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              id="submit"
              margin="normal"
            >
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                type="submit"
              >
                Reset Password
              </Button>
            </FormControl>
          </form>
          <div className={classes.link}>
            <Link to="/login">Log in</Link>
          </div>
        </CardContent>
      </Card>
      <div className={classes.link}>
        Need an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
}

export default Signup;
