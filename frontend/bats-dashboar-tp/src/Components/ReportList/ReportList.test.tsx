import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi} from 'vitest';
import ReportsList from './ReportList';


global.fetch = vi.fn();


describe('ReportsList Component', () => {
    it('renders the title and select dropdown', () => {
      render(<ReportsList setPivotState={vi.fn()} setBoxPlotState={vi.fn()} />);
  
      expect(screen.getByText(/Your Reports/i)).not.toBeNull();
      expect(screen.getByRole('combobox')).not.toBeNull();
      expect(screen.getByText(/Select a report/i)).not.toBeNull();
    });
  });


describe('ReportsList Component - LocalStorage', () => {
    beforeEach(() => {
      localStorage.clear();
    });
  
    it('loads reports from localStorage and displays them in the dropdown', () => {
      const mockReports = [
        { id: '1', name: 'Report 1' },
        { id: '2', name: 'Report 2' },
      ];
      localStorage.setItem('reports', JSON.stringify(mockReports));
  
      render(<ReportsList setPivotState={vi.fn()} setBoxPlotState={vi.fn()} />);
      const options = screen.getAllByRole('option');
  
      expect(options).toHaveLength(mockReports.length + 1); 
      expect(screen.getByText('Report 1')).not.toBeNull();
      expect(screen.getByText('Report 2')).not.toBeNull();
    });
  });

describe('ReportsList Component - Fetch', () => {
    beforeEach(() => {
      vi.clearAllMocks(); 
      localStorage.clear(); 
    });
  
    it('calls fetch and updates state on report selection', async () => {
      const mockSetPivotState = vi.fn();
      const mockSetBoxPlotState = vi.fn();
      const mockReport = { id: '1', name: 'Report 1' };
  
      localStorage.setItem('reports', JSON.stringify([mockReport]));
  
      (global.fetch as ReturnType<typeof vi.fn>).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: async () => ({
            configuration: JSON.stringify({
              pivotState: { rows: ['test'] },
              boxPlotState: { x: 'testX' },
            }),
          }),
        })
      );
  
      render(
        <ReportsList
          setPivotState={mockSetPivotState}
          setBoxPlotState={mockSetBoxPlotState}
        />
      );
  
      fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
  
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('http://localhost/batstats/report/1');
        expect(mockSetPivotState).toHaveBeenCalledWith({ rows: ['test'] });
        expect(mockSetBoxPlotState).toHaveBeenCalledWith({ x: 'testX' });
      });
    });
  });