import React from "react";
import dashboardStyle from "pages/DashboardPage/components/Dashboard/style.module.css";

import DoughnutChart, {
  DoughnutDatasetPointType,
} from "components/Charts/DoughnutChart";

import {
  selectDisplayType,
  selectData,
  updateDisplayType,
} from "slices/portfolioSlice";
import { useAppDispatch, useAppSelector } from "hooks";

import Legend from "./components/Legend";

import portfolioStyle from "./style.module.css";

const colors = [
  "#174271",
  "#2B6EBC",
  "#4F84BA",
  "#5796D4",
  "#8CB2D5",
  "#443908",
  "#675919",
  "#B19A32",
  "#E3C643",
  "#E8D362",
  "#3E2908",
  "#8B5B1C",
  "#CB8733",
  "#EA9E2D",
  "#E4B876",
  "#1C3520",
  "#39673F",
  "#389A46",
  "#63B26E",
  "#85B38E",
];

const getLegendPointData = (
  datasetPoint: DoughnutDatasetPointType,
  valueSum: number,
  color: string
) => {
  return {
    name: datasetPoint.name,
    value: datasetPoint.value,
    percentage: (datasetPoint.value / valueSum) * 100,
    color,
  };
};

const getChartLegendData = (dataset: Array<DoughnutDatasetPointType>) => {
  if (dataset.length === 0) {
    return [];
  }
  const chartValues = dataset.map((x) => x.value);
  const valueSum = chartValues.reduce((accum, curr) => accum + curr);
  return dataset.map((x, i) =>
    getLegendPointData(x, valueSum, colors[i % colors.length])
  );
};

export default function Portfolio() {
  const data = useAppSelector(selectData);
  const displayType = useAppSelector(selectDisplayType);
  const dispatch = useAppDispatch();
  const legendData = getChartLegendData(data);
  const chartColors = legendData.map((x) => x.color);
  const typeStockClassname = displayType === "ticker" ? "Enabled" : "Disabled";
  const typeSectorClassname = displayType === "sector" ? "Enabled" : "Disabled";
  const titleStockClassname =
    portfolioStyle[`displayTypeTitle${typeStockClassname}`];
  const separatorStockClassname =
    portfolioStyle[`displayTypeSeparator${typeStockClassname}`];
  const titleSectorClassname =
    portfolioStyle[`displayTypeTitle${typeSectorClassname}`];
  const separatorSectorClassname =
    portfolioStyle[`displayTypeSeparator${typeSectorClassname}`];

  return (
    <div className={portfolioStyle.container}>
      <h2 className={dashboardStyle.sectionTitle}>Portfólio</h2>
      <div className={dashboardStyle.card}>
        <div className={portfolioStyle.displayTypeGroup}>
          <div
            className={portfolioStyle.displayType}
            onClick={() => dispatch(updateDisplayType("ticker"))}
          >
            <div className={titleStockClassname}>Ação</div>
            <div className={separatorStockClassname} />
          </div>
          <div
            className={portfolioStyle.displayType}
            onClick={() => dispatch(updateDisplayType("sector"))}
          >
            <div className={titleSectorClassname}>Setor</div>
            <div className={separatorSectorClassname} />
          </div>
        </div>
        <div className={portfolioStyle.chartInfoGroup}>
          <div className={portfolioStyle.doughnutContainer}>
            <DoughnutChart
              width={208}
              height={208}
              dataset={data}
              colors={chartColors}
            />
          </div>
          <Legend data={legendData} />
        </div>
      </div>
    </div>
  );
}
