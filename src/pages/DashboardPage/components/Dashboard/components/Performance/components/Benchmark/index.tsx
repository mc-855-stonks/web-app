import React from "react";
import dashboardStyle from "pages/DashboardPage/components/Dashboard/style.module.css";
import performanceStyle from "pages/DashboardPage/components/Dashboard/components/Performance/style.module.css";
import LineChart from "components/Charts/LineChart";
import {
  selectData,
  selectDisplayTypes,
  selectTimeSelectionType,
  updateDisplayType,
  updateTimeSelectionType,
} from "slices/benchmarkSlice";
import { useAppSelector, useAppDispatch } from "hooks";
import benchmarkStyle from "./style.module.css";
import TimeSelector from "../TimeSelector";

const LINE_DATA_MAP = new Map([
  ["return", { name: "Carteira", color: "#A5C1CE", }],
  ["ibov", { name: "IBOV", color: "#E8C603", }],
  ["cdi", { name: "CDI", color: "#3F84BF", }],
  ["ipca", { name: "IPCA", color: "#993399", }],
]);

const getLineDataItem = (displayType: string) => {
  const dataMapItem = LINE_DATA_MAP.get(displayType);
  if (!dataMapItem) {
    return { dataKey: "", name: "", color: "", };
  }
  return {
    dataKey: displayType,
    name: dataMapItem.name,
    color: dataMapItem.color,
  };
};

export default function Benchmark() {
  const data = useAppSelector(selectData);
  const displayTypes = useAppSelector(selectDisplayTypes);
  const timeSelectionType = useAppSelector(selectTimeSelectionType);
  const dispatch = useAppDispatch();
  const lineDataList = displayTypes.map(getLineDataItem);

  const ibovSelectionStyle = displayTypes.includes("ibov")
    ? benchmarkStyle.displayTypeEnabled
    : benchmarkStyle.displayType;
  const cdiSelectionStyle = displayTypes.includes("cdi")
    ? benchmarkStyle.displayTypeEnabled
    : benchmarkStyle.displayType;
  const ipcaSelectionStyle = displayTypes.includes("ipca")
    ? benchmarkStyle.displayTypeEnabled
    : benchmarkStyle.displayType;

  return (
    <div className={dashboardStyle.card}>
      <h2 className={performanceStyle.chartTitle}>Benchmark</h2>
      <TimeSelector
        displayType={timeSelectionType}
        selectTwelveMonths={() => dispatch(updateTimeSelectionType("12-months"))}
        selectSixMonths={() => dispatch(updateTimeSelectionType("6-months"))}
        selectThreeMonths={() => dispatch(updateTimeSelectionType("3-months"))}
      />
      <div className={benchmarkStyle.lineChartContainer}>
        <LineChart
          dataset={data}
          width={430}
          height={220}
          xAxisDataKey="name"
          lineDataList={lineDataList}
          tickFormatter={(tick: any) => { return `${tick}%`; }}
        />
      </div>
      <div className={benchmarkStyle.displayTypeGroups}>
        <div
          className={ibovSelectionStyle}
          onClick={() => dispatch(updateDisplayType("ibov"))}
        >
          IBOV
        </div>
        <div
          className={cdiSelectionStyle}
          onClick={() => dispatch(updateDisplayType("cdi"))}
        >
          CDI
        </div>
        <div
          className={ipcaSelectionStyle}
          onClick={() => dispatch(updateDisplayType("ipca"))}
        >
          IPCA
        </div>
      </div>
    </div>
  );
}
