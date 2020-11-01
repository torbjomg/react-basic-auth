import React, { useState } from "react";

import { Button, Card, CardContent } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  };
  return (
    <>
      <Card>
        <CardContent>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert severity="error">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Button
            className="w-100 mt-2"
            href="/update-profile"
            color="primary"
            disableElevation
          >
            Update Profile
          </Button>
        </CardContent>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button
          variant="contained"
          color="primary"
          className="w-100"
          type="submit"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    </>
  );
}

export default Dashboard;
