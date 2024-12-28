import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plotly from 'react-plotly.js';
import SaveReport from '../Components/SaveReport/SaveReport';
import { useCSVReader } from 'react-papaparse';
import BoxPlot from '../Components/BoxPlot/Boxplot';
import ReportList from '../Components/ReportList/ReportList';
import '../styles/App.css';
const PlotlyRenderers = createPlotlyRenderers(Plotly);
const App = () => {
    const [pivotState, setPivotState] = useState({});
    const [boxPlotState, setBoxPlotState] = useState({});
    const [data, setData] = useState([]);
    const [csvLoaded, setCsvLoaded] = useState(false);
    const [usePivotStateData, setUsePivotStateData] = useState(false);
    const { CSVReader } = useCSVReader();
    const handleCsvUpload = (results) => {
        console.log(results.data);
        if (results && results.data) {
            setData(results.data);
            setCsvLoaded(true);
            setUsePivotStateData(false);
            setPivotState({ ...pivotState, data: results.data });
            setBoxPlotState({ ...boxPlotState, data: results.data });
        }
        else {
            console.error('Result data not valid:', results);
        }
    };
    return (_jsxs("div", { className: "appContainer", children: [!csvLoaded && (_jsx("section", { className: "snapSection", children: _jsx(CSVReader, { onUploadAccepted: handleCsvUpload, children: ({ getRootProps, acceptedFile, ProgressBar }) => (_jsxs("div", { ...getRootProps(), className: "dropZone", children: [acceptedFile ? (_jsx("p", { children: acceptedFile.name })) : (_jsx("p", { children: "DROP YOUR CSV DATASET HERE" })), _jsx(ProgressBar, {})] })) }) })), csvLoaded && (_jsx("section", { className: "snapSection", children: _jsx("div", { className: "pivotContainer", children: _jsx(PivotTableUI, { data: Array.isArray(pivotState.data) && pivotState.data.length > 0
                            ? pivotState.data.map(row => row.map(cell => String(cell)))
                            : data.map(row => row.map(cell => String(cell))), onChange: (newState) => setPivotState({
                            ...newState,
                            data: usePivotStateData ? pivotState.data : data,
                        }), renderers: {
                            ...TableRenderers,
                            ...PlotlyRenderers,
                        }, ...pivotState }) }) })), csvLoaded && (_jsx("section", { className: "snapSection", children: _jsx(BoxPlot, { data: Array.isArray(boxPlotState.data) && boxPlotState.data.length > 0 ? boxPlotState.data : data, onChange: (newState) => setBoxPlotState({ ...boxPlotState, ...newState }) }) })), csvLoaded && (_jsx("section", { className: "snapSection", children: _jsx("div", { style: { width: '90%' }, children: _jsx("div", { className: "snapSection", children: _jsx("div", { className: "buttonContainer", children: _jsx(SaveReport, { pivotState: pivotState, boxPlotState: boxPlotState }) }) }) }) })), csvLoaded && (_jsx("section", { className: "snapSection", children: _jsx(ReportList, { setPivotState: (state) => setPivotState(state), setBoxPlotState: (state) => setBoxPlotState(state) }) }))] }));
};
export default App;
