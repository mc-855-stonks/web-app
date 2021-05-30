import React from "react";
import dashboardStyle from "pages/DashboardPage/components/Dashboard/style.module.css";
import performanceStyle from "pages/DashboardPage/components/Dashboard/components/Performance/style.module.css";
import LineChart from "components/Charts/LineChart";
import benchmarkStyle from "./style.module.css";
import TimeSelector from "../TimeSelector";

export default function Benchmark() {
  const data = [
    {
      name: "Abr/2020",
      ibov: 40,
      cdi: 24,
      ipca: 24,
    },
    {
      name: "",
      ibov: 20,
      cdi: 10,
      ipca: 15,
    },
    {
      name: "",
      ibov: 19,
      cdi: 31,
      ipca: 44,
    },
    {
      name: "",
      ibov: 66,
      cdi: 13,
      ipca: 58,
    },
    {
      name: "",
      ibov: 98,
      cdi: 5,
      ipca: 10,
    },
    {
      name: "",
      ibov: 80,
      cdi: 10,
      ipca: 16,
    },
    {
      name: "",
      ibov: 29,
      cdi: 7,
      ipca: 67,
    },
    {
      name: "",
      ibov: 20,
      cdi: 98,
      ipca: 21,
    },
    {
      name: "",
      ibov: 27,
      cdi: 39,
      ipca: 20,
    },
    {
      name: "",
      ibov: 18,
      cdi: 48,
      ipca: 21,
    },
    {
      name: "",
      ibov: 23,
      cdi: 38,
      ipca: 25,
    },
    {
      name: "Abr/2021",
      ibov: 34,
      cdi: 43,
      ipca: 21,
    },
  ];

  return (
    <div className={dashboardStyle.card}>
      <h2 className={performanceStyle.chartTitle}>Benchmark</h2>
      <TimeSelector
        displayType="12-months"
        selectTwelveMonths={() => { }}
        selectSixMonths={() => { }}
        selectThreeMonths={() => { }}
      />
      <div className={benchmarkStyle.lineChartContainer}>
        <LineChart
          dataset={data}
          width={430}
          height={220}
          xAxisDataKey="name"
          lineDataList={[
            { dataKey: "ibov", name: "IBOV", color: "#E8C603", },
            { dataKey: "cdi", name: "CDI", color: "#3F84BF", },
            //{ dataKey: "ipca", name: "IPCA", color: "#A5C1CE", },
          ]}
          tickFormatter={(tick: any) => { return `${tick}%`; }}
        />
      </div>
      <div className={benchmarkStyle.displayTypeGroups}>
        <div className={benchmarkStyle.displayTypeEnabled}>IBOV</div>
        <div className={benchmarkStyle.displayTypeEnabled}>CDI</div>
        <div className={benchmarkStyle.displayType}>IPCA</div>
      </div>
    </div>
  );
}
