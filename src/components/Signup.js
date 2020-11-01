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
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h4">Sign Up</Typography>
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
            <FormControl className={classes.formControl} id="password">
              <TextField
                type="password"
                inputRef={passwordConfirmRef}
                required
                label="Password Confirmation"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                type="submit"
              >
                Sign Up
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Card>
      <div className={classes.link}>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}

export default Signup;
