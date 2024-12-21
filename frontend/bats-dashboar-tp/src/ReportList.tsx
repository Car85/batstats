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

  const handleLoadReport = async (reportId: string) => {
    try {
      const response = await fetch(`http://localhost/batstats/report/${reportId}`);
      if (!response.ok) {
        throw new Error('Error al recuperar el reporte');
      }
  
      const { configuration } = await response.json();
      if (!configuration) {
        throw new Error('La configuración está vacía o es nula');
      }
  
      let parsedConfig;
      try {
        parsedConfig = JSON.parse(configuration);
      } catch (jsonError) {
        if (jsonError instanceof Error) {
          throw new Error('Error al parsear la configuración JSON: ' + jsonError.message);
        } else {
          throw new Error('Error desconocido al parsear la configuración JSON');
        }
      }
  
      const { pivotState = {}, boxPlotState = {} } = parsedConfig;

      console.log("Validated Pivot State:", pivotState);     
  
      setPivotState(pivotState);
      setBoxPlotState(boxPlotState);
    } catch (error) {
      console.error('Error al cargar la configuración:', error);
    }
  };
  

  return (
    <div>
      <h1>Your Reports</h1>
      <ul>
      <select onChange={(e) => handleLoadReport(e.target.value)}>
         <option value="" disabled selected>Select a report</option>
         {reports.map((report) => (
         <option key={report.id} value={report.id}>
            {report.name}
      </option>
        ))}
      </select>

      </ul>
    </div>
  );
}

export default ReportsList;
