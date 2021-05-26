import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import WalletPage from "./pages/WalletPage";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "pages/LandingPage";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <AuthPage />
        </Route>
        <Route path="/register">
          <AuthPage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="/wallet">
          <WalletPage />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}
