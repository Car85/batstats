import { Data } from 'plotly.js';
import { BarChartState, BarLayout } from '../../types/Types';

import useBarChartState from './useLineChartState';
import Plot from 'react-plotly.js';
import { useEffect } from 'react';
import { color } from 'html2canvas/dist/types/css/types/color';

const LineChart = ({ data, onStateChange }: BarChartState & { onStateChange?: (state: { data: Data[]; layout: BarLayout }) => void }) => {

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
      .map(([key, { values, tooltips }]) => ({
        y: values,
        x: [key], 
        type: 'scatter',
        mode: "lines+markers",         
        text: tooltips,
        hoverinfo: 'text',
        
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
          text: 'Line Chart: Dynamic Analysis',
        },       
        yaxis: {          
          title: {
            text: numericColumn,
          },
          type: 'linear',
          range: [minNumeric, maxNumeric],
          autorange: true,
        },
        xaxis: {          
          title: {
            text: categoricalColumn,
          },
          type: 'multicategory', 
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
            data={lineChartData()}
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





import React from "react";
import Plot from "react-plotly.js";

const LineChart: React.FC = () => {
  return (
    <Plot
      data={[
        {
          x: [1, 2, 3, 4, 5], // Valores del eje X
          y: [10, 15, 13, 17, 22], // Valores del eje Y
          type: "scatter", // Tipo de gráfico: scatter se usa también para líneas
          mode: "lines+markers", // Define líneas y puntos
          marker: { color: "blue" }, // Color de los puntos
          line: { shape: "linear", color: "red" }, // Configuración de la línea
          name: "Dataset 1", // Nombre de la serie
        },
        {
          x: [1, 2, 3, 4, 5],
          y: [12, 9, 15, 12, 20],
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "green" },
          line: { shape: "linear", color: "orange" },
          name: "Dataset 2",
        },
      ]}
      layout={{
        title: "Line Chart Example",
        xaxis: { title: "X Axis" },
        yaxis: { title: "Y Axis" },
        showlegend: true, // Muestra la leyenda
        legend: { x: 1, y: 1 }, // Posición de la leyenda
      }}
      config={{
        responsive: true, // Habilita el diseño responsivo
      }}
    />
  );
};

export default LineChart;

