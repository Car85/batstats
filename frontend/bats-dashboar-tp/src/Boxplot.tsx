import Plotly from 'react-plotly.js';

interface BoxPlotProps {
  data: (string | number)[][];
}

const BoxPlot = ({ data }: BoxPlotProps) => {
  // Extraemos las columnas numéricas
  const numericColumns = data[0]?.slice(1); // Ignora la primera columna (etiquetas)
  const numericData = data.slice(1); // Ignora la fila de encabezados

  // Generamos el box plot para cada columna numérica
  const boxPlots = numericColumns?.map((col, index) => ({
    y: numericData.map((row) => Number(row[index + 1])), // +1 para ignorar la primera columna
    type: 'box',
    name: col as string,
  }));

  return (
    <Plotly
      data={boxPlots}
      layout={{
        title: 'Box Plot: Percentiles, Mediana, y Outliers',
        yaxis: { title: 'Values' },
        xaxis: { title: 'Metrics' },
      }}
    />
  );
};

export default BoxPlot;
