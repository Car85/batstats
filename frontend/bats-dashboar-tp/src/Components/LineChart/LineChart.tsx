import { useMemo, useState } from "react";
import { Chart as ChartData } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import { LineChartState, PlotYaout } from "@/types/Types";

const [selectedX, setSelectedX] = useState<string | null>(null);
const [selectedY, setSelectedY] = useState<string | null>(null);


const handleXChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value;
  setSelectedX(value);
};

const handleYChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value;
  setSelectedY(value);
};

const LineChart = ({ data, onStateChange }: LineChartState & { onStateChange?: (state: { data: LineChartState; layout: PlotYaout }) => void }) => {

      const headers: string[] = useMemo(() => (
        Array.isArray(data) && data.length > 0 && Array.isArray(data[0]) ? data[0] : []
      ), [data]);
      const rows = useMemo(() => (data && data.datasets.length > 1 ? data.datasets.slice(1) : []), [data]);

   
    const configChart = {
        type: 'line',
        data: rows,
        options: {
          plugins: {
            filler: {
              propagate: false,
            },
            title: {
              display: true,
              text: 'LineChart',
            }
          },
          interaction: {
            intersect: false,
          }
        },
      };


 
  
  return (
    <div className="lineContainer">
    <div>
      <label>
        Select X-Axis:
        <select
          onChange={(e) => handleXChange(e)}
          defaultValue=""
        >
          <option value="" disabled>
            Choose column
          </option>
          {headers.map((header, index) => (
            <option key={`${header}-${index}`} value={header}>
              {header}
            </option>
          ))}
        </select>
      </label>
    </div>

    <div>
      <label>
        Select Y-Axis:
        <select
          onChange={(e) => handleYChange(e)}
          defaultValue=""
        >
          <option value="" disabled>
            Choose column
          </option>
          {headers.map((header, index) => (
            <option key={`${header}-${index}`} value={header}>
              {header}
            </option>
          ))}
        </select>
      </label>
    </div>


    <div className="App">
      <div className="dataCard revenueCard">
        <Line data={revenueChartData} />
      </div>

    </div>
    </div> 
    
  );
};

export default LineChart;
