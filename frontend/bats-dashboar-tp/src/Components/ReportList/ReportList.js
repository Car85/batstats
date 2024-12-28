import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import 'react-pivottable/pivottable.css';
function ReportsList({ setPivotState, setBoxPlotState }) {
    const [reports, setReports] = useState([]);
    // load reports from localStorage 
    useEffect(() => {
        const reportsFromStorage = localStorage.getItem('reports');
        if (reportsFromStorage) {
            setReports(JSON.parse(reportsFromStorage));
        }
    }, []);
    const handleLoadReport = async (reportId) => {
        try {
            const response = await fetch(`http://localhost/batstats/report/${reportId}`);
            if (!response.ok) {
                throw new Error('Error loading report');
            }
            const { configuration } = await response.json();
            if (!configuration) {
                throw new Error('the config is empty or null');
            }
            let parsedConfig;
            try {
                parsedConfig = JSON.parse(configuration);
            }
            catch (jsonError) {
                if (jsonError instanceof Error) {
                    throw new Error('Parse error to JSON: ' + jsonError.message);
                }
                else {
                    throw new Error('Unknowns error  parsing JSON confg');
                }
            }
            const { pivotState = {}, boxPlotState = {} } = parsedConfig;
            console.log("Validated Pivot State:", pivotState);
            setPivotState(pivotState);
            setBoxPlotState(boxPlotState);
        }
        catch (error) {
            console.error('Load Error config: ', error);
        }
    };
    return (_jsxs("div", { children: [_jsx("h1", { children: "Your Reports" }), _jsx("ul", { children: _jsxs("select", { onChange: (e) => handleLoadReport(e.target.value), children: [_jsx("option", { value: "", disabled: true, selected: true, children: "Select a report" }), reports.map((report) => (_jsx("option", { value: report.id, children: report.name }, report.id)))] }) })] }));
}
export default ReportsList;
