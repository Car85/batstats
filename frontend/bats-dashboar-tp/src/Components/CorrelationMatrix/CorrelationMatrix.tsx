import React, { useState, useEffect } from 'react';
import { sampleCorrelation } from 'simple-statistics';

interface CorrelationMatrixProps {
  data: string[][];
}

const CorrelationMatrix = ({ data }: CorrelationMatrixProps) => {
  const [correlationMatrix, setCorrelationMatrix] = useState<number[][]>([]);
  const headers = data[0];
  const rows = data.slice(1).map(row => row.map(cell => Number(cell)));

  const calculateCorrelationMatrix = (rows: number[][]): number[][] => {
    const m = headers.length;
    const matrix: number[][] = Array(m).fill(0).map(() => Array(m).fill(0));

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < m; j++) {
        const pairedValues = rows
          .map(row => [row[i], row[j]])
          .filter(([xi, yi]) => !isNaN(xi) && !isNaN(yi)); // Filtra solo pares válidos
        
        const x = pairedValues.map(([xi]) => xi);
        const y = pairedValues.map(([, yi]) => yi);

        matrix[i][j] = (x.length > 1 && y.length > 1)
          ? parseFloat(sampleCorrelation(x, y).toFixed(2)) 
          : 0; // Evita cálculos con menos de dos valores
      }
    }
    return matrix;
  };

  useEffect(() => {
    if (data.length > 1) {
      const matrix = calculateCorrelationMatrix(rows);
      setCorrelationMatrix(matrix);
    }
  }, [data]);

  return (
    <div>
      <h2>Correlation Matrix (Table)</h2>
      {data.length > 1 ? (
        <table border={1} cellPadding={5} style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th></th>
              {headers.map((header, index) => (
                <th key={`header-${index}`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {correlationMatrix.map((row, i) => (
              <tr key={`row-${i}`}>
                <td>{headers[i]}</td>
                {row.map((value, j) => (
                  <td
                    key={`cell-${i}-${j}`}
                    style={{
                      backgroundColor: `rgba(0, 0, 255, ${Math.abs(value)})`,
                      color: Math.abs(value) > 0.5 ? 'white' : 'black',
                    }}
                  >
                    {isNaN(value) ? 'N/A' : value.toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default CorrelationMatrix;
