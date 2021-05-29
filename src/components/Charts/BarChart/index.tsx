import React from "react";
import {
  BarChart as BarChartRecharts,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function BarChart() {
  const data = [
    { name: "Mar/2020", valor: 4000, },
    { name: "", valor: 3000, },
    { name: "", valor: -2000, },
    { name: "", valor: 2780, },
    { name: "", valor: -300, },
    { name: "", valor: 2390, },
    { name: "", valor: 2390, },
    { name: "", valor: -1500, },
    { name: "", valor: 500, },
    { name: "", valor: 1800, },
    { name: "", valor: -3000, },
    { name: "Abr/2021", valor: 3490, },
  ];

  return (
    <BarChartRecharts
      width={430}
      height={266}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="valor" fill="#A5C1CE" />
    </BarChartRecharts>
  );
}
