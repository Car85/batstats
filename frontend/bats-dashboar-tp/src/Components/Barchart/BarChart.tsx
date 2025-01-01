import { useState } from 'react';
import { BarChartState } from '../../types/Types';
import Plot from 'react-plotly.js';
import { Data } from 'plotly.js';



const BarChart = ({ data }: BarChartState) => {


    if (!data || data.length === 0) {
        return <p>No data available</p>; 
    }

    const [categoricalColumn, setCategoricalColumn] = useState<string>('');
    const [numericColumn, setNumericColumn] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    
    const headers = data[0]; 
    const rows = data.slice(1); 





const handleCategoricalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoricalColumn(event.target.value);
    setSelectedCategories([]); 
  };


  
const BarChartData = (): Data[] => {

    if (!categoricalColumn || !numericColumn) return [];

    const groupedData: { [key: string]: { values: number[]; tooltips: string[] } } = {};
  
    rows.forEach((row) => {
      const category = row[headers.indexOf(categoricalColumn)] as string;
      const numericValue = Number(row[headers.indexOf(numericColumn)]);


    if (!selectedCategories.length || selectedCategories.includes(category)) {
      if (!groupedData[category]) {
        groupedData[category] = { values: [], tooltips: [] };
      }
        groupedData[category].values.push(numericValue);
        groupedData[category].tooltips.push(`${category}, ${numericValue}`);
      }
    });

    return Object.entries(groupedData).map(([key, { values, tooltips }]) => ({
        y: values,
        type: 'bar' as const, 
        name: key, 
        text: tooltips, 
        hoverinfo: 'text', 
      }));


}

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
      
    </div>
  );
};

export default BarChart;
