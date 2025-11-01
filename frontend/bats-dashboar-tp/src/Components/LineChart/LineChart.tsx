import { Data } from 'plotly.js';
import { BarChartState } from '../../types/Types';

import useBarChartState from './useLineChartState';
import Plot from 'react-plotly.js';
import { useEffect, useMemo } from 'react';

const LineChart = ({ data, onStateChange }: BarChartState & { onStateChange?: (state: { data: Data[]; layout: Partial<Plotly.Layout> }) => void }) => {

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const headers = useMemo(() => (Array.isArray(data) && data.length > 0 ? data[0] : []), [data]);
  const rows = useMemo(() => (Array.isArray(data) && data.length > 1 ? data.slice(1) : []), [data]);

  const {
    categoricalColumn,
    numericColumn,
    additionalColumn,
    selectedCategories,
    handleCategoricalChange,
    handleNumericChange,
    handleAdditionalColumnChange,
  } = useBarChartState(headers);

  const lineChartData = useMemo(() => {
    if (!categoricalColumn || !numericColumn || !additionalColumn) {
      return [];
    }

    const categoricalIndex = headers.indexOf(categoricalColumn);
    const numericIndex = headers.indexOf(numericColumn);
    const additionalIndex = headers.indexOf(additionalColumn);

    if (categoricalIndex === -1 || numericIndex === -1 || additionalIndex === -1) {
      return [];
    }

    const groupedData: { x: string[]; y: number[]; tooltips: string[] } = {
      x: [],
      y: [],
      tooltips: [],
    };

    const cleanRows = rows.filter((row) =>
      row.length > 1 && row.some((cell) => cell !== null && cell !== undefined && cell !== '')
    );

    cleanRows.forEach((row) => {
      const category = String(row[categoricalIndex] ?? '');
      const numericValue = Number(row[numericIndex]);
      const additionalValue = row[additionalIndex] ?? 'N/A';

      if (!Number.isFinite(numericValue)) {
        return;
      }

      if (!selectedCategories.length || selectedCategories.includes(category)) {
        groupedData.x.push(category);
        groupedData.y.push(numericValue);
        groupedData.tooltips.push(`${category}, ${numericValue}, ${additionalColumn}: ${additionalValue}`);
      }
    });

    return [
      {
        x: groupedData.x.filter((value) => value !== undefined && value !== null && value !== ''),
        y: groupedData.y.filter((value) => Number.isFinite(value)),
        type: 'scatter',
        mode: 'lines+markers',
        text: groupedData.tooltips,
        hoverinfo: 'text',
      },
    ];
  }, [additionalColumn, headers, numericColumn, rows, selectedCategories, categoricalColumn]);
  
  useEffect(() => {
    if (onStateChange) {

      const layout = {
        title:
          'Line Chart: Dynamic Analysis'
      };

      onStateChange({
        data: lineChartData as Data[],
        layout,
      });
    }
  }, [additionalColumn, categoricalColumn, lineChartData, numericColumn, onStateChange, selectedCategories]);

  return (
    <div>
      <h2>LineChart</h2>

      <div>
        <label htmlFor="categoricalColumn">X-Axis</label>
        <select
          id="categoricalColumn"
          value={categoricalColumn || ''}
          onChange={handleCategoricalChange}
        >
          <option value="">👇</option>
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
          <option value="">👇</option>
          {headers.map((header) => (
            <option key={header} value={header}>
              {header}
            </option>
          ))}
        </select>
      </div>


      <div>
        <label htmlFor="additionalNumericColumn">Tooltip</label>
        <select
          id="additionalNumericColumn"
          value={additionalColumn || ''}
          onChange={handleAdditionalColumnChange}
        >
          <option value="">👇</option>
          {headers.map((header) => (
            <option key={header} value={header}>
              {header}
            </option>
          ))}
        </select>
      </div>

        {categoricalColumn && numericColumn && additionalColumn && (
          <Plot
            data={lineChartData as Data[]}
            config={{
              autosizable: true,
              displaylogo: false,
            }}
            layout={{
              title: 'Line Chart: Dynamic Analysis',
              yaxis: { title: numericColumn },
              xaxis: { title: categoricalColumn },
              autosize: true,
            }}
            useResizeHandler={true}
            style={{maxWidth: "70vw", minWidth: "50vw"}}
          />
        )}
    </div>
  );
};

export default LineChart;




