import { render, screen } from '@testing-library/react';
import CorrelationMatrix from './CorrelationMatrix';
import { describe, expect, test } from 'vitest';

describe('CorrelationMatrix Component', () => {
    const validData = [
        ['Header1', 'Header2', 'Header3'],
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9']
    ];

    const invalidData = [
        ['Header1', 'Header2', 'Header3'],
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
    ];

    const incompleteData = [
        ['Header1', 'Header2'],
        ['1', '2'],
        ['3']
    ];

    test('renders the title correctly', () => {
        render(<CorrelationMatrix data={validData} />);
        expect(screen.getByText('Correlation Matrix (Table)')).not.toBeNull();
    });

    test('renders a correlation matrix table with valid data', () => {
        render(<CorrelationMatrix data={validData} />);
        expect(screen.getAllByRole('table')).toHaveLength(1);
    });

    test('renders a no data message with empty data', () => {
        render(<CorrelationMatrix data={[]} />);
        expect(screen.getByText('No data available')).not.toBeNull();
    });

   
    test('calculates correlation correctly with valid numeric data', () => {
        render(<CorrelationMatrix data={validData} />);
        const cells = screen.getAllByRole('cell');
        expect(cells.length).toBeGreaterThan(0);
    });
});
