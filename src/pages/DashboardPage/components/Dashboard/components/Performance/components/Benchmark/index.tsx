import React from "react";
import dashboardStyle from "pages/DashboardPage/components/Dashboard/style.module.css";
import performanceStyle from "pages/DashboardPage/components/Dashboard/components/Performance/style.module.css";
import TimeSelector from "../TimeSelector";

export default function Benchmark() {
  return (
    <div className={dashboardStyle.card}>
      <h2 className={performanceStyle.chartTitle}>Benchmark</h2>
      <TimeSelector />
    </div>
  );
}
