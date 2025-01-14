// useBoxPlotData.ts
import { Data } from 'plotly.js';

const useBoxPlotData = (headers: string[], rows: string[][], categoricalColumn: string, numericColumn: string, tooltipColumn: string, selectedCategories: string[]): Data[] => {
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

  return boxPlotData();
};

export default useBoxPlotData;
