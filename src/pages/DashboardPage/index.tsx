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
import {
  getMonthlyIncome,
  selectStatus as selectMonthlyIncomeStatus,
} from "slices/monthlyIncomeSlice";
import {
  getBenchmark,
  selectStatus as selectBenchmarkStatus,
} from "slices/benchmarkSlice";
import Loading from "components/LoadingOverlay";
import Dashboard from "./components/Dashboard";

const getDashboardStatus = (
  portfolioStatus: string,
  monthlyIncomeStatus: string,
  benchmarkStatus: string,
) => {
  if (
    portfolioStatus === "error" ||
    monthlyIncomeStatus === "error" ||
    benchmarkStatus === "error"
  ) {
    return "error";
  }

  if (
    portfolioStatus === "loading" ||
    monthlyIncomeStatus === "loading" ||
    benchmarkStatus === "loading"
  ) {
    return "loading";
  }

  if (
    portfolioStatus === "success" &&
    monthlyIncomeStatus === "success" &&
    benchmarkStatus === "success"
  ) {
    return "success";
  }

  return "";
};

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const portfolioStatus = useAppSelector(selectPortfolioStatus);
  const monthIncomeStatus = useAppSelector(selectMonthlyIncomeStatus);
  const benchmarkStatus = useAppSelector(selectBenchmarkStatus);

  const dashboardStatus = getDashboardStatus(
    portfolioStatus,
    monthIncomeStatus,
    benchmarkStatus,
  );

  switch (dashboardStatus) {
    case "loading":
      return <Loading />;
    case "":
      if (getUserSessionId()) {
        dispatch(getPortfolio());
        dispatch(getMonthlyIncome());
        dispatch(getBenchmark());
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
