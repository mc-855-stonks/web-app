import AppPage from "components/AppPage";
import Header from "components/Header";
import React from "react";
import Dashboard from "./components/Dashboard";

export default function DashboardPage() {
  return (
    <AppPage>
      <Header>Dashboard</Header>
      <Dashboard />
    </AppPage>
  );
}
