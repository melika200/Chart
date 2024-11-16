import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  chart: { name: string; priceUsd: number }[];
}

const Chart: React.FC<ChartProps> = ({ chart }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chart}
        margin={{ top: 10, left: 20, right: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="name" fill="#01a3a4" />
        <Bar dataKey="priceUsd" fill="#00d2d3" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;