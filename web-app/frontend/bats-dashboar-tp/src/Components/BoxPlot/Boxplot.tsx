import Plotly from 'react-plotly.js';
import { BoxPlotState, PlotYaout } from '../../types/Types';
import useBoxPlotState from './useBoxPlotState';
import { Data } from 'plotly.js';
import { useEffect, useMemo } from 'react';


export const boxPlotData = (
  headers: string[],
  rows: string[][],
  categoricalColumn: string,
  numericColumn: string,
  tooltipColumn: string,
  selectedCategories: string[]): Data[] => {

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

  return Object.entries(groupedData).map(([key, { values }], index) => ({
    key: `box-${index}`,
    y: values,
    type: 'box',
    name: key,
 }));
};

const BoxPlot = ({ data, onStateChange }: BoxPlotState & { onStateChange?: (state: { data: Data[]; layout: PlotYaout }) => void }) => {


  const headers = useMemo(() => (Array.isArray(data) && data.length > 0 && Array.isArray(data[0]) ? data[0] : []), [data]);
  const rows = useMemo(() => (data && data.length > 1 ? data.slice(1) : []), [data]);


  const {
    categoricalColumn,
    tooltipColumn,
    numericColumn,
    selectedCategories,
    handleCategoricalChange,
    handleNumericChange,
    handleCategoryChange
  } = useBoxPlotState(headers);


  const plotData = useMemo((): Data[] => {
    if (!headers.length || !rows.length) return [];
    return boxPlotData(headers, rows, categoricalColumn, numericColumn || '', tooltipColumn, selectedCategories);
  }, [headers, rows, categoricalColumn, numericColumn, tooltipColumn, selectedCategories]);


   const plotLayout = useMemo((): PlotYaout => {
    return {
      title: 'Box Plot: Dynamic Analysis',
      yaxis: { title: numericColumn || 'Y-Axis' },
      xaxis: { title: categoricalColumn || 'X-Axis' },
      autosize: true,

    }as PlotYaout;
  }, [numericColumn, categoricalColumn]);



  useEffect(() => {
    if (onStateChange && plotData.length > 0) {
      onStateChange({ data: plotData, layout: plotLayout });
    }
  }, [plotData, plotLayout, onStateChange]);

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="lables">
      <h2>Dynamic Box Plot</h2>

      <div>
        <label htmlFor="categoricalColumn">X-Axis</label>
        <select
          id="categoricalColumn"
          value={categoricalColumn}
          onChange={handleCategoricalChange}
          >
          <option value="" selected>👇</option>
          {Array.isArray(headers) &&
            headers.map((header) => (
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
          <option value="" selected>👇</option>
          {headers.map((header, index) => (
            <option key={`${header}-${index}`} value={header}>
              {header}
            </option>
          ))}
        </select>
      </div>

     {categoricalColumn && (
      <div className="flex items-center text-center gap-2.5">
        <label className="min-w-30 text-right" htmlFor="categoryFilter">Categories:</label>
          <select
            id="categoryFilter"
            multiple
            value={selectedCategories}
            onChange={handleCategoryChange}
          >
            {Array.from(new Set(rows.map((row) => row[headers.indexOf(categoricalColumn)]))).map(
              (category, index) => (
                <option key={`${category}-${index}`} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
        </div>
      )}

      {categoricalColumn && numericColumn && (
        <Plotly
          data={plotData}
          config={{
            autosizable: true,
            displaylogo: false,
          }}
          layout={plotLayout}
          useResizeHandler={true}
          style={{minWidth: "45vw", maxWidth: "75vw"}}
          />
      )}
    </div>
  );
};

export default BoxPlot;
