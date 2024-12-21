import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import Plotly from 'react-plotly.js';

interface BoxPlotProps {
  data: (string | number)[][];
  onChange: Dispatch<SetStateAction<object>>;
}

const BoxPlot = ({ data, onChange }: BoxPlotProps) => {
  const [categoricalColumn, setCategoricalColumn] = useState<string | null>(null);
  const [numericColumn, setNumericColumn] = useState<string | null>(null);
  const [tooltipColumn, setTooltipColumn] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const headers = data[0] as string[]; // Encabezados
  const rows = data.slice(1); // Datos

  // Manejar selección de columna para tooltips
  const handleTooltipChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTooltipColumn(event.target.value);
  };


  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedCategories(options);
  };
   const handleCategoricalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoricalColumn(event.target.value);
    setSelectedCategories([]); // Resetear categorías al cambiar de columna categórica
  };

  // Generar los datos para el gráfico solo cuando cambien las dependencias relevantes
  const boxPlotData = useMemo(() => {
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
        groupedData[category].tooltips.push(`${category}, ${numericValue}, ${tooltipValue}`);
      }
    });

    return Object.entries(groupedData).map(([key, { values, tooltips }]) => ({
      y: values,
      text: tooltips,
      type: 'box',
      name: key,
      hoverinfo: 'text',
    }));
  }, [categoricalColumn, numericColumn, tooltipColumn, selectedCategories, rows, headers]);

  // Actualizar el estado del boxPlot en el padre solo cuando `boxPlotData` cambie
  React.useEffect(() => {
    onChange({
      categoricalColumn,
      numericColumn,
      tooltipColumn,
      selectedCategories,
      boxPlotData,
    });
  }, [categoricalColumn, numericColumn, tooltipColumn, selectedCategories, boxPlotData, onChange]);

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
          onChange={(e) => setNumericColumn(e.target.value)}
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

      <Plotly
        data={boxPlotData}
        layout={{
          title: 'Box Plot: Dynamic Analysis',
          yaxis: { title: numericColumn },
          xaxis: { title: categoricalColumn },
        }}
      />
    </div>
  );
};

export default BoxPlot;
