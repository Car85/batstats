import React, { useEffect, useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';

function ReportsList({ pivotState, setPivotState, boxPlotState, setBoxPlotState  }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch('http://localhost/batstats/report/getAllReports')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al recuperar los informes');
        }
        return response.json();
      })
      .then((data) => setReports(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleLoadReport = (configuration) => {
    try {
      const parsedConfig = JSON.parse(configuration);
      setPivotState(parsedConfig); // Actualiza el estado de la PivotTable
    } catch (error) {
      console.error('Error al cargar la configuración:', error);
    }
  };

  return (
    <div>
      <h1>Reportes Guardados</h1>
      <ul>
        {reports.map((report, index) => (
          <li key={index}>
            <h3>{report.name}</h3>
            <p><strong>Tipo:</strong> {report.type}</p>
            <p><strong>Fecha de Creación:</strong> {new Date(report.createdAt).toLocaleString()}</p>
            <button onClick={() => handleLoadReport(report.configuration)}>
              Cargar Reporte
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportsList;
