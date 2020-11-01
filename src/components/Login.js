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
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      width: "100%",
      paddingBottom: theme.spacing(0.5),
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
  const passwordRef = useRef();

  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h4">Log In</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit} autoComplete="false">
            <FormControl className={classes.formControl} id="email">
              <TextField
                type="email"
                inputRef={emailRef}
                required
                label="Email"
              />
            </FormControl>
            <FormControl className={classes.formControl} id="password">
              <TextField
                type="password"
                inputRef={passwordRef}
                required
                label="Password"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                type="submit"
              >
                Log In
              </Button>
            </FormControl>
          </form>
          <div className={classes.link}>
            <Link to="/forgot-password">Forgot Password?</Link>
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
