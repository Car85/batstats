import { Data } from 'plotly.js';
import { BarChartState } from '../../types/Types';

import useBarChartState from './useLineChartState';
import Plot from 'react-plotly.js';
import { useEffect } from 'react';

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

      const additionalValue = row[headers.indexOf(additionalColumn)] ?? "N/A"; 

      if (!selectedCategories.length || selectedCategories.includes(category)) {

        groupedData.x.push(category);
        groupedData.y.push(numericValue);
        groupedData.tooltips.push(`${category}, ${numericValue}, ${additionalColumn}: ${additionalValue}`);
      }

    });
    groupedData.x = groupedData.x.filter(function (e) { return e; }); // delete null values
    groupedData.y = groupedData.y.filter(function (e) { return e; });

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
    <div>
      <h2>LineChart</h2>

      <div>
        <label htmlFor="categoricalColumn">X-Axis</label>
        <select
          id="categoricalColumn"
          value={categoricalColumn || ''}
          onChange={handleCategoricalChange}
        >
          <option value="" selected>👇</option>
          {headers.map((header) => (
            <option key={header} value={header}>
              {header}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="numericColumn">Y-Axis</label>
        <select
          id="numericColumn"
          value={numericColumn || ''}
          onChange={handleNumericChange}
        >
          <option value="" selected>👇</option>
          {headers.map((header) => (
            <option key={header} value={header}>
              {header}
            </option>
          ))}
        </select>
      </div>


      <div>
        <label htmlFor="additionalNumericColumn">Tooltip</label>
        <select
          id="additionalNumericColumn"
          value={additionalColumn || ''}
          onChange={handleAdditionalColumnChange}
        >
          <option value="" selected>👇</option>
          {headers.map((header) => (
            <option key={header} value={header}>
              {header}
            </option>
          ))}
        </select>
      </div>

        {categoricalColumn && numericColumn && additionalColumn && (
          <Plot
            data={lineChartData() as Data[]}
            config={{
              autosizable: true,
              displaylogo: false,
            }}
            layout={{
              title: 'Line Chart: Dynamic Analysis',
              yaxis: { title: numericColumn },
              xaxis: { title: categoricalColumn },
              autosize: true,
            }}
            useResizeHandler={true}
            style={{maxWidth: "70vw", minWidth: "50vw"}}
          />
        )}
    </div>
  );
};

export default LineChart;




