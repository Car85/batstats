import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import 'react-pivottable/pivottable.css';

interface Report {
  id: string;
  name: string;
}

interface ReportsListProps {
  setPivotState: Dispatch<SetStateAction<object>>;
  setBoxPlotState: Dispatch<SetStateAction<object>>;
}

function ReportsList({ setPivotState, setBoxPlotState }: Readonly<ReportsListProps>) {
  const [reports, setReports] = useState<Report[]>([]);

  // Cargar reportes desde el localStorage al iniciar
  useEffect(() => {
    const reportsFromStorage = localStorage.getItem('reports');
    if (reportsFromStorage) {
      setReports(JSON.parse(reportsFromStorage));
    }
  }, []);

  // Manejar la carga de un reporte específico
  const handleLoadReport = async (reportId: string) => {
    try {
      const response = await fetch(`http://localhost/batstats/report/${reportId}`);
      if (!response.ok) {
        throw new Error('Error al recuperar el reporte');
      }
      const { pivotState, boxPlotState } = await response.json();

      setPivotState(pivotState);
      setBoxPlotState(boxPlotState);
    } catch (error) {
      console.error('Error al cargar la configuración:', error);
    }
  };

  return (
    <div>
      <h1>Reports</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <h5>{report.name}</h5>
            <button onClick={() => handleLoadReport(report.id)}>Load Report</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportsList;
