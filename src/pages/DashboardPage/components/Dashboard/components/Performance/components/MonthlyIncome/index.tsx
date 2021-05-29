import React from "react";
import dashboardStyle from "pages/DashboardPage/components/Dashboard/style.module.css";
import performanceStyle from "pages/DashboardPage/components/Dashboard/components/Performance/style.module.css";
import BarChart from "components/Charts/BarChart";
import incomeStyle from "./style.module.css";
import TimeSelector from "../TimeSelector";

export default function MonthlyIncome() {
  const data = [
    { name: "Mar/2020", value: 4000, },
    { name: "", value: 3000, },
    { name: "", value: -2000, },
    { name: "", value: 2780, },
    { name: "", value: -300, },
    { name: "", value: 2390, },
    { name: "", value: 2390, },
    { name: "", value: -1500, },
    { name: "", value: 500, },
    { name: "", value: 1800, },
    { name: "", value: -3000, },
    { name: "Abr/2021", value: 3490, },
  ];

  return (
    <div className={dashboardStyle.card}>
      <h2 className={performanceStyle.chartTitle}>Rendimento Mensal (R$)</h2>
      <TimeSelector />
      <div className={incomeStyle.barChartContainer}>
        <BarChart
          dataset={data}
          width={430}
          height={266}
          xAxisDataKey="name"
          yAxisDataKey="value"
          tooltipName="Valor"
          barColor="#A5C1CE"
        />
      </div>
    </div>
  );
}
