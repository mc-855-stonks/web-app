import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RoutingTestPage from "./pages/RoutingTestPage";
import CounterPage from "./pages/CounterPage";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/counter">
          <CounterPage />
        </Route>
        <Route path="/routing-test">
          <RoutingTestPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}
