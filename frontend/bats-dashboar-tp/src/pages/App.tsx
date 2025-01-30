import { SetStateAction, useState } from "react";

import Plotly from 'react-plotly.js';
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import "react-pivottable/pivottable.css";
import "./styles/App.css"
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import BoxPlot from "../Components/BoxPlot/Boxplot";
import DashboardLandscape from "../Components/Dashboard/DashboardLandscape"

import "../styles/App.css";
import {
  BoxPlotState,
  PivotState,
  BarChartState,
  MatrixDataState,
  LineChartState,
  DashboardState,
  PlotYaout,
  BarLayout,
} from "../types/Types";


import BarChart from "@/Components/Barchart/BarChart";
import CorrelationMatrix from "@/Components/CorrelationMatrix/CorrelationMatrix";
import Papa from "papaparse";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Data } from "plotly.js";
import LineChart from "@/Components/LineChart/LineChart";

const PlotlyRenderers = createPlotlyRenderers(Plotly);

const App = () => {
  const [pivotState, setPivotState] = useState<PivotState>({});
  const [boxPlotState, setBoxPlotState] = useState<BoxPlotState>({});
  const [lineChartState, setLineChartState] = useState<LineChartState>({});
  const [barChartState, setBarChartState] = useState<BarChartState>({});
  const [CorrelationMatrixState] = useState<MatrixDataState>({});

  const [plotState, setPlotState] = useState<{ data: Data[]; layout: PlotYaout } | null>(null);
  const [barState, setBarState] = useState<{ data: Data[]; layout: BarLayout } | null>(null);
  const [lineState, setLineState] = useState<{ data: Data[]; layout: Partial<Plotly.Layout> } | null>(null);


  const [data, setData] = useState<string[][]>([]);
  const [csvLoaded, setCsvLoaded] = useState(false);


  const handleFileUpload = (file: File) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension === "csv") {
      Papa.parse<String[]>(file, {
        complete: (results) => {
          const parsedData = results.data.every(row => Array.isArray(row) && row.every(cell => typeof cell === 'string'))
            ? (results.data as string[][])
            : [];

          if (parsedData.length === 0) {
            alert("The CSV data is invalid or empty.");
            return;
          }

          setData(parsedData);
          setCsvLoaded(true);
          setPivotState({ data: parsedData });
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
          }) as string[][];

          if (excelData.length === 0) {
            throw new Error("The XLSX file seems empty or corrupt.");
          }

          setData(excelData);
          setCsvLoaded(true);
          setPivotState({ data: excelData });
        } catch (error: unknown) {
          if (error instanceof Error) {
            alert("Error processing XLSX file: " + error.message);
          } else {
            alert("An unknown error occurred");
          }
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.log("Format data no valid");
      toast.error("You can import only CSV and XLS files.");
    }
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
        <Route path="/"
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
                  <LineChart                        
                      data={
                        Array.isArray(lineChartState.data) && lineChartState.data.length > 0
                          ? lineChartState.data
                          : data
                      }
                      onStateChange={(state) => {
                        setLineState(state);
                      }}      
                      onChange={(newState: LineChartState) => {
                        setLineChartState({ ...lineChartState, ...newState });
                      }}                   
                      />
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
                    onStateChange={(state) => {
                      setPlotState(state);
                    }}
                    onChange={(newState: BoxPlotState) => {
                      setBoxPlotState({ ...boxPlotState, ...newState });
                    }}
                    renderers={{
                      ...PlotlyRenderers,
                    }}
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
                    onStateChange={(state: SetStateAction<{ data: Data[]; layout: BarLayout; } | null>) => {
                      console.log(state);
                      setBarState(state);
                    }}
                    onChange={(newState: BarChartState) =>
                      setBarChartState({ ...barChartState, ...newState })
                    }
                    renderes={{
                      ...PlotlyRenderers
                    }}
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
                  />
                </section>
              )}

              {csvLoaded && (
                <section className="snapSection">
                  
                  <div className="dashboard-container">
                    <div className="dashboard-item">
                      {lineState && lineState.data && lineState.layout && (
                        <Plotly data={lineState.data}
                          layout={{
                            ...lineState.layout,
                            autosize: true,
                            margin: { t: 55, l: 45, r: 45, b: 75 },
                          }}
                          useResizeHandler={true}
                          style={{ width: "100%", height: "100%" }} 
                        />
                      )}

                    </div>

                    {plotState && (
                      <div className="dashboard-item">
                        <Plotly data={plotState.data}
                          layout={{
                            ...plotState.layout,
                            autosize: true,
                            margin: { t: 55, l: 45, r: 45, b: 105 },
                          }}
                          useResizeHandler={true}
                          style={{ width: "100%", height: "100%" }} />
                      </div>
                    )}

                    {barState && (
                      <div className="dashboard-item">
                        <Plotly data={barState.data}
                          layout={{
                            ...barState.layout,
                            autosize: true,
                            margin: { t: 25, l: 45, r: 45, b: 105 },
                          }}
                          useResizeHandler={true}
                          style={{ width: "100%", height: "100%" }} />
                      </div>
                    )}

                    <div className="dashboard-item">
                      <div className="correlation-matrix-container">
                        <CorrelationMatrix
                          data={
                            Array.isArray(CorrelationMatrixState.data) &&
                              CorrelationMatrixState.data.length > 0
                              ? CorrelationMatrixState.data
                              : data
                          }
                        /></div>
                    </div>
                  </div>


                  <Link
                    to="/dashboard"
                    state={{
                      pivotState,
                      boxPlotState,
                      barChartState,
                      CorrelationMatrixState,
                    }}
                  >
                    <button>Generate Dashboard</button>
                  </Link>
                </section>
              )}

            </div>
          }

        />

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
      </Routes>
    </Router>
  )
};


export default App;