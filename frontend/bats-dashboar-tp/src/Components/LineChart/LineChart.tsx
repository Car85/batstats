import React, { useState } from "react";
import { Chart as ChartJS, defaults, ChartOptions, ChartData } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import "./App.css";
import { LineChartState, PlotYaout } from "@/types/Types";


const [categoricalColumn, setCategoricalColumn] = useState<string>('');
const [numericColumn, setNumericColumn] = useState<string>('');
const [selectedCategories, setSelectedCategories] = useState<string[]>([]);



const handleCategoricalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoricalColumn(event.target.value);
    setSelectedCategories([]);
};
  


const handleNumericChange = (event:  React.ChangeEvent<HTMLSelectElement>) => {
  setNumericColumn((event.target.value));
};

  

interface RevenueData {
  label: string;
  revenue: number;
  cost: number;
}

interface SourceData {
  label: string;
  value: number;
}


const LineChart = ({ data, onStateChange }: LineChartState & { onStateChange?: (state: { data: LineChartState; layout: PlotYaout }) => void }) => {
   
    const revenueChartData: ChartData<'line'> = {
    labels: revenueData.map((data: RevenueData) => data.label),
    datasets: [
      {
        label: selectedCategories.,
        data: revenueData.map((data: RevenueData) => data.revenue),
        backgroundColor: "#064FF0",
        borderColor: "#064FF0",
      },
      {
        label: selectedCategories,
        data: revenueData.map((data: RevenueData) => data.cost),
        backgroundColor: "#FF3030",
        borderColor: "#FF3030",
      },
    ],
  }; 


  const lineChartOptions: ChartOptions = {
    scales: {
      y: {
        type: "linear",  
        beginAtZero: true,
      },
    },
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
  

  
  return (
    <div className="lineContainer">
    <div>
      <label>
        Select X-Axis:
        <select
          onChange={(e) => handleNumericChange(e)}
          defaultValue=""
        >
          <option value="" disabled>
            Choose column
          </option>
          {data[0]?.map((col, index) => (
            <option key={`x-${index}`} value={index}>
              {col}
            </option>
          ))}
        </select>
      </label>
    </div>

    <div>
      <label>
        Select Y-Axis:
        <select
          onChange={(e) => handleCategoricalChange(e)}
          defaultValue=""
        >
          <option value="" disabled>
            Choose column
          </option>
          {data[0]?.map((col, index) => (
            <option key={`y-${index}`} value={index}>
              {col}
            </option>
          ))}
        </select>
      </label>
    </div>


    <div className="App">
      <div className="dataCard revenueCard">
        <Line data={revenueChartData} options={lineChartOptions} />
      </div>

    </div>
    </div> 
    
  );
};

export default LineChart;
