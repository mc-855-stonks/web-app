import React from "react";
import {
  LineChart as LineChartRecharts,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export interface LineData {
  dataKey: string;
  name: string;
  color: string;
}

interface Props {
  dataset: Array<any>;
  xAxisDataKey: string;
  lineDataList: Array<LineData>;
  width: number;
  height: number;
  tickFormatter: any;
}

export default function LineChart({
  dataset,
  xAxisDataKey,
  lineDataList,
  width,
  height,
  tickFormatter,
}: Props) {
  return (
    <LineChartRecharts width={width} height={height} data={dataset}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xAxisDataKey} />
      <YAxis tickFormatter={tickFormatter} />
      <Tooltip formatter={(item: any) => `${item.toFixed(2)}`} />
      {lineDataList.map((lineData) => (
        <Line
          key={lineData.name}
          type="monotone"
          dataKey={lineData.dataKey}
          stroke={lineData.color}
          name={lineData.name}
          dot={false}
          strokeWidth={2}
        />
      ))}
    </LineChartRecharts>
  );
}
