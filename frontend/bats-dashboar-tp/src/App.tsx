import React, { CSSProperties, useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import './App.css';
import './styles/style.css';
import Plotly from 'react-plotly.js';
import SaveReport from './SaveReport';
import { useCSVReader } from 'react-papaparse';
import SaveData from './SaveData';
import BoxPlot from './Boxplot';
import ReportsList from './ReportList';
import TableRenderers from 'react-pivottable/TableRenderers';
import PlotlyRenderers from 'react-pivottable/PlotlyRenderers';


const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
  } as CSSProperties,
  dropZone: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    border: '2px dashed #ccc',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#001f3f',
    color: '#fff',
  } as CSSProperties,
  snapContainer: {
    scrollSnapType: 'y mandatory',
    overflowY: 'scroll',
    height: '100vh',
  } as CSSProperties,
  snapSection: {
    scrollSnapAlign: 'start',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  } as CSSProperties,
  pivotContainer: {
    width: '80%',
  } as CSSProperties,
  boxPlotContainer: {
    width: '80%',
  } as CSSProperties,
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '80%',
  } as CSSProperties,
};


const App = () => {
  const [pivotState, setPivotState] = useState({});
  const [boxPlotState, setBoxPlotState] = useState({});
  const [data, setData] = useState<(string | number)[][]>([]);
  const [csvLoaded, setCsvLoaded] = useState(false);
  const [showReports, setShowReports] = useState(false); 
  const { CSVReader } = useCSVReader();

y
  const handleCsvUpload = (results: any) => {
    if (results && results.data) {
      setData(results.data);
      setCsvLoaded(true);
    }
  };

  const handleSaveReport = (report: Report) => {
    console.log('Saving report:', report);
  };

  return (
    <div style={styles.appContainer}>
    {/* Página inicial: Cargar el CSV */}
    {!csvLoaded && (
      <CSVReader onUploadAccepted={handleCsvUpload}>
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
        }: any) => (
          <div {...getRootProps()} style={styles.dropZone}>
            {acceptedFile ? (
              <p>{acceptedFile.name}</p>
            ) : (
              <p>DROP YOUR CSV DATASET HERE</p>
            )}
            <ProgressBar style={{ backgroundColor: 'red' }} />
          </div>
        )}
      </CSVReader>
    )}

      {/* Página 2: Pivot Table */}
      {csvLoaded && (
        <div style={styles.snapContainer}>
          <div style={{ ...styles.snapSection, backgroundColor: '#f0f0f0' }}>
            <div style={styles.pivotContainer}>

            <PivotTableUI
              data={data}
              onChange={setPivotState}
              renderers={{
                ...TableRenderers,
                ...PlotlyRenderers, // Asegúrate de usar PlotlyRenderers aquí
             }}
             {...pivotState}
            />
              </div>
          </div>
        </div>
      )}

      {/* Página 3: BoxPlot */}
      <div style={{ ...styles.snapSection, backgroundColor: '#e0e0e0' }}>
            <div style={styles.boxPlotContainer}>
              <BoxPlot data={data}
                onChange={setBoxPlotState}
                />
            </div>
          </div>

      {/* Página 4: Guardar y ver reportes */}
      {csvLoaded && (
        <section style={{ scrollSnapAlign: 'start', minHeight: '100vh', padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SaveReport pivotState={pivotState} boxPlotState={boxPlotState}   onSave={handleSaveReport}
            />
            <button
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: '#FFF',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
              onClick={() => setShowReports(!showReports)}
            >
              {showReports ? 'Hide Saved Reports' : 'Show Saved Reports'}
            </button>
            {showReports && (
              <div style={{ marginTop: '20px', width: '100%' }}>
                <ReportsList
                  setPivotState={setPivotState}
                  setBoxPlotState={setBoxPlotState}
                />
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default App;
