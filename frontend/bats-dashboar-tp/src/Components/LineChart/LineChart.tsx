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

  const lineChartData = (): BarChartState[] => {

    if (!categoricalColumn || !numericColumn || !additionalColumn) return [];

    const groupedData: { x: string[]; y: number[]; tooltips: string[] } = {
      x: [],
      y: [],
      tooltips: []
    };

    rows.forEach((row) => {
      const category = row[headers.indexOf(categoricalColumn)];
      const numericValue = Number(row[headers.indexOf(numericColumn)]);
      const additionalValue = row[headers.indexOf(additionalColumn)];

      if (!selectedCategories.length || selectedCategories.includes(category)) {
      
        groupedData.x.push(category);
        groupedData.y.push(numericValue);
        groupedData.tooltips.push(`${category}, ${numericValue}, ${additionalColumn}: ${additionalValue}`);
      }

    });
    console.log(groupedData);
    const sortedGroupedData = ({
        x: groupedData.x, 
        y: groupedData.y, 
        type: 'scatter',
        mode: 'lines+markers',       
        text: groupedData.tooltips,
        hoverinfo: 'text',      
      });

    return sortedGroupedData;
  };

  const memoizedData = useMemo(() => lineChartData(), [categoricalColumn, numericColumn, additionalColumn, rows]);


  useEffect(() => {
    if (onStateChange) {
      const numericValues = data.map((d: any) => d[numericColumn]);
    
      const layout  = {
        title: 
          'Line Chart: Dynamic Analysis'    
      };

      onStateChange({
        data: lineChartData(),
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
            data= {memoizedData}
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





