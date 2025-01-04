import { MatrixDataState } from '@/types/Types';
import { useEffect, useState } from 'react';
import Plotly from 'react-plotly.js';
import { sampleCorrelation } from 'simple-statistics';


const CorrelationMatrix = ({data }: MatrixDataState) => {

  const [correlationMatrix, setCorrelationMatrix] = useState<number[][]>([]);
  const headers = data[0];
  const rows = data.slice(1).map(row => row.map(Number));


  const calculateCorrelationMatrix = (rows: number[][]) => {
    const n = rows.length;
    const m = headers.length;
    const matrix: number[][] = Array(m).fill(0).map(() => Array(m).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < m; j++) {
            const x = rows.map(row => row[i]);
            const y = rows.map(row => row[j]);
            if (n < 2) {
                matrix[i][j] = 0;
              } else {
                matrix[i][j] = sampleCorrelation(x, y);
              }
        }
    }
    return matrix;

  }

  useEffect(() => {
    if (data.length > 1) {
      const matrix = calculateCorrelationMatrix(rows);
      setCorrelationMatrix(matrix);
    }
  }, [data]);



  return (
    <div>
      <h2>Correlation Matrix</h2>
      {
  data.length > 1 &&(
    <Plotly
      data-testid="plotly-graph"
      data={[
        {
          z: correlationMatrix,
          x: headers,
          y: headers,
          type: 'heatmap',
          colorscale: 'Viridis',
          zmin: -1,
          zmax: 1,
          hoverongaps: false
        }
      ]}
      layout={{
        title: 'Correlation Heatmap',
        xaxis: { side: 'bottom' },
        yaxis: { autorange: 'reversed' }
      }}
    />
  ) 
}

    </div>
  );
};

export default CorrelationMatrix;

