import React, { useState } from 'react';
import Plotly from 'react-plotly.js';

interface BoxPlotProps {
  data: (string | number)[][];
}

const BoxPlot = ({ data }: BoxPlotProps) => {
  const [categoricalColumn, setCategoricalColumn] = useState<string | null>(null);
  const [numericColumn, setNumericColumn] = useState<string | null>(null);
  const [tooltipColumn, setTooltipColumn] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Obtener encabezados y datos
  const headers = data[0] as string[]; // Fila de encabezados
  const rows = data.slice(1); // Filas de datos

  // Manejar selección de columna categórica
  const handleCategoricalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoricalColumn(event.target.value);
    setSelectedCategories([]); // Resetear categorías al cambiar de columna categórica
  };

  // Manejar selección de columna numérica
  const handleNumericChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumericColumn(event.target.value);
  };

  // Manejar selección de columna para tooltips
  const handleTooltipChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTooltipColumn(event.target.value);
  };

  // Manejar selección de categorías específicas
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedCategories(options);
  };

  // Filtrar datos para construir el Box Plot
  const boxPlotData = () => {
    if (!categoricalColumn || !numericColumn) return [];

    const groupedData: { [key: string]: { values: number[]; tooltips: string[] } } = {};

    rows.forEach((row) => {
      const category = row[headers.indexOf(categoricalColumn)] as string;
      const numericValue = Number(row[headers.indexOf(numericColumn)]);
      const tooltipValue = tooltipColumn
        ? row[headers.indexOf(tooltipColumn)] as string
        : '';

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
      text: tooltips, // Aquí se pasa la información adicional para los tooltips
      type: 'box',
      name: key,
      hoverinfo: 'text', // Muestra solo el contenido del tooltip
    }));
  };

  return (
    <div>
      <h2>Dynamic Box Plot</h2>

      {/* Selección de columna categórica */}
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

      {/* Selección de columna numérica */}
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

      {/* Selección de columna para tooltips */}
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

      {/* Selección de categorías específicas */}
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

      {/* Renderizar Box Plot */}
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
