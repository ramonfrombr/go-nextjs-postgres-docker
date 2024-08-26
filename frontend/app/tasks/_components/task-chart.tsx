"use client";
import { PieChart } from "@mui/x-charts";
import React from "react";

interface TaskChartProps {
  heading: string;
  data: { value: number; label: string; color?: string }[];
}

const TaskChart = ({ heading, data }: TaskChartProps) => {
  const chartData = [
    {
      data: [
        ...data.map((item, idx) => {
          if (item.color) {
            return {
              id: idx,
              value: item.value,
              label: item.label,
              color: item.color,
            };
          } else {
            return {
              id: idx,
              value: item.value,
              label: item.label,
            };
          }
        }),
      ],
    },
  ];
  return (
    <div className="mb-5">
      <h2 className="text-center text-xl md:text-xl">{heading}</h2>
      <PieChart
        series={chartData}
        height={250}
        margin={{ bottom: 50, right: 0, left: 0 }}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
            padding: {
              right: 0,
              left: 0,
            },
          },
        }}
      />
    </div>
  );
};

export default TaskChart;
