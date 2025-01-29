import { AxisType, Data } from 'plotly.js';
import { BarChartState, BarLayout } from '../../types/Types';

import useBarChartState from './useLineChartState';
import Plot from 'react-plotly.js';
import { useEffect, useMemo } from 'react';
import { color } from 'html2canvas/dist/types/css/types/color';
import { Y } from 'vitest/dist/chunks/reporters.D7Jzd9GS';

const LineChart = ({ data, onStateChange }: BarChartState & { onStateChange?: (state: { data: Data[]; layout: Partial<Plotly.Layout> }) => void }) => {

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const headers = data[0];
  const rows = data.slice(1);

  const {
    categoricalColumn,
    numericColumn,
    additionalColumn,
    selectedCategories,
    handleCategoricalChange,
    handleNumericChange,
    handleAdditionalColumnChange,
  } = useBarChartState(headers);

  const lineChartData = () => {

    if (!categoricalColumn || !numericColumn || !additionalColumn) return [];

    const groupedData: { x: string[]; y: number[]; tooltips: string[] } = {
      x: [],
      y: [],
      tooltips: []
    };
    const cleanRows = rows.filter(row => 
      row.length > 1 && row.some(cell => cell !== null && cell !== undefined && cell !== "")
    );

    cleanRows.forEach((row) => {
      const category = row[headers.indexOf(categoricalColumn)];
      const numericValue = Number(row[headers.indexOf(numericColumn)]);
      console.log("First 5 rows:", cleanRows);

      const additionalValue = row[headers.indexOf(additionalColumn)] ?? "N/A"; 

      if (!selectedCategories.length || selectedCategories.includes(category)) {

        groupedData.x.push(category);
        groupedData.y.push(numericValue);
        groupedData.tooltips.push(`${category}, ${numericValue}, ${additionalColumn}: ${additionalValue}`);
      }

    });
    groupedData.x = groupedData.x.filter(function (e) { return e; }); // delete null values
    groupedData.y = groupedData.y.filter(function (e) { return e; });


    console.log("Categorical column (X-axis):", categoricalColumn);
    console.log("Numeric column (Y-axis):", numericColumn);
    console.log("Data for X:", groupedData.x);
    console.log("Data for Y:", groupedData.y);
    
    return [{
      x: groupedData.x,
      y: groupedData.y,
      type: 'scatter',
      mode: 'lines+markers',
      text: groupedData.tooltips,
      hoverinfo: 'text',

    }];
  };
  



  useEffect(() => {
    if (onStateChange) {

      const layout = {
        title:
          'Line Chart: Dynamic Analysis'
      };

      onStateChange({
        data: lineChartData() as Data[],
        layout,
      });
    }
  }, [categoricalColumn, numericColumn, additionalColumn, selectedCategories]);

  return (
    <div className="lables">
      <h2>LineChart</h2>

      <div>
        <label htmlFor="categoricalColumn">Select Categorical Column:</label>
        <select
          id="categoricalColumn"
          value={categoricalColumn || ''}
          onChange={handleCategoricalChange}
        >
          <option value="">--Select Categorical Column--</option>
          {headers.map((header) => (
            <option key={header} value={header}>
              {header}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="numericColumn">Select Numeric Column:</label>
        <select
          id="numericColumn"
          value={numericColumn || ''}
          onChange={handleNumericChange}
        >
          <option value="">--Select Numeric Column--</option>
          {headers.map((header) => (
            <option key={header} value={header}>
              {header}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="additionalNumericColumn">Select Additional Column for Tooltip:</label>
        <select
          id="additionalNumericColumn"
          value={additionalColumn || ''}
          onChange={handleAdditionalColumnChange}
        >
          <option value="">--Select Additional Column--</option>
          {headers.map((header) => (
            <option key={header} value={header}>
              {header}
            </option>
          ))}
        </select>
      </div>

      <div>
        {categoricalColumn && numericColumn && additionalColumn && (
          <Plot
            data={lineChartData() as Data[]}
            layout={{
              title: 'Line Chart: Dynamic Analysis',
              yaxis: { title: numericColumn },
              xaxis: { title: categoricalColumn }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LineChart;





