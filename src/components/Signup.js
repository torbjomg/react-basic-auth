import React, { useRef, useState } from "react";
import {
  FormControl,
  Button,
  Card,
  CardContent,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
function Signup() {
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
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit} autoComplete="false">
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
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}

export default Signup;
