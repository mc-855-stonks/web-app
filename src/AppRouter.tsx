import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "pages/HomePage";
import AuthPage from "pages/AuthPage";
import WalletPage from "pages/WalletPage";
import ProfilePage from "pages/ProfilePage";
import DashboardPage from "pages/DashboardPage";

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
        <Route path="/dashboard">
          <DashboardPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}
