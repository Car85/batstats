import { Data } from 'plotly.js';
import { BarChartState, BarLayout } from '../../types/Types';

import useBarChartState from './useBarChartState';
import Plot from 'react-plotly.js';
import { useEffect, useMemo } from 'react';

const BarChart = ({ data, onStateChange }:

                  BarChartState & {

                  onStateChange?: (state:

                  { data: Data[];

                  layout: BarLayout })

                  => void }) => {


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
  
  const barChartData = useMemo(() => {
    if (!categoricalColumn || !numericColumn || !additionalColumn) {
      return [];
    }

    const categoricalIndex = headers.indexOf(categoricalColumn);
    const numericIndex = headers.indexOf(numericColumn);
    const additionalIndex = headers.indexOf(additionalColumn);

    if (categoricalIndex === -1 || numericIndex === -1 || additionalIndex === -1) {
      return [];
    }

    const groupedData: { [key: string]: { values: number[]; tooltips: string[] } } = {};

    rows.forEach((row) => {
      const category = String(row[categoricalIndex] ?? '');
      const numericValue = Number(row[numericIndex]);
      const additionalValue = row[additionalIndex];

      if (!Number.isFinite(numericValue)) {
        return;
      }

      if (!selectedCategories.length || selectedCategories.includes(category)) {
        if (!groupedData[category]) {
          groupedData[category] = { values: [], tooltips: [] };
        }
        groupedData[category].values.push(numericValue);
        groupedData[category].tooltips.push(`${category}, ${numericValue}, ${additionalColumn}: ${additionalValue ?? ''}`);
      }
    });

    return Object.entries(groupedData)
      .sort(([, a], [, b]) => {
        const sumA = a.values.reduce((acc, val) => acc + val, 0);
        const sumB = b.values.reduce((acc, val) => acc + val, 0);
        return sumB - sumA;
      })
      .map(([key, { values, tooltips }]) => ({
        y: values,
        x: Array.from({ length: values.length }, (_, i) => i + 1),
        type: 'bar' as const,
        name: key,
        text: tooltips,
        hoverinfo: 'text',
        textposition: 'none',
      }));
  }, [additionalColumn, headers, numericColumn, rows, selectedCategories, categoricalColumn]);

  useEffect(() => {
    if (!onStateChange || !categoricalColumn || !numericColumn || !additionalColumn) {
      return;
    }

    const numericIndex = headers.indexOf(numericColumn);
    const categoricalIndex = headers.indexOf(categoricalColumn);

    if (numericIndex === -1 || categoricalIndex === -1) {
      return;
    }

    const numericValues = rows
      .map((row) => Number(row[numericIndex]))
      .filter((value) => Number.isFinite(value));

    const minNumeric = numericValues.length ? Math.min(...numericValues) : 0;
    const maxNumeric = numericValues.length ? Math.max(...numericValues) : 0;

    const layout: BarLayout = {
      title: {
        text: 'Bar Chart: Dynamic Analysis',
      },
      yaxis: {
        title: {
          text: numericColumn,
        },
        type: 'linear',
        range: [minNumeric, maxNumeric],
        autorange: !numericValues.length,
      },
      xaxis: {
        title: {
          text: categoricalColumn,
        },
        type: 'category',
        range: [0, Math.max(rows.length - 1, 0)],
        autorange: rows.length === 0,
      },
    };

    onStateChange({
      data: barChartData,
      layout,
    });
  }, [additionalColumn, barChartData, categoricalColumn, headers, numericColumn, onStateChange, rows.length]);


  return (
    <div className="lables">
      <h2>BarChart</h2>

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
        <label htmlFor="additionalNumericColumn">Tooltip:</label>
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

      <div>
        {categoricalColumn && numericColumn && additionalColumn && (
          <Plot
            data={barChartData}
            config={{
              autosizable: true,
              displaylogo: false,
            }}
            layout={{
              title: 'Bar Chart: Dynamic Analysis',
              yaxis: { title: numericColumn },
              xaxis: { title: categoricalColumn },
              autosize: true,
            }}
            useResizeHandler={true}
            style={{minWidth: "45vw", maxWidth: "75vw"}}
          />
        )}
      </div>
    </div>
  );
};

export default BarChart;
