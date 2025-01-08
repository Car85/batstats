import { useState } from "react";

import PivotTableUI from "react-pivottable/PivotTableUI";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import { toast } from "react-toastify";
import Plotly from "react-plotly.js";
import { useDropzone } from "react-dropzone";
import * as XLSX from "sheetjs-style";


import SaveReport from "../Components/SaveReport/SaveReport";
import BoxPlot from "../Components/BoxPlot/Boxplot";
import ReportList from "../Components/ReportList/ReportList";
import DashboardLandscape from "../Components/Dashboard/DashboardLandscape"

import "../styles/App.css";
import {
  BoxPlotState,
  PivotState,
  BarChartState,
  MatrixDataState,
  DashboardState,
} from "../types/Types";
import BarChart from "@/Components/Barchart/BarChart";
import CorrelationMatrix from "@/Components/CorrelationMatrix/CorrelationMatrix";
import Papa from "papaparse";

import { BrowserRouter as Link, Route, Router, Routes } from "react-router-dom";

const PlotlyRenderers = createPlotlyRenderers(Plotly);

const App = () => {
  const [pivotState, setPivotState] = useState<PivotState>({});
  const [boxPlotState, setBoxPlotState] = useState<BoxPlotState>({});
  const [barChartState, setBarChartState] = useState<BarChartState>({});
  const [CorrelationMatrixState, setCorrelationMatrixState] = useState<MatrixDataState>({});
  const [showDashboard, setShowDashboard] = useState<DashboardState>({});


  const [data, setData] = useState<string[][]>([]);
  const [csvLoaded, setCsvLoaded] = useState(false);
  const [usePivotStateData] = useState(false);


  const handleFileUpload = (file: File) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension === "csv") {
      Papa.parse(file, {
        complete: (results) => {
          setData(results.data);
          setCsvLoaded(true);
          setPivotState({ data: results.data });
        },
        header: false,
      });
    } else if (fileExtension === "xlsx" || fileExtension === "xls") {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, {
            type: "array",
            raw: false,
            cellText: true,
            cellDates: true,
          });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          const excelData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            blankrows: false
          });

          if (excelData.length === 0) {
            throw new Error("El archivo XLSX parece estar vacío o corrupto.");
          }

          setData(excelData);
          setCsvLoaded(true);
          setPivotState({ data: excelData });
        } catch (error) {
          alert("Error al procesar el archivo XLSX: " + error.message);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.log("Format data no valid");
      toast.error("You can import only csv and xsls files.")
    }
  };

  const handleGenerateDashboard = () => {
    setShowDashboard(true);
  };


  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => handleFileUpload(file));
    },
  });

  return (

    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="appContainer">
              {!csvLoaded && (
                <section className="snapSection">
                  <section className="dropZone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>DROP HERE YOUR CSV OR XLSX DATASET HERE</p>
                  </section>
                </section>
              )}

              {csvLoaded && (
                <section className="snapSection">
                  <div className="pivotContainer">
                    <PivotTableUI
                      data={
                        Array.isArray(pivotState.data) && pivotState.data.length > 0
                          ? pivotState.data.map((row) =>
                            row.map((cell) => String(cell))
                          )
                          : data.map((row) => row.map((cell) => String(cell)))
                      }
                      onChange={(newState) =>
                        setPivotState({
                          ...newState,
                          data: usePivotStateData ? pivotState.data : data,
                        })
                      }
                      renderers={{
                        ...TableRenderers,
                        ...PlotlyRenderers,
                      }}
                      {...pivotState}
                    />
                  </div>
                </section>
              )}

              {csvLoaded && (
                <section className="snapSection">
                  <BoxPlot
                    data={
                      Array.isArray(boxPlotState.data) && boxPlotState.data.length > 0
                        ? boxPlotState.data
                        : data
                    }
                    onChange={(newState: BoxPlotState) =>
                      setBoxPlotState({ ...boxPlotState, ...newState })
                    }
                  />
                </section>
              )}

              {csvLoaded && (
                <section className="snapSection">
                  <BarChart
                    data={
                      Array.isArray(barChartState.data) && barChartState.data.length > 0
                        ? barChartState.data
                        : data
                    }
                    onChange={(newState: BarChartState) =>
                      setBarChartState({ ...barChartState, ...newState })
                    }
                  />
                </section>
              )}

              {csvLoaded && (
                <section className="snapSection">
                  <CorrelationMatrix
                    data={
                      Array.isArray(CorrelationMatrixState.data) &&
                        CorrelationMatrixState.data.length > 0
                        ? CorrelationMatrixState.data
                        : data
                    }
                    onChange={(newState: MatrixDataState) =>
                      setCorrelationMatrixState({ ...CorrelationMatrixState, ...newState })
                    }
                  />
                </section>
              )}

              {csvLoaded && (
                <section className="snapSection">
                  <div style={{ width: "90%" }}>
                    <div className="snapSection">
                      <div className="buttonContainer">
                        <SaveReport
                          pivotState={pivotState}
                          boxPlotState={boxPlotState}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {csvLoaded && (
                <section className="snapSection">
                  <ReportList
                    setPivotState={handleFileUpload}
                    setBoxPlotState={handleFileUpload}
                  />
                </section>
              )}
              {csvLoaded && (  
                <section className="snapSection">
      
                <h1>Interactive Charts</h1>
                  <PivotTable state={pivotState} setState={setPivotState} data={[]} />
                  <BoxPlot state={boxPlotState} setState={setBoxPlotState} data={[]} />
                  <BarChart state={barChartState} setState={setBarChartState} data={[]} />
                  <CorrelationMatrix data={CorrelationMatrixState} setState={setCorrelationMatrixState} />

                  <Link
                    to="/dashboard"
                    state={{ pivotState, boxPlotState, barChartState, CorrelationMatrixState }}
                  >
                    <button>Generate Dashboard</button>
                  </Link>
                </section>  
              )}
          <Route
          path="/dashboard"
          element={
            <section className="snapSection">
              <DashboardLandscape
                pivotState={pivotState}
                boxPlotState={boxPlotState}
                barChartState={barChartState}
                correlationMatrixState={CorrelationMatrixState}
              />
            </section>
          }
        />  
        </div>               
      </Routes>      
    </Router>
  )};


export default App;
