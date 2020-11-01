import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  TextField,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

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

function UpdateProfile() {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    setLoading(true);
    setError("");
    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h4">Update Profile</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit} autoComplete={false}>
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
            <FormControl className={classes.formControl} id="submit">
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                type="submit"
              >
                Update
              </Button>
            </FormControl>
          </form>
          <div className={classes.link}>
            <Link to="/">Cancel</Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default UpdateProfile;
