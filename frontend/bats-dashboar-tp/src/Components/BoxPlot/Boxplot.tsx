import React, { useState } from 'react';
import Plotly from 'react-plotly.js';
import { BoxPlotState } from '../../types/Types.js';
import { Data } from 'plotly.js';

const BoxPlot = ({ data }: BoxPlotState) => {
  const [categoricalColumn, setCategoricalColumn] = useState<string | null>(null);
  const [numericColumn, setNumericColumn] = useState<string | null>(null);
  const [tooltipColumn, setTooltipColumn] = useState<string>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


  if (!data || data.length === 0) {
    return <p>No data available</p>; 
  }

  const headers = data[0] as string[]; 
  const rows = data.slice(1); 

  const handleCategoricalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoricalColumn(event.target.value);
    setSelectedCategories([]); 
  };

  
  const handleNumericChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumericColumn(event.target.value);
  };

  const handleTooltipChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTooltipColumn(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedCategories(options);
  };

  const boxPlotData = (): Data[] => {
    if (!categoricalColumn || !numericColumn) return [];
  
    const groupedData: { [key: string]: { values: number[]; tooltips: string[] } } = {};
  
    rows.forEach((row) => {
      const category = row[headers.indexOf(categoricalColumn)] as string;
      const numericValue = Number(row[headers.indexOf(numericColumn)]);
      const tooltipValue = String(row[headers.indexOf(tooltipColumn)]);
  
      if (!selectedCategories.length || selectedCategories.includes(category)) {
        if (!groupedData[category]) {
          groupedData[category] = { values: [], tooltips: [] };
        }
        groupedData[category].values.push(numericValue);
        groupedData[category].tooltips.push(`${category}, ${numericValue}, ${tooltipColumn}: ${tooltipValue}`);
      }
    });
  
    return Object.entries(groupedData).map(([key, { values, tooltips }]) => ({
      y: values,
      type: 'box' as const, 
      name: key, 
      text: tooltips, 
      hoverinfo: 'text', 
    }));
  };
  

  return (
    <div>
      <h2>Dynamic Box Plot</h2>

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
        <label htmlFor="tooltipColumn">Select Tooltip Column:</label>
        <select
          id="tooltipColumn"
          value={tooltipColumn || ''}
          onChange={handleTooltipChange}
        >
          <option value="">--Select Tooltip Column--</option>
          {headers.map((header) => (
            <option key={header} value={header}>
              {header}
            </option>
          ))}
        </select>
      </div>


     {categoricalColumn && (
        <div>
          <label htmlFor="categoryFilter">Select Specific Categories:</label>
          <select
            id="categoryFilter"
            multiple
            value={selectedCategories}
            onChange={handleCategoryChange}
          >
            {Array.from(new Set(rows.map((row) => row[headers.indexOf(categoricalColumn)]))).map(
              (category) => (
                <option key={category} value={category as string}>
                  {category as string}
                </option>
              )
            )}
          </select>
          <button
            type="button"
            onClick={() => setSelectedCategories([])}
            style={{
              marginLeft: '10px',
              padding: '5px 10px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #ccc',
            }}
          >
            Deselect All Categories
          </button>
        </div>
      )}

      {categoricalColumn && numericColumn && (
        <Plotly
          data={boxPlotData()}
          layout={{
            title: 'Box Plot: Dynamic Analysis',
            yaxis: { title: numericColumn },
            xaxis: { title: categoricalColumn },
          }}
        />
      )}
    </div>
  );
};

export default BoxPlot;