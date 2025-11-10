import { MatrixDataState } from '@/types/Types';
import React, { useState, useEffect } from 'react';
import { sampleCorrelation } from 'simple-statistics';


const CorrelationMatrix = ({ data }: MatrixDataState) => {
  const [correlationMatrix, setCorrelationMatrix] = useState<number[][]>([]);
  const [filteredHeaders, setFilteredHeaders] = useState<string[]>([]);

  const filterNumericalColumns = (data: string[][]): string[][] => {
    const headers = data[0];
    const rows = data.slice(1);
    const numericalColumnIndices: number[] = [];

    headers.forEach((_, colIndex) => {
        const column = rows.map(row => row[colIndex]);
        const hasNumbers = column.some(cell => /\d/.test(cell));  
        const hasLetters = column.some(cell => /[a-zA-Z]/.test(cell));

        if (hasNumbers && !hasLetters) {
            numericalColumnIndices.push(colIndex);
        }
    });

    if (numericalColumnIndices.length === 0) {
        console.warn("No numeric columns detected, returning original dataset.");
        return data;
    }

    const filteredHeaders = numericalColumnIndices.map(index => headers[index]);
    const filteredData = rows.map(row =>
        numericalColumnIndices.map(index => row[index])
    );

    return [filteredHeaders, ...filteredData];
};

const calculateCorrelationMatrix = (numericRows: string[][]): number[][] => {
  const rows = numericRows.slice(1);
  const m = numericRows[0].length;
  const matrix: number[][] = Array(m).fill(0).map(() => Array(m).fill(0));

  for (let i = 0; i < m; i++) {
      for (let j = 0; j < m; j++) {
          const columnI = rows.map(row => parseFloat(row[i])).filter(value => !isNaN(value));
          const columnJ = rows.map(row => parseFloat(row[j])).filter(value => !isNaN(value));

          if (columnI.length > 1 && columnJ.length > 1) {
              const correlation = sampleCorrelation(columnI, columnJ);
              matrix[i][j] = parseFloat(correlation.toFixed(2));
          } else {
              matrix[i][j] = 0;
          }
      }
  }

  return matrix;
};

useEffect(() => {
    if (data!.length > 1) {
        const mergedData = filterNumericalColumns(data!);
        const headers = mergedData[0];
        const filteredData = mergedData.slice(1);

        if (filteredData.length > 0) {
            const matrix = calculateCorrelationMatrix(mergedData);
            setCorrelationMatrix(matrix);
            setFilteredHeaders(headers);
        } else {
            console.error("No numeric columns found for correlation calculation.");
        }
    }
}, [data]);

  return (
    <div className="p-32 block">
        {correlationMatrix.length > 0 ? (
        <table border={1} cellPadding={5}>
        <thead>
            <tr>
              <th></th>
              {filteredHeaders.map((header, index) => (
                <th key={`header-${index}`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {correlationMatrix.map((row, i) => (
              <tr key={`row-${i}`}>
                <td>{filteredHeaders[i]}</td>
                {row.map((value, j) => (
                  <td
                    key={`cell-${i}-${j}`}
                    style={{
                      backgroundColor: `#001f3f`,
                      color: Math.abs(value) > 0.5 ? '#dbc234' : '#535bf2',
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
        <p>No numeric data available for correlation calculation.</p>
      )}
    </div>
  );
};

export default CorrelationMatrix;
