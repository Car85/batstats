import Plotly from 'react-plotly.js';
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import "react-pivottable/pivottable.css";
import "./styles/app.css";
import { useDropzone } from "react-dropzone";
import BoxPlot from "../Components/BoxPlot/Boxplot";
import * as Excel from 'exceljs';


import "../styles/App.css";


import BarChart from "../Components/Barchart/BarChart";
import CorrelationMatrix from "../Components/CorrelationMatrix/CorrelationMatrix";
import Papa from "papaparse";

import LineChart from "../Components/LineChart/LineChart";
import html2canvas from "html2canvas";
import { useDashboardStore } from "../state/dashboardStore";

const PlotlyRenderers = createPlotlyRenderers(Plotly);

const App = () => {
  const rawData = useDashboardStore((state) => state.rawData);
  const setRawData = useDashboardStore((state) => state.setRawData);
  const lineChartState = useDashboardStore((state) => state.lineChart);
  const setLineChartState = useDashboardStore((state) => state.setLineChart);
  const boxPlotState = useDashboardStore((state) => state.boxPlot);
  const setBoxPlotState = useDashboardStore((state) => state.setBoxPlot);
  const barChartState = useDashboardStore((state) => state.barChart);
  const setBarChartState = useDashboardStore((state) => state.setBarChart);
  const correlationMatrixState = useDashboardStore((state) => state.correlation);
  const setCorrelationMatrixState = useDashboardStore((state) => state.setCorrelation);
  const resetDashboardState = useDashboardStore((state) => state.reset);

  const csvLoaded = rawData.length > 0;


  const exportAsImageOrPDF = async (format: "image" | "pdf") => {
    const dashboardElement = document.querySelector(".dashboard-container") as HTMLDivElement;
  
    if (!dashboardElement) return;
  
    const canvas = await html2canvas(dashboardElement);
    const image = canvas.toDataURL("image/png");
  
    if (format === "image") {
      const link = document.createElement("a");
      link.href = image;
      link.download = "dashboard.png";
      link.click();
    } else if (format === "pdf") {
      const { jsPDF } = await import("jspdf");
  
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
  
      pdf.addImage(image, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("dashboard.pdf");
    }
  };
  

  const checkForMaliciousContent = (data: string[][]): boolean => {
    return data.some(row => row.some(cell => 
      typeof cell === "string" && cell.includes("<script>")
    ));
  };

  const sanitizeData = (data: (string | number | null | undefined)[][]) => {
    const normalized = data.map((row) =>
      row.map((cell) => {
        const rawValue = typeof cell === 'string'
          ? cell
          : cell === null || cell === undefined
            ? ''
            : String(cell);

        let sanitizedCell = rawValue.trim();

        if (/(http:\/\/|https:\/\/)[a-z0-9-]+\.[a-z]{2,}/i.test(sanitizedCell)) {
          sanitizedCell = '[BLOCKED URL]';
        }

        if (/^[=+\-@]/.test(sanitizedCell)) {
          sanitizedCell = `'${sanitizedCell}`;
        }

        return sanitizedCell;
      })
    );

    return normalized.filter((row) => row.some((cell) => cell.length > 0));
  };
  
  
  const handleFileUpload = (file: File) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
  
    if (fileExtension === "csv") {
      let processedRows = 0; 
      const parsedData: string[][] = []; 
  
      Papa.parse<string[]>(file, {
        worker: true,
        step: (row, parser) => {
          processedRows++;
  
          if (processedRows > 1_000_000) {
            alert("File is too large to process.");
            parser.abort();
            return;
          }
  
          if (!Array.isArray(row.data) || row.data.some(cell => typeof cell !== 'string')) {
            parser.abort();
            alert("Invalid CSV structure.");
            return;
          }
  
          parsedData.push(row.data as string[]);
        },
        complete: () => {
          if (parsedData.length === 0) {
            alert("The CSV file is empty or invalid.");
            return;
          }

          if (checkForMaliciousContent(parsedData)) {
            alert("Potentially malicious content detected.");
            return;
          }


          const sanitizedData = sanitizeData(parsedData);

          if (sanitizedData.length === 0) {
            alert("The CSV file does not contain readable rows after sanitization.");
            return;
          }

          resetDashboardState();
          setRawData(sanitizedData as string[][]);
          setCorrelationMatrixState({ data: sanitizedData as string[][] });
        },
        header: false,
      });
  
    } else if (fileExtension === "xlsx" || fileExtension === "xls") {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const data = event.target?.result as ArrayBuffer;
          const workbook = new Excel.Workbook();
          await workbook.xlsx.load(data);
  
          const worksheet = workbook.worksheets[0];
          const excelData: string[][] = [];
  
          let processedRows = 0;
          worksheet.eachRow((row: Excel.Row) => {
            processedRows++;
            if (processedRows > 500_000) {
              alert("Excel file is too large.");
              return;
            }
  
            const rowValues = row.values.slice(1)
              .map(cell => (cell !== null && cell !== undefined ? cell.toString() : ""));
            excelData.push(rowValues);
          });
  
          if (excelData.length === 0) {
            alert("The XLSX file seems empty or corrupt.");
            return;
          }

          if (checkForMaliciousContent(excelData)) {
            alert("Potentially malicious content detected.");
            return;
          }
  

          const sanitizedExcelData = sanitizeData(excelData);

          if (sanitizedExcelData.length === 0) {
            alert("The Excel file does not contain readable rows after sanitization.");
            return;
          }

          resetDashboardState();
          setRawData(sanitizedExcelData as string[][]);
          setCorrelationMatrixState({ data: sanitizedExcelData as string[][] });
        } catch (error) {
          alert("Error processing XLSX file: " + (error instanceof Error ? error.message : "Unknown error"));
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.log("Invalid file format.");
    }
  };
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        alert("Invalid file type. Please upload a CSV or XLSX file.");
        return;
      }  
      acceptedFiles.forEach((file) => {
        if (!file.name.match(/\.(csv|xlsx)$/i)) {
          alert("Invalid file type. Please upload a CSV or XLSX file.");
          return;
        }
        handleFileUpload(file);
      });
    },
  });
  


  return (
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
            data={rawData}
            onStateChange={(state) => {
              setLineChartState(state);
            }}
          />
        </section>
      )}
      {csvLoaded && (
        <section className="snapSection">
          <BoxPlot
            data={rawData}
            onStateChange={(state) => {
              setBoxPlotState(state);
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
            data={rawData}

            onStateChange={(state) => {
              setBarChartState(state);
            }}
            renderes={{
              ...PlotlyRenderers
            }}
          />
        </section>
      )}

      {csvLoaded && (
        <section className="snapSection">
          <div className="correlation-matrix">

            <CorrelationMatrix
              data={
                Array.isArray(correlationMatrixState.data) &&
                  correlationMatrixState.data.length > 0
                  ? correlationMatrixState.data
                  : rawData
              }
            />
          </div>
        </section>
      )}

      {csvLoaded && (
        <section className="snapSection">

          <div className="dashboard-container">
            <div className="dashboard-item">
              {lineChartState && lineChartState.data && lineChartState.layout && (
                <Plotly data={lineChartState.data}
                  layout={{
                    ...lineChartState.layout,
                    autosize: true,
                    margin: { t: 55, l: 45, r: 45, b: 75 },
                  }}
                  useResizeHandler={true}
                  style={{ width: "100%", height: "100%" }}
                />
              )}

            </div>

            {boxPlotState && (
              <div className="dashboard-item">
                <Plotly data={boxPlotState.data}
                  layout={{
                    ...boxPlotState.layout,
                    autosize: true,
                    margin: { t: 55, l: 45, r: 45, b: 105 },
                  }}
                  useResizeHandler={true}
                  style={{ width: "100%", height: "100%" }} />
              </div>
            )}

            {barChartState && (
              <div className="dashboard-item">
                <Plotly data={barChartState.data}
                  layout={{
                    ...barChartState.layout,
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
                    Array.isArray(correlationMatrixState.data) &&
                      correlationMatrixState.data.length > 0
                      ? correlationMatrixState.data
                      : data
                  }
                /></div>
            </div>
          </div>


        </section>
      )}
      {csvLoaded && (
        <section className="snapSection">
          <button onClick={() => exportAsImageOrPDF("pdf")}>Export as PDF</button>
        </section>
      )}
      
    </div>

      
  )
};


export default App;