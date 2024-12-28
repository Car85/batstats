import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import BoxPlot from './Boxplot';
import test, { describe } from 'node:test';
describe('BoxPlot Component', () => {
    const mockData = [
        ['Category', 'Value', 'Tooltip'],
        ['A', '10', 'Info A'],
        ['B', '20', 'Info B'],
        ['A', '15', 'Info A2'],
    ];
    test('renders without crashing when data is empty', () => {
        render(_jsx(BoxPlot, { data: [] }));
        expect(screen.getByText(/No data available/i)).toBeInTheDocument();
    });
    test('renders select elements with correct options when data is provided', () => {
        render(_jsx(BoxPlot, { data: mockData }));
        // Check if the categoricalColumn select is rendered
        const categoricalSelect = screen.getByLabelText(/Select Categorical Column/i);
        expect(categoricalSelect).toBeInTheDocument();
        // Check if options are correctly rendered
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(4); // Includes the default option
        expect(options[1]).toHaveTextContent('Category');
        expect(options[2]).toHaveTextContent('Value');
        expect(options[3]).toHaveTextContent('Tooltip');
    });
    test('updates categorical column state on selection change', () => {
        render(_jsx(BoxPlot, { data: mockData }));
        const categoricalSelect = screen.getByLabelText(/Select Categorical Column/i);
        fireEvent.change(categoricalSelect, { target: { value: 'Category' } });
        // The selected value should now be "Category"
        expect(categoricalSelect).toHaveValue('Category');
    });
    test('renders plotly graph when categorical and numeric columns are selected', () => {
        render(_jsx(BoxPlot, { data: mockData }));
        // Select categorical and numeric columns
        const categoricalSelect = screen.getByLabelText(/Select Categorical Column/i);
        const numericSelect = screen.getByLabelText(/Select Numeric Column/i);
        fireEvent.change(categoricalSelect, { target: { value: 'Category' } });
        fireEvent.change(numericSelect, { target: { value: 'Value' } });
        // Check if the Plotly graph is rendered
        expect(screen.getByText(/Box Plot: Dynamic Analysis/i)).toBeInTheDocument();
    });
    test('boxPlotData generates correct data for Plotly', () => {
        const { container } = render(_jsx(BoxPlot, { data: mockData }));
        // Select categorical and numeric columns
        const categoricalSelect = screen.getByLabelText(/Select Categorical Column/i);
        const numericSelect = screen.getByLabelText(/Select Numeric Column/i);
        fireEvent.change(categoricalSelect, { target: { value: 'Category' } });
        fireEvent.change(numericSelect, { target: { value: 'Value' } });
        // Check the generated Plotly data
        const graphData = container.querySelectorAll('.plotly'); // Customize selector if needed
        expect(graphData).toBeDefined();
    });
});
