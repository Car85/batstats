import React, { useState } from 'react';
import 'react-pivottable/pivottable.css';
function SaveData({ pivotState }) {
    const [dataName, setDataName] = useState('');
    const [dataDescription, setDataDescription] = useState('');
  
    const handleSave = async () => {
      if (!dataName || !dataDescription) {
        alert('Por favor, completa todos los campos.');
        return;
      }
  
      const payload = {
        name: dataName,
        description: dataDescription,
        date: new Date().toISOString(),
        jsonData: JSON.stringify(pivotState.results),
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
        <h2>Save Data</h2>
        <div>
          <label>
            Name of the dataset:
            <input
              type="text"
              value={dataName}
              onChange={(e) => setDataName(e.target.value)}
              placeholder="Dataset Name"
            />
          </label>
        </div>
        <div>
          <label>
            Description of the dataset:
            <input
              type="text"
              value={dataDescription}
              onChange={(e) => setDataDescription(e.target.value)}
              placeholder="Data Description"
            />
          </label>
        </div>
        <button onClick={handleSave}>Save Report</button>
      </div>
    );
  }
  
  export default SaveData;
  