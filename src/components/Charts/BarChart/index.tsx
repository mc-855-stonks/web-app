import React from "react";
import {
  BarChart as BarChartRecharts,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export interface BarChartDatasetPointType {
  name: string;
  value: number;
}

interface Props {
  dataset: Array<BarChartDatasetPointType>;
  width: number;
  height: number;
  xAxisDataKey: string;
  yAxisDataKey: string;
  tooltipName: string;
  barColor: string;
}

export default function BarChart({
  dataset,
  width,
  height,
  xAxisDataKey,
  yAxisDataKey,
  tooltipName,
  barColor,
}: Props) {
  return (
    <BarChartRecharts
      width={width}
      height={height}
      data={dataset}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xAxisDataKey} />
      <YAxis dataKey={yAxisDataKey} />
      <Tooltip />
      <Bar dataKey={yAxisDataKey} name={tooltipName} fill={barColor} />
    </BarChartRecharts>
  );
}
