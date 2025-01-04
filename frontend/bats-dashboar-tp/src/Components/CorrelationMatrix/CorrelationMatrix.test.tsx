import { render, screen } from '@testing-library/react';
import CorrelationMatrix from './CorrelationMatrix';
import { describe, expect, test } from 'vitest';

type DataRow = {
    col1: number;
    col2: number;
    col3?: number; 
};
  
const mockData: DataRow[] = [
    { col1: 1, col2: 2, col3: 3 },
    { col1: 4, col2: 5, col3: 6 }
];

const transformedData = mockData.map(item => [item.col1, item.col2, item.col3 ?? 0]);



const mockHeaders: string[] = ['col1', 'col2', 'col3'];

const mockCorrelationMatrix: number[][] = [
    [1, 0.8, 0.5],
    [0.8, 1, 0.3],
    [0.5, 0.3, 1]
];

describe('CorrelationMatrix Component', () => {
   
  const mockInvalidData: DataRow[] = [
    { col1: 1, col2: 2 },
    { col1: 3, col2: 4 }
  ];

  test('renders the title', () => {
    render(<CorrelationMatrix data={transformedData} headers={mockHeaders} correlationMatrix={mockCorrelationMatrix} />);
    expect(screen.getByText('Correlation Matrix')).not.toBeNull();
  });

  test('renders "No data available" with empty data', async () => {
    render(<CorrelationMatrix data={[]} headers={mockHeaders} correlationMatrix={mockCorrelationMatrix} />);
    const noDataMessage = await screen.findByTestId('no-data-message');
    expect(noDataMessage).not.toBeNull();
  });

  test('renders the Correlation Matrix with Plotly when data length > 1', () => {
    render(
      <CorrelationMatrix
        data={transformedData}
        headers={mockHeaders}
        correlationMatrix={mockCorrelationMatrix}
      />
    );

    expect(screen.getByText('Correlation Matrix')).not.toBeNull();
    expect(screen.getByTestId('plotly-graph')).not.toBeNull();
  });

  test('does not render Plotly when data length <= 1', () => {
    render(
      <CorrelationMatrix
        data={[ [1, 2, 3] ]} 
        headers={mockHeaders}
        correlationMatrix={mockCorrelationMatrix}
      />
    );

    expect(screen.getByText('Correlation Matrix')).not.toBeNull();
    expect(screen.queryByTestId('plotly-graph')).toBeNull();
  });
});
