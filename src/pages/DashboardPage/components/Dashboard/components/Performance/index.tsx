import React from "react";
import dashboardStyle from "pages/DashboardPage/components/Dashboard/style.module.css";
import performanceStyle from "./style.module.css";
import MonthlyIncome from "./components/MonthlyIncome/index";
import Benchmark from "./components/Benchmark/index";

export default function Performance() {
  return (
    <div className={performanceStyle.container}>
      <h2 className={dashboardStyle.sectionTitle}>Desempenho</h2>
      <div className={performanceStyle.chartGroup}>
        <MonthlyIncome />
        <Benchmark />
      </div>
    </div>
  );
}
