import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface Props {
  dataset: Array<any>;
  width: number;
  height: number;
}

const getRandomHexadecimalColor = () => {
  const n = (Math.random() * 0xfffff * 1000000).toString(16).toUpperCase();
  return `#${n.slice(0, 6)}`;
};

export default function DoughnutChart({ dataset, width, height }: Props) {
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
        {dataset.map(() => (
          <Cell fill={getRandomHexadecimalColor()} />
        ))}
      </Pie>
    </PieChart>
  );
}
