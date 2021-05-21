import React from "react";
import dashboardStyle from "pages/DashboardPage/components/Dashboard/style.module.css";
import DoughnutChart from "components/Charts/DoughnutChart";
import portfolioStyle from "./style.module.css";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

export default function Portfolio() {
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
        <DoughnutChart width={208} height={208} dataset={data} />
      </div>
    </div>
  );
}
