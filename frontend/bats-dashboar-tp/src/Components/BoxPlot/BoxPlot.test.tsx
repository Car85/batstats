import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BoxPlot from './Boxplot';
import { describe, expect, test, vi } from 'vitest';

vi.mock('plotly.js', () => ({
  newPlot: vi.fn(),
}));

describe('BoxPlot Component', () => {
  const mockData = [
    ['Category', 'Value', 'Tooltip'],
    ['A', '10', 'Info A'],
    ['B', '20', 'Info B'],
    ['A', '15', 'Info A2'],
  ];

  test('renders without crashing when data is empty', () => {
    render(<BoxPlot data={[]} />);
    const noDataMessage = screen.getByText(/No data available/i);
    expect(noDataMessage).not.toBeNull(); 
  });

  test('renders BoxPlot component', () => {
    render(<BoxPlot data={mockData} />);
    const header = screen.getByText(/Dynamic Box Plot/i);
    expect(header).not.toBeNull(); 
  });
  
  

  test('renders select elements with correct options when data is provided', () => {
    render(<BoxPlot data={mockData} />);

    const categoricalSelect = screen.getByLabelText(/Select Categorical Column/i);
    expect(categoricalSelect).not.toBeNull();

    const options = screen.getAllByRole('option');
    expect(options.length).toBe(12);
    expect(options[1].textContent).toBe('Category');
    expect(options[2].textContent).toBe('Value');
    expect(options[3].textContent).toBe('Tooltip');
  });

  test('updates categorical column state on selection change', () => {
    render(<BoxPlot data={mockData} />);

    const categoricalSelect = screen.getByLabelText(/Select Categorical Column/i);
    fireEvent.change(categoricalSelect, { target: { value: 'Category' } });

    expect((categoricalSelect as HTMLSelectElement).value).toBe('Category');
  });

  test('renders plotly graph when categorical and numeric columns are selected', async () => {
    render(<BoxPlot data={mockData} />);
  
    const categoricalSelect = screen.getByLabelText(/Select Categorical Column/i);
    const numericSelect = screen.getByLabelText(/Select Numeric Column/i);
  
    fireEvent.change(categoricalSelect, { target: { value: 'Category' } });
    fireEvent.change(numericSelect, { target: { value: 'Value' } });
  
    await waitFor(() => {
      const graph = document.querySelector('.js-plotly-plot');
      expect(graph).not.toBeNull();
    });
  });
});
