import AppPage from "components/AppPage";
import Header from "components/Header";
import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { getUserSessionId } from "utils/userSession";
import {
  getPerformance,
  selectStatus as selectPerformanceStatus,
} from "slices/performanceSlice";
import {
  getPortfolio,
  selectStatus as selectPortfolioStatus,
} from "slices/portfolioSlice";
import {
  getDailyIncome,
  getMonthlyIncome,
  selectStatus as selectMonthlyIncomeStatus,
} from "slices/monthlyIncomeSlice";
import {
  fetchWalletSummary,
  selectStatus as selectWalletStatus,
} from "slices/walletSlice";
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
  performanceStatus: string,
  walletStatus: string
) => {
  if (
    portfolioStatus === "error" ||
    monthlyIncomeStatus === "error" ||
    benchmarkStatus === "error" ||
    performanceStatus === "error" ||
    walletStatus === "error"
  ) {
    return "error";
  }

  if (
    portfolioStatus === "loading" ||
    monthlyIncomeStatus === "loading" ||
    benchmarkStatus === "loading" ||
    walletStatus === "loading" ||
    performanceStatus === "loading"
  ) {
    return "loading";
  }

  if (
    portfolioStatus === "success" &&
    monthlyIncomeStatus === "success" &&
    benchmarkStatus === "success" &&
    walletStatus === "success" &&
    performanceStatus === "success"
  ) {
    return "success";
  }

  return "";
};

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const performanceStatus = useAppSelector(selectPerformanceStatus);
  const portfolioStatus = useAppSelector(selectPortfolioStatus);
  const monthIncomeStatus = useAppSelector(selectMonthlyIncomeStatus);
  const benchmarkStatus = useAppSelector(selectBenchmarkStatus);
  const walletStatus = useAppSelector(selectWalletStatus);

  const dashboardStatus = getDashboardStatus(
    portfolioStatus,
    monthIncomeStatus,
    benchmarkStatus,
    performanceStatus,
    walletStatus
  );

  const loading = dashboardStatus === "loading";

  useEffect(() => {
    dispatch(getPortfolio());
    dispatch(getMonthlyIncome());
    dispatch(getBenchmark());
    dispatch(getPerformance());
    dispatch(getDailyIncome());
    dispatch(fetchWalletSummary());
  }, [dispatch]);

  return (
    <AppPage>
      {loading && <Loading />}
      <Header>Dashboard</Header>
      <Dashboard />
    </AppPage>
  );
}
