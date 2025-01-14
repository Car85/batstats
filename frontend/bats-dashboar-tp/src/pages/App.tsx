import { useState } from "react";

import PivotTableUI from "react-pivottable/PivotTableUI";
import Plotly from 'react-plotly.js';
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import "react-pivottable/pivottable.css";
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
} from "../types/Types";


import BarChart from "@/Components/Barchart/BarChart";
import CorrelationMatrix from "@/Components/CorrelationMatrix/CorrelationMatrix";
import Papa from "papaparse";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const PlotlyRenderers = createPlotlyRenderers(Plotly);

const App = () => {
  const [pivotState, setPivotState] = useState<PivotState>({});
  const [boxPlotState, setBoxPlotState] = useState<BoxPlotState>({});
  const [barChartState, setBarChartState] = useState<BarChartState>({});
  const [CorrelationMatrixState] = useState<MatrixDataState>({});


  const [data, setData] = useState<string[][]>([]);
  const [csvLoaded, setCsvLoaded] = useState(false);
  const [usePivotStateData] = useState(false);

  const PivotTableUIComponent = PivotTableUI as unknown as React.FC<any>;
  const headers = data[0]; 

  const dataForPlot = boxPlotData(
    headers,
    boxPlotState.data || [],
    boxPlotState.categoricalColumn || '',
    boxPlotState.numericColumn || '',
    boxPlotState.tooltipColumn || '',
    boxPlotState.selectedCategories || []
  );


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
        <Route  path="/"
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
                          onChange={(newState: BoxPlotState) =>
                            setBoxPlotState({ ...boxPlotState, ...newState })
                          }
                          renderes={{
                            ...PlotlyRenderers
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
                            // onChange={(newState: MatrixDataState) =>
                            //   setCorrelationMatrixState({ ...CorrelationMatrixState, ...newState })
                            // }
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
                          
                          <Plotly
                            data={dataForPlot}
                            layout={{
                              title: 'Box Plot: Dynamic Analysis',
                              yaxis: { title: boxPlotState.numericColumn },
                              xaxis: { title: boxPlotState.categoricalColumn },
                            }}
                          />
                        
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
                          
                          
                          <CorrelationMatrix 
                            data={
                              Array.isArray(CorrelationMatrixState.data) &&
                                CorrelationMatrixState.data.length > 0
                                ? CorrelationMatrixState.data
                                : data
                            }
                            // onChange={(newState: MatrixDataState) =>
                            //   setCorrelationMatrixState({ ...CorrelationMatrixState, ...newState })
                            // }
                            />

                          <Link
                            to="/dashboard"
                            state={{ pivotState, boxPlotState, barChartState, CorrelationMatrixState }}
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
  )};


export default App;