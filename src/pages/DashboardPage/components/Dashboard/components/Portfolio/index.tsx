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

const getRandomHexadecimalColor = () => {
  const n = (Math.random() * 0xfffff * 1000000).toString(16).toUpperCase();
  return `#${n.slice(0, 6)}`;
};

const getLegendPointData = (
  datasetPoint: DoughnutDatasetPointType,
  valueSum: number
) => {
  return {
    name: datasetPoint.name,
    value: datasetPoint.value,
    percentage: (datasetPoint.value / valueSum) * 100,
    color: getRandomHexadecimalColor(),
  };
};

const getChartLegendData = (dataset: Array<DoughnutDatasetPointType>) => {
  const chartValues = dataset.map((x) => x.value);
  const valueSum = chartValues.reduce((accum, curr) => accum + curr);
  return dataset.map((x) => getLegendPointData(x, valueSum));
};

export default function Portfolio() {
  const data = useAppSelector(selectData);
  const displayType = useAppSelector(selectDisplayType);
  const dispatch = useAppDispatch();
  const legendData = getChartLegendData(data);
  const chartColors = legendData.map((x) => x.color);
  const typeStockClassname = displayType === "stock" ? "Enabled" : "Disabled";
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
            onClick={() => dispatch(updateDisplayType("stock"))}
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
