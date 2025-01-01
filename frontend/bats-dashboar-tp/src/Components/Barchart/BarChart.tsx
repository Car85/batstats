import { useState } from 'react';
import { BarChartState } from '../../types/Types';
import Plotly from 'react-plotly.js';
import { Data } from 'plotly.js';

const BarChart = ({ data }: BarChartState) => {

  if (!data || data.length === 0) {
    return <p>No data available</p>; 
  }

  const [categoricalColumn, setCategoricalColumn] = useState<string>('');
  const [numericColumn, setNumericColumn] = useState<string | null>(null);
  const [additionalNumericColumn, setAdditionalNumericColumn] = useState<string | null>(null); // Nuevo estado para el valor adicional
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const headers = data[0]; 
  const rows = data.slice(1); 

  const handleCategoricalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoricalColumn(event.target.value);
    setSelectedCategories([]); 
  };

  const handleNumericChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumericColumn(event.target.value);
  };

  const handleAdditionalNumericChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAdditionalNumericColumn(event.target.value);
  };

  const barChartData = (): Data[] => {

    if (!categoricalColumn || !numericColumn || !additionalNumericColumn) return [];

    const groupedData: { [key: string]: { values: number[]; tooltips: string[] } } = {};

    rows.forEach((row) => {
      const category = row[headers.indexOf(categoricalColumn)] as string;
      const numericValue = Number(row[headers.indexOf(numericColumn)]);
      const additionalValue = Number(row[headers.indexOf(additionalNumericColumn)]);

      if (!selectedCategories.length || selectedCategories.includes(category)) {
        if (!groupedData[category]) {
          groupedData[category] = { values: [], tooltips: [] };
        }
        groupedData[category].values.push(numericValue);
        groupedData[category].tooltips.push(`${category}, ${numericValue}, ${additionalNumericColumn}: ${additionalValue}`);
      }
    });

    // Ordenar las categorías en base al valor de las barras (de mayor a menor)
    const sortedGroupedData = Object.entries(groupedData)
      .sort(([, a], [, b]) => {
        // Sumar los valores de cada categoría y ordenar de mayor a menor
        const sumA = a.values.reduce((acc, val) => acc + val, 0);
        const sumB = b.values.reduce((acc, val) => acc + val, 0);
        return sumB - sumA; // Orden descendente
      })
      .map(([key, { values, tooltips }]) => ({
        y: values,
        type: 'bar' as const,
        name: key,
        text: tooltips,
        hoverinfo: 'text',
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
        <label htmlFor="additionalNumericColumn">Select Additional Numeric Column for Tooltip:</label>
        <select
          id="additionalNumericColumn"
          value={additionalNumericColumn || ''}
          onChange={handleAdditionalNumericChange}
        >
          <option value="">--Select Additional Numeric Column--</option>
          {headers.map((header) => (
            <option key={header} value={header}>
              {header}
            </option>
          ))}
        </select>
      </div>

      <div>
        {categoricalColumn && numericColumn && additionalNumericColumn && (
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
