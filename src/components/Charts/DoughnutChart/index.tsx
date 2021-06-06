import React from "react";
import { PieChart, Pie, Cell } from "recharts";

export interface DoughnutDatasetPointType {
  name: string;
  value: number;
}

interface Props {
  dataset: Array<DoughnutDatasetPointType>;
  colors: Array<string>;
  width: number;
  height: number;
}

export default function DoughnutChart({
  dataset,
  colors,
  width,
  height,
}: Props) {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={dataset}
        cx={width / 2}
        cy={height / 2}
        innerRadius={50}
        outerRadius={100}
        dataKey="value"
      >
        {dataset.map((entry, index) => (
          <Cell key={entry.name} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
