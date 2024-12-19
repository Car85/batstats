import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import 'react-pivottable/pivottable.css';

interface Report {
  name: string;
  type: string;
  createdAt: string;
  configuration: string; 
}

interface ReportsListProps {
  setPivotState: Dispatch<SetStateAction<object>>; 
  setBoxPlotState: Dispatch<SetStateAction<object>>; 
}

function ReportsList({ setPivotState, setBoxPlotState }: Readonly<ReportsListProps>) {
  const [reports, setReports] = useState<Report[]>([]); 

  useEffect(() => {
    fetch('http://localhost/batstats/report/getAllReports')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al recuperar los informes');
        }
        return response.json();
      })
      .then((data: Report[]) => setReports(data)) 
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleLoadReport = (configuration: string) => {
    try {

      const { pivotState, boxPlotState } = JSON.parse(configuration);

      setPivotState(pivotState);
      setBoxPlotState(boxPlotState);
    } catch (error) {
      console.error('Error al cargar la configuración:', error);
    }
  };

  return (
    <div>
      <h1>Saved Reports</h1>
      <ul>
        {reports.map((report, index) => (
          <li key={index}>
            <h3>{report.name}</h3>
            <p>
              <strong>Type:</strong> {report.type}
            </p>
            <p>
              <strong>Creation Date:</strong> {new Date(report.createdAt).toLocaleString()}
            </p>
            <button onClick={() => handleLoadReport(report.configuration)}>
              Load Report
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportsList;
