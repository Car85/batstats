import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock de react-papaparse
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

    // Encuentra el componente mockeado
    const mockCSVReader = screen.getByText(/Mocked CSV Reader/i);

    // Simula el clic para cargar el archivo
    fireEvent.click(mockCSVReader);

    // Verifica que los subcomponentes se rendericen correctamente
    await waitFor(() => {
      expect(screen.getByText(/Your Reports/i)).not.toBeNull();
      expect(screen.getByRole('button', { name: /Save Report/i })).not.toBeNull();
    });
  });
});
