import React, { useState } from 'react';

function SaveReport({ pivotState: any, boxPlotState: any }) {
  const [reportName, setReportName] = useState('');
  const [reportType, setReportType] = useState('');
  const dashboardData = {
    pivotState,
    boxPlotState,
    timestamp: new Date().toISOString(),
  };
  const handleSave = async () => {
    if (!reportName || !reportType) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const payload = {
      name: reportName,
      type: reportType,
      configuration: JSON.stringify(dashboardData),
      createdAt: new Date().toISOString(), 
    };

    try {
      const response = await fetch('http://localhost/batstats/report/save-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Report Saved');
      } else {
        alert('Error al guardar el reporte.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar el reporte.');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Save Report Configuration</h2>
      <div>
        <label>
          Name of Report:
          <input
            type="text"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            placeholder="Example: Batting Analysis"
          />
        </label>
      </div>
      <div>
        <label>
          Type of Report:
          <input
            type="text"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            placeholder="Example: Batting"
          />
        </label>
      </div>
      <button onClick={handleSave}>Save Report</button>
    </div>
  );
}

export default SaveReport;
