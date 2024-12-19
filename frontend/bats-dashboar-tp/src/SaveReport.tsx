import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface SaveReportProps {
  pivotState: object; 
  boxPlotState: object; 
  onSave: (report: Report) => void; 
}

interface Report {
  id: string; 
  name: string;
  type: string;
  configuration: string;
  createdAt: string; 
}

function SaveReport({ pivotState, boxPlotState }: Readonly<SaveReportProps>) {
    const [reportName, setReportName] = useState('');
    const [reportType, setReportType] = useState('');
    const dashboardData = {
        pivotState,
        boxPlotState,
        timestamp: new Date().toISOString(),
    };

    const handleSave = async () => {
        if (!reportName || !reportType) {
            alert('Please complete all fields.');
            return;
        }

        const payload: Report = {
            id: uuidv4(), 
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
                alert('Report saved successfully.');
            } else {
                alert('Error saving report.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving report.');
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
