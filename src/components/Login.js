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
          <h2 className="text-center mb-4">Log In</h2>
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
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              className="w-100"
              type="submit"
            >
              Log In
            </Button>
          </form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </CardContent>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
}

export default Signup;
