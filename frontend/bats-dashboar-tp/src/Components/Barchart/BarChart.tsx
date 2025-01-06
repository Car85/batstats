import { BarChartState } from '../../types/Types';
import Plotly from 'react-plotly.js';
import { Data } from 'plotly.js';

import useBarChartState from './useBarChartState';

const BarChart = ({ data }: BarChartState) => {

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
  
  const barChartData = (): Data[] => {

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

    const sortedGroupedData = Object.entries(groupedData)
      .sort(([, a], [, b]) => {
        const sumA = a.values.reduce((acc, val) => acc + val, 0);
        const sumB = b.values.reduce((acc, val) => acc + val, 0);
        return sumB - sumA;
      })
      .map(([key, { values, tooltips }]) => ({
        y: values,
        type: 'bar' as const,
        name: key,
        text: tooltips,
        hoverinfo: 'text',
        textposition: 'none',
      }));

    return sortedGroupedData;
  };

  return (
    <div>
      <h2>BarChart</h2>
      
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
          <Plotly
            data={barChartData()}
            layout={{
              title: 'Bar Chart: Dynamic Analysis',
              yaxis: { title: numericColumn },
              xaxis: { title: categoricalColumn },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BarChart;
