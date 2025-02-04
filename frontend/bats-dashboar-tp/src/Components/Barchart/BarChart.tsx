import { Data } from 'plotly.js';
import { BarChartState, BarLayout } from '../../types/Types';

import useBarChartState from './useBarChartState';
import Plot from 'react-plotly.js';
import { useEffect } from 'react';

const BarChart = ({ data, onStateChange }:
                  
                  BarChartState & { 
                  
                  onStateChange?: (state:
                  
                  { data: Data[];
                  
                  layout: BarLayout })
                  
                  => void }) => {

  
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
  
  const barChartData = (): BarChartState[] => {

    if (!categoricalColumn || !numericColumn || !additionalColumn) return [];

    const groupedData: { [key: string]: { values: number[]; tooltips: string[] } } = {};

    rows.forEach((row) => {
      const category = row[headers.indexOf(categoricalColumn)] as string;
      const numericValue = Number(row[headers.indexOf(numericColumn)]);
      const additionalValue = row[headers.indexOf(additionalColumn)];

      if (!selectedCategories.length || selectedCategories.includes(category)) {
        if (!groupedData[category]) {
          groupedData[category] = { values: [], tooltips: [] };
        }
        groupedData[category].values.push(numericValue);
        groupedData[category].tooltips.push(`${category}, ${numericValue}, ${additionalColumn}: ${additionalValue}`);
      }
    });

    const sortedGroupedData: BarChartState[] = Object.entries(groupedData)
    .sort(([, a], [, b]) => {
        const sumA = a.values.reduce((acc, val) => acc + val, 0);
        const sumB = b.values.reduce((acc, val) => acc + val, 0);
        return sumB - sumA;
    })
    .map(([key, { values, tooltips }]) => ({
        y: values,
        x: Array.from({ length: values.length }, (_, i) => i + 1), 
        type: 'bar' as const,
        name: key,
        text: tooltips,
        hoverinfo: 'text',
        textposition: 'none',
    }));
    
    return sortedGroupedData;
  };

  useEffect(() => {
    if (onStateChange) {
      const numericValues = data.map((d: any) => d[numericColumn]);
      const minNumeric = Math.min(...numericValues);
      const maxNumeric = Math.max(...numericValues);
      const layout: BarLayout = {
        title: {
          text: 'Bar Chart: Dynamic Analysis',
        },
        yaxis: { title: {
          text: numericColumn },
        type: 'linear',
        range: [minNumeric, maxNumeric],
        autorange: true, },

        xaxis: {
          title: {
            text: categoricalColumn },
          type: 'category',
          range: [0, data.length - 1],
          autorange: true,
        },
      };

      onStateChange({
        data: barChartData(),
        layout,
      });
    }
  }, [categoricalColumn, numericColumn, additionalColumn, selectedCategories]);


  return (
    <div className="lables">
      <h2>BarChart</h2>
      
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
        <label htmlFor="additionalNumericColumn">Tooltip:</label>
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

      <div>
        {categoricalColumn && numericColumn && additionalColumn && (
          <Plot
            data={barChartData()}
            config={{
              autosizable: true,
              displaylogo: false,
            }}
            layout={{
              title: 'Bar Chart: Dynamic Analysis',
              yaxis: { title: numericColumn },
              xaxis: { title: categoricalColumn },
              autosize: true,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BarChart;
