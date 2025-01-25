import React from "react";
import { Chart as ChartJS, defaults, ChartOptions, ChartData } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import "./App.css";



  

interface RevenueData {
  label: string;
  revenue: number;
  cost: number;
}

interface SourceData {
  label: string;
  value: number;
}

export const App: React.FC = () => {
  const revenueChartData: ChartData<'line'> = {
    labels: revenueData.map((data: RevenueData) => data.label),
    datasets: [
      {
        label: "Revenue",
        data: revenueData.map((data: RevenueData) => data.revenue),
        backgroundColor: "#064FF0",
        borderColor: "#064FF0",
      },
      {
        label: "Cost",
        data: revenueData.map((data: RevenueData) => data.cost),
        backgroundColor: "#FF3030",
        borderColor: "#FF3030",
      },
    ],
  };

  const barChartData: ChartData<'bar'> = {
    labels: sourceData.map((data: SourceData) => data.label),
    datasets: [
      {
        label: "Count",
        data: sourceData.map((data: SourceData) => data.value),
        backgroundColor: [
          "rgba(43, 63, 229, 0.8)",
          "rgba(250, 192, 19, 0.8)",
          "rgba(253, 135, 135, 0.8)",
        ],
        borderRadius: 5,
      },
    ],
  };

  const doughnutChartData: ChartData<'doughnut'> = {
    labels: sourceData.map((data: SourceData) => data.label),
    datasets: [
      {
        label: "Count",
        data: sourceData.map((data: SourceData) => data.value),
        backgroundColor: [
          "rgba(43, 63, 229, 0.8)",
          "rgba(250, 192, 19, 0.8)",
          "rgba(253, 135, 135, 0.8)",
        ],
        borderColor: [
          "rgba(43, 63, 229, 0.8)",
          "rgba(250, 192, 19, 0.8)",
          "rgba(253, 135, 135, 0.8)",
        ],
      },
    ],
  };

  const lineChartOptions: ChartOptions = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Monthly Revenue & Cost",
        font: {
          size: 20, 
        },
      },
    },
  };

  const barChartOptions: ChartOptions = {
    plugins: {
      title: {
        text: "Revenue Source",
      },
    },
  };

  const doughnutChartOptions: ChartOptions = {
    plugins: {
      title: {
        text: "Revenue Sources",
      },
    },
  };

  return (
    <div className="App">
      <div className="dataCard revenueCard">
        <Line data={revenueChartData} options={lineChartOptions} />
      </div>

      <div className="dataCard customerCard">
        <Bar data={barChartData} options={barChartOptions} />
      </div>

      <div className="dataCard categoryCard">
        <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
      </div>
    </div>
  );
};
