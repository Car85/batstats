import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock react-papaparse
vi.mock('react-papaparse', () => ({
  useCSVReader: () => ({
    CSVReader: ({ onUploadAccepted }: any) => (
      <div
        onClick={() =>
          onUploadAccepted({
            data: [
              ['Column1', 'Column2'],
              ['Value1', 'Value2'],
            ],
          })
        }
      >
        Mocked CSV Reader
      </div>
    ),
  }),
}));

describe('App Component - Render', () => {
  it('renders subcomponents after CSV upload', async () => {
    render(<App />);

    const mockCSVReader = screen.getByText(/Mocked CSV Reader/i);

    fireEvent.click(mockCSVReader);

    await waitFor(() => {
      expect(screen.getByText(/Your Reports/i)).not.toBeNull();
      expect(screen.getByRole('button', { name: /Save Report/i })).not.toBeNull();
    });
  });
});
