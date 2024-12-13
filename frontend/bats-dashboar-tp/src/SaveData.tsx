import React, { useState } from 'react';
import 'react-pivottable/pivottable.css';


function SaveData({ csvData }: { csvData: (string | number)[][] }) {
    const [dataName, setDataName] = useState('');
    const [dataDescription, setDataDescription] = useState('');
  
    const handleSave = async () => {
      if (!dataName || !dataDescription || !csvData) {
        alert('Please fill all the fields and upload a valid CSV.');
        return;
      }
  
      const payload = {
        name: dataName,
        description: dataDescription,
        date: new Date().toISOString(),
        jsonData: JSON.stringify(csvData),
      };
  
      try {
        const response = await fetch('http://localhost/batstats/json/save-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          alert('Data Saved Successfully');
        } else {
          alert('Error saving the data.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error saving the data.');
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
        <button onClick={handleSave}>Save Data</button>
      </div>
    );
  }
  
  export default SaveData;
  