import React, { useState } from 'react';
import Plotly from 'react-plotly.js';

interface BoxPlotProps {
  data: (string | number)[][];
}

const BoxPlot = ({ data }: BoxPlotProps) => {
  const [categoricalColumn, setCategoricalColumn] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const headers = data[0]; // Columnas del dataset
  const rows = data.slice(1); // Filas de datos

  // Generar opciones para el selector de columnas
  const columnOptions = headers.map((header, index) => (
    <option key={index} value={index}>
      {header}
    </option>
  ));

  // Generar opciones para el selector de categorías
  const categories =
    categoricalColumn !== null
      ? Array.from(
          new Set(rows.map((row) => row[parseInt(categoricalColumn)] as string))
        )
      : [];

  const categoryOptions = categories.map((category, index) => (
    <option key={index} value={category}>
      {category}
    </option>
  ));

  // Procesar los datos según las categorías seleccionadas
  const boxPlots =
    categoricalColumn !== null
      ? headers.slice(1).map((col, colIndex) => ({
          x: rows
            .filter((row) =>
              selectedCategories.length > 0
                ? selectedCategories.includes(row[parseInt(categoricalColumn)] as string)
                : true
            )
            .map((row) => row[parseInt(categoricalColumn)] as string),
          y: rows
            .filter((row) =>
              selectedCategories.length > 0
                ? selectedCategories.includes(row[parseInt(categoricalColumn)] as string)
                : true
            )
            .map((row) => Number(row[colIndex + 1])),
          type: 'box',
          name: col as string, // Nombre de la métrica
        }))
      : [];

  // Manejar la selección de categorías
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCategories(selectedValues);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="categorical-column">Select Categorical Column:</label>
        <select
          id="categorical-column"
          value={categoricalColumn || ''}
          onChange={(e) => {
            setCategoricalColumn(e.target.value);
            setSelectedCategories([]); // Reinicia las categorías seleccionadas
          }}
        >
          <option value="">Select a column</option>
          {columnOptions}
        </select>
      </div>

      {categoricalColumn !== null && (
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="categories">Select Categories:</label>
          <select
            id="categories"
            multiple
            value={selectedCategories}
            onChange={handleCategoryChange}
            style={{ width: '100%', height: '100px' }}
          >
            {categoryOptions}
          </select>
        </div>
      )}

      {categoricalColumn !== null ? (
        <Plotly
          data={boxPlots}
          layout={{
            title: 'Interactive Box Plot',
            yaxis: { title: 'Values' },
            xaxis: { title: `Categorical Column: ${headers[parseInt(categoricalColumn)]}` },
            boxmode: 'group', // Agrupa por categorías
          }}
        />
      ) : (
        <div>Please select a categorical column to display the box plot.</div>
      )}
    </div>
  );
};

export default BoxPlot;
