import { render, screen, fireEvent } from '@testing-library/react';
import BoxPlot from './Boxplot.js';

describe('BoxPlot Component', () => {
  const mockData = [
    ['Category', 'Value', 'Tooltip'],
    ['A', '10', 'Info A'],
    ['B', '20', 'Info B'],
    ['A', '15', 'Info A2'],
  ];

  test('renders without crashing when data is empty', () => {
    render(<BoxPlot data={[]} />);
    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });

  test('renders select elements with correct options when data is provided', () => {
    render(<BoxPlot data={mockData} />);

    const categoricalSelect = screen.getByLabelText(/Select Categorical Column/i);
    expect(categoricalSelect).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4); // Includes the default option
    expect(options[1]).toHaveTextContent('Category');
    expect(options[2]).toHaveTextContent('Value');
    expect(options[3]).toHaveTextContent('Tooltip');
  });

  test('updates categorical column state on selection change', () => {
    render(<BoxPlot data={mockData} />);

    const categoricalSelect = screen.getByLabelText(/Select Categorical Column/i);
    fireEvent.change(categoricalSelect, { target: { value: 'Category' } });

    expect(categoricalSelect).toHaveValue('Category');
  });

  test('renders plotly graph when categorical and numeric columns are selected', () => {
    render(<BoxPlot data={mockData} />);

    const categoricalSelect = screen.getByLabelText(/Select Categorical Column/i);
    const numericSelect = screen.getByLabelText(/Select Numeric Column/i);

    fireEvent.change(categoricalSelect, { target: { value: 'Category' } });
    fireEvent.change(numericSelect, { target: { value: 'Value' } });

    expect(screen.getByText(/Box Plot: Dynamic Analysis/i)).toBeInTheDocument();
  });
});
