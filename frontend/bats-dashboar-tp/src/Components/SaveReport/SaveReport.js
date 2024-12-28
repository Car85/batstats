import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
function SaveReport({ pivotState, boxPlotState }) {
    const [reportName, setReportName] = useState('');
    const [reportType, setReportType] = useState('');
    const dashboardData = {
        pivotState,
        boxPlotState
    };
    const handleSave = async () => {
        if (!reportName || !reportType) {
            alert('Please complete all fields.');
            return;
        }
        const newReport = {
            id: uuidv4(),
            name: reportName,
            type: reportType,
            configuration: JSON.stringify(dashboardData),
            createdAt: new Date().toISOString(),
        };
        try {
            const storedReports = localStorage.getItem('reports');
            const reports = storedReports ? JSON.parse(storedReports) : [];
            reports.push({ id: newReport.id, name: newReport.name });
            localStorage.setItem('reports', JSON.stringify(reports));
        }
        catch (error) {
            console.error('Error saving to localStorage:', error);
        }
        try {
            const response = await fetch('http://localhost/batstats/report/save-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReport),
            });
            if (response.ok) {
                alert('Report saved successfully.');
            }
            else {
                alert('Error saving report.');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Error saving report.');
        }
    };
    return (_jsxs("div", { style: { margin: '20px' }, children: [_jsx("h2", { children: "Save Dataset" }), _jsx("div", { children: _jsxs("label", { children: ["Name of Dataset:", _jsx("input", { type: "text", value: reportName, onChange: (e) => setReportName(e.target.value), placeholder: "Example: Batting Analysis" })] }) }), _jsx("div", { children: _jsxs("label", { children: ["Description:", _jsx("input", { type: "text", value: reportType, onChange: (e) => setReportType(e.target.value), placeholder: "Example: Batting" })] }) }), _jsx("button", { onClick: handleSave, children: "Save Report" })] }));
}
export default SaveReport;
