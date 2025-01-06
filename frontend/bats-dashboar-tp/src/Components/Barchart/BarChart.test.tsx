import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BarChart from './BarChart'; 
import { BarChartState } from '../../types/Types';
import { describe, expect, test, vi } from 'vitest';

describe('BarChart Component', () => {
  const mockData: BarChartState['data'] = [
    ['Category', 'Value', 'Additional Value'],
    ['A', "10", "100"],
    ['B', "20", "200"],
    ['C', "30", "300"],
  ];

  test('renders "No data available" when no data is passed', () => {
    render(<BarChart data={[]} />);
    expect(screen.getByText(/No data available/i)).not.toBeNull();
  });

  test('renders select elements with correct options when data is provided', () => {
    render(<BarChart data={mockData} />);

    const categoricalSelect = screen.getByLabelText(/Select Categorical Column/i);
    expect(categoricalSelect).not.toBeNull();

    const options = screen.getAllByRole('option');
    expect(options.length).toBe(12);
    expect(options[1].textContent).toBe('Category');
    expect(options[2].textContent).toBe('Value');
    expect(options[3].textContent).toBe('Additional Value');
  });

  test('updates categorical column selection on change', () => {
    render(<BarChart data={mockData} />);

    const categoricalSelect = screen.getByLabelText(/Select Categorical Column/) as HTMLSelectElement;
    fireEvent.change(categoricalSelect, { target: { value: 'Category' } });

    expect(categoricalSelect.value).toBe('Category');
});


  test('updates numeric column selection on change', () => {
    render(<BarChart data={mockData} />);
    
    fireEvent.change(screen.getByLabelText(/Select Numeric Column/) as HTMLSelectElement, {
      target: { value: 'Value' },
    });

    expect((screen.getByLabelText(/Select Numeric Column/) as HTMLSelectElement).value).toBe('Value');
  });

  
  test('updates additional numeric column selection on change', () => {
    render(<BarChart data={mockData} />);
    
    fireEvent.change(screen.getByLabelText(/Select Additional Column for Tooltip/) as HTMLSelectElement, {
      target: { value: 'Additional Value' },
    });

    expect((screen.getByLabelText(/Select Additional Column for Tooltip/) as HTMLSelectElement).value).toBe('Additional Value');
  });

  test('renders the Plotly component when required fields are selected', async () => {
    render(<BarChart data={mockData} />);
    
    fireEvent.change(screen.getByLabelText(/Select Categorical Column/) as HTMLSelectElement, {
      target: { value: 'Category' },
    });
    fireEvent.change(screen.getByLabelText(/Select Numeric Column/) as HTMLSelectElement, {
      target: { value: 'Value' },
    });
    fireEvent.change(screen.getByLabelText(/Select Additional Column for Tooltip/) as HTMLSelectElement, {
      target: { value: 'Additional Value' },
    });

    await waitFor(() => {
       const graph = document.querySelector('.js-plotly-plot');
       expect(graph).not.toBeNull();
      });
    });
});
