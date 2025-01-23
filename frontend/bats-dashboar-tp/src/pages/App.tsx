import { SetStateAction, useState } from "react";

import PivotTableUI from "react-pivottable/PivotTableUI";
import Plotly from 'react-plotly.js';
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import "react-pivottable/pivottable.css";
import "./styles/App.css"
import TableRenderers from "react-pivottable/TableRenderers";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import SaveReport from "../Components/SaveReport/SaveReport";
import BoxPlot, { boxPlotData } from "../Components/BoxPlot/Boxplot";
import ReportList from "../Components/ReportList/ReportList";
import DashboardLandscape from "../Components/Dashboard/DashboardLandscape"

import "../styles/App.css";
import {
  BoxPlotState,
  PivotState,
  BarChartState,
  MatrixDataState,
  DashboardState,
  BoxReplica,
  PlotYaout,
  BarLayout,
} from "../types/Types";


import BarChart from "@/Components/Barchart/BarChart";
import CorrelationMatrix from "@/Components/CorrelationMatrix/CorrelationMatrix";
import Papa from "papaparse";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Data } from "plotly.js";

const PlotlyRenderers = createPlotlyRenderers(Plotly);

const App = () => {
  const [pivotState, setPivotState] = useState<PivotState>({});
  const [boxPlotState, setBoxPlotState] = useState<BoxPlotState>({});
  const [barChartState, setBarChartState] = useState<BarChartState>({});
  const [CorrelationMatrixState] = useState<MatrixDataState>({});

  const [plotState, setPlotState] = useState<{ data: Data[]; layout: PlotYaout } | null>(null);
  const [barState, setBarState] = useState<{ data: Data[]; layout: BarLayout } | null>(null);


  const [data, setData] = useState<string[][]>([]);
  const [csvLoaded, setCsvLoaded] = useState(false);
  const [usePivotStateData] = useState(false);

  const PivotTableUIComponent = PivotTableUI as unknown as React.FC<any>;


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
                  <div className="pivotContainer">
                    <PivotTableUIComponent
                      data={
                        Array.isArray(pivotState.data) && pivotState.data.length > 0
                          ? pivotState.data.map((row) =>
                            row.map((cell) => String(cell))
                          )
                          : data.map((row) => row.map((cell) => String(cell)))
                      }
                      onChange={(newState: PivotState) =>
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
                      <div className="pvtUi-quadrant">
                        <h1>Interactive Charts</h1>
                        <PivotTableUIComponent
                          data={pivotState.data}
                          plotlyOptions={{
                            autosize: true,
                            margin: { t: 50, l: 50, r: 50, b: 50 },
                            showlegend: false,
                            xaxis: { title: "X" }, 
                            yaxis: { title: "Y" }, 
                          }}
                          menuLimit={0} 

                          onChange={(newState: PivotState) => setPivotState(newState)}
                          renderers={{
                            ...TableRenderers,
                            ...PlotlyRenderers,
                          }}
                          {...pivotState}
                          hiddenAttributes={[pivotState.data]}
                        />
                      </div>

                    </div>

                    {plotState && (
                      <div className="dashboard-item">
                        <h2>Box Plot</h2>
                        <Plotly data={plotState.data}
                          layout={{
                            ...plotState.layout,
                            autosize: true,
                            margin: { t: 35, l: 45, r: 45, b: 105 },
                          }}
                          useResizeHandler={true}
                          style={{ width: "100%", height: "100%" }} />
                      </div>
                    )}

                    {barState && (
                      <div className="dashboard-item">
                        <h2>BarChart</h2>
                        <Plotly data={barState.data}
                          layout={{
                            ...barState.layout,
                            autosize: true,
                            margin: { t: 25, l: 45, r: 45, b: 135 },
                          }}
                          useResizeHandler={true}
                          style={{ width: "100%", height: "100%" }} />
                      </div>
                    )}

                    <div className="dashboard-item">
                      <div className="table-container">
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

    </Router>
  )
};


export default App;