import React, { useState } from "react";
import { Button, Card, CardContent, FormControl } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

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
    updateProfileBtn: {
      float: "right",
    },
  })
);

function Dashboard() {
  const classes = useStyles();
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
          <Typography variant="h4">Profile</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Button
            className={classes.updateProfileBtn}
            href="/update-profile"
            color="primary"
            disableElevation
          >
            Update Profile
          </Button>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
}

export default Dashboard;
