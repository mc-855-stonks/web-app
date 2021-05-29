import React from "react";
import dashboardStyle from "pages/DashboardPage/components/Dashboard/style.module.css";
import performanceStyle from "pages/DashboardPage/components/Dashboard/components/Performance/style.module.css";
import BarChart from "components/Charts/BarChart";
import {
  selectData,
  selectDisplayType,
  updateDisplayType,
} from "slices/monthlyIncomeSlice";
import { useAppSelector, useAppDispatch } from "hooks";
import incomeStyle from "./style.module.css";
import TimeSelector from "../TimeSelector";

export default function MonthlyIncome() {
  const data = useAppSelector(selectData);
  const displayType = useAppSelector(selectDisplayType);
  const dispatch = useAppDispatch();

  return (
    <div className={dashboardStyle.card}>
      <h2 className={performanceStyle.chartTitle}>Rendimento Mensal (R$)</h2>
      <TimeSelector
        displayType={displayType}
        selectTwelveMonths={() => dispatch(updateDisplayType("12-months"))}
        selectSixMonths={() => dispatch(updateDisplayType("6-months"))}
        selectThreeMonths={() => dispatch(updateDisplayType("3-months"))}
      />
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
