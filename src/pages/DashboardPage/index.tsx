import AppPage from "components/AppPage";
import Header from "components/Header";
import React from "react";
import { Redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { getUserSessionId } from "utils/userSession";
import {
  getPortfolio,
  selectStatus as selectPortfolioStatus,
} from "slices/portfolioSlice";
import Loading from "components/LoadingOverlay";
import Dashboard from "./components/Dashboard";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const portfolioStatus = useAppSelector(selectPortfolioStatus);
  // TO DO: Incluir demais estados aqui, exemplo: walletSummaryStatus
  const dashboardStatus = portfolioStatus;

  switch (dashboardStatus) {
    case "loading":
      return <Loading />;
    case "":
      if (getUserSessionId()) {
        dispatch(getPortfolio());
        // TO DO: Incluir demais eventos aqui, exemplo: dispatch(getWalletSummary())
        return <div />;
      }
      return <Redirect to="/login" />;
    default:
      return (
        <AppPage>
          <Header>Dashboard</Header>
          <Dashboard />
        </AppPage>
      );
  }
}
