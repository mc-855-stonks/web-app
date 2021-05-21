import React from "react";
import dashboardStyle from "pages/DashboardPage/components/Dashboard/style.module.css";
import DoughnutChart, {
  DoughnutDatasetPointType,
} from "components/Charts/DoughnutChart";
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
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const legendData = getChartLegendData(data);
  const chartColors = legendData.map((x) => x.color);
  return (
    <div className={portfolioStyle.container}>
      <h2 className={dashboardStyle.sectionTitle}>Portfólio</h2>
      <div className={dashboardStyle.card}>
        <div className={portfolioStyle.displayTypeGroup}>
          <div className={portfolioStyle.displayType}>
            <div className={portfolioStyle.displayTypeTitleEnabled}>Ação</div>
            <div className={portfolioStyle.displayTypeSeparatorEnabled} />
          </div>
          <div className={portfolioStyle.displayType}>
            <div className={portfolioStyle.displayTypeTitleDisabled}>Setor</div>
            <div className={portfolioStyle.displayTypeSeparatorDisabled} />
          </div>
        </div>
        <div className={portfolioStyle.chartInfoGroup}>
          <DoughnutChart
            width={208}
            height={208}
            dataset={data}
            colors={chartColors}
          />
        </div>
      </div>
    </div>
  );
}
