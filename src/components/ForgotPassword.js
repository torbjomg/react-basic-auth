import React, { useRef, useState } from "react";
import {
  FormControl,
  Button,
  Card,
  InputLabel,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function Signup() {
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
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <form onSubmit={handleSubmit} autoComplete={false}>
            <FormControl>
              <InputLabel id="email">Email</InputLabel>
              <TextField type="email" ref={emailRef} required />
            </FormControl>

            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Log in</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
}

export default Signup;
