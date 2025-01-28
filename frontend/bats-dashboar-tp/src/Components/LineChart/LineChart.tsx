import { AxisType, Data } from 'plotly.js';
import { BarChartState, BarLayout } from '../../types/Types';

import useBarChartState from './useLineChartState';
import Plot from 'react-plotly.js';
import { useEffect } from 'react';
import { color } from 'html2canvas/dist/types/css/types/color';

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

    const groupedData: { [key: string]: { x: numbe[]; y: number[], tooltips: string[] } } = {};

    rows.forEach((row) => {
      const category = row[headers.indexOf(categoricalColumn)] as string;
      const numericValue = Number(row[headers.indexOf(numericColumn)]);
      const additionalValue = row[headers.indexOf(additionalColumn)];

      if (!selectedCategories.length || selectedCategories.includes(category)) {
        if (!groupedData[category]) {
          groupedData[category] = { x: [], y: [], tooltips: [] };
        }
        groupedData[category].x.push(category);
        groupedData[category].y.push(numericValue);
        groupedData[category].tooltips.push(`${category}, ${numericValue}, ${additionalColumn}: ${additionalValue}`);
      }
    });

    const sortedGroupedData: BarChartState[] = Object.entries(groupedData).map(
      ([_, { x, y, tooltips }]) => ({
        x, 
        y, 
        type: 'scatter',
        mode: 'lines+markers', 
        text: tooltips,
        hoverinfo: 'text',
      })
    );



    return sortedGroupedData;
  };

  useEffect(() => {
    if (onStateChange) {
      const numericValues = data.map((d: any) => d[numericColumn]);
      const minNumeric = Math.min(...numericValues);
      const maxNumeric = Math.max(...numericValues);
      const layout  = {
       
        title: {
          text: 'Line Chart: Dynamic Analysis',
        },       
        yaxis: {          
          title: {
            text: numericColumn,
          },
          type: 'linear' as AxisType,
          range: [minNumeric, maxNumeric],
          autorange: true,
        },
        xaxis: {          
          title: {
            text: categoricalColumn,
          },
          type: "multicategory" as AxisType, 
          autorange: true,  
        },
      };

      onStateChange({
        data: lineChartData(),
        layout,
      });
    }
  }, [categoricalColumn, numericColumn, additionalColumn, selectedCategories]);

  return (
    <div>
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
            data= {lineChartData()}
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





