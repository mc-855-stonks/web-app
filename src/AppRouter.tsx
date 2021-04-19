import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
  
import Home from "./scenes/Home";
import RoutingTest from "./scenes/RoutingTest";

export default function AppRouter(){
    return(
        <Router>
          <Switch>
          <Route path="/routing-test">
            <RoutingTest />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        </Router>
    );
}