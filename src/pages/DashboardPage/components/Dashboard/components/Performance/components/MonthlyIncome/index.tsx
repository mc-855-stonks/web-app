import React from "react";
import dashboardStyle from "pages/DashboardPage/components/Dashboard/style.module.css";
import performanceStyle from "pages/DashboardPage/components/Dashboard/components/Performance/style.module.css";
import BarChart from "components/Charts/BarChart";
import { selectData } from "slices/monthlyIncomeSlice";
import { useAppSelector } from "hooks";
import incomeStyle from "./style.module.css";
import TimeSelector from "../TimeSelector";

export default function MonthlyIncome() {
  const data = useAppSelector(selectData);
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
