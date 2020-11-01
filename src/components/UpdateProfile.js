import React, { useRef, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  FormControl,
  TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
function UpdateProfile() {
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
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit} autoComplete={false}>
            <FormControl className="w-100 mb-4" id="email">
              <TextField
                type="email"
                inputRef={emailRef}
                required
                label="Email"
              />
            </FormControl>
            <FormControl className="w-100 mb-4" id="password">
              <TextField
                type="password"
                inputRef={passwordRef}
                required
                label="Password"
              />
            </FormControl>
            <FormControl className="w-100 mb-4" id="password">
              <TextField
                type="password"
                inputRef={passwordConfirmRef}
                required
                label="Password Confirmation"
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              className="w-100"
              type="submit"
            >
              Update
            </Button>
          </form>
          <div className="w-100 text-center mt-3">
            <Link to="/">Cancel</Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default UpdateProfile;
