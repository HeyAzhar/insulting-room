import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

//Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Firebase
import firebase from "firebase/app";
import "firebase/auth";

import { UserContext } from "./Context/UserContext";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import PageNotFound from "./Pages/PageNotFound";
import Config from "./Config/FConfig";

//Init Firebase
firebase.initializeApp(Config);

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <UserContext.Provider value={{ user, setUser }}>
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
