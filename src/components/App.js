import React from "react";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AuthProvider from "../contexts/AuthContext";
import Signup from "./Signup";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      paddingBottom: theme.spacing(1.5),
      paddingTop: theme.spacing(5),
    },
  })
);

function App() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
