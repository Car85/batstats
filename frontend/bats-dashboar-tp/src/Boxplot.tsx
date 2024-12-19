import React, { Dispatch, SetStateAction, useState } from 'react';
import Plotly from 'react-plotly.js';
import { Data } from 'plotly.js';


interface BoxPlotProps {
  data: (string | number)[][];
}
interface ExtendedBoxPlotProps extends BoxPlotProps {
  onChange?: Dispatch<SetStateAction<{}>>;
}
const BoxPlot = ({ data }: ExtendedBoxPlotProps) => {
  const [categoricalColumn, setCategoricalColumn] = useState<string | null>(null);
  const [numericColumn, setNumericColumn] = useState<string | null>(null);
  const [tooltipColumn, setTooltipColumn] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Validar si data tiene datos
  const headers = data.length > 0 ? (data[0] as string[]) : []; // Fila de encabezados
  const rows = data.length > 1 ? data.slice(1) : []; // Filas de datos

  const handleCategoricalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoricalColumn(event.target.value);
    setSelectedCategories([]); // Resetear categorías al cambiar de columna categórica
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
    if (!categoricalColumn || !numericColumn || headers.length === 0) return [];

    const groupedData: { [key: string]: { values: number[]; tooltips: string[] } } = {};

    rows.forEach((row) => {
      const categoryIndex = headers.indexOf(categoricalColumn);
      const numericIndex = headers.indexOf(numericColumn);
      const tooltipIndex = tooltipColumn ? headers.indexOf(tooltipColumn) : -1;

      if (categoryIndex === -1 || numericIndex === -1) return;

      const category = row[categoryIndex] as string;
      const numericValue = Number(row[numericIndex]);
      const tooltipValue =
        tooltipIndex !== -1 && tooltipColumn
          ? `${tooltipColumn}: ${row[tooltipIndex]}`
          : '';

      if (!selectedCategories.length || selectedCategories.includes(category)) {
        if (!groupedData[category]) {
          groupedData[category] = { values: [], tooltips: [] };
        }
        groupedData[category].values.push(numericValue);
        groupedData[category].tooltips.push(`${category}, ${numericValue}, ${tooltipValue}`);
      }
    });

    return Object.entries(groupedData).map(([key, { values, tooltips }]) => ({
      y: values,
      text: tooltips, // Tooltips dinámicos
      type: 'box',
      name: key,
      hoverinfo: 'text', // Mostrar contenido de los tooltips
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
