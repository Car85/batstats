import React, { CSSProperties, useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import './App.css';
import './styles/style.css';
import Plotly from 'react-plotly.js';
import SaveReport from './SaveReport';
import { useCSVReader } from 'react-papaparse';
import SaveData from './SaveData';
import BoxPlot from './Boxplot';

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

function App() {
  const [pivotState, setPivotState] = useState({});
  const [data, setData] = useState<(string | number)[][]>([]);
  const [csvLoaded, setCsvLoaded] = useState(false);
  const { CSVReader } = useCSVReader();

  const PlotlyRenderers = createPlotlyRenderers(Plotly);

  const handleCsvUpload = (results: any) => {
    if (results && results.data) {
      console.log('Resultados del CSV:', results.data);
      setData(results.data);
      setCsvLoaded(true);
    } else {
      console.error('Los resultados no contienen datos válidos:', results);
    }
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

      {/* Contenedor Scroll Snap */}
      {csvLoaded && (
        <div style={styles.snapContainer}>
          {/* Sección 1: Pivot Table */}
          <div style={{ ...styles.snapSection, backgroundColor: '#f0f0f0' }}>
            <div style={styles.pivotContainer}>
              <PivotTableUI
                data={data}
                onChange={setPivotState}
                renderers={{
                  ...TableRenderers,
                  ...PlotlyRenderers,
                }}
                {...pivotState}
              />
            </div>
          </div>

          {/* Sección 2: Box Plot */}
          <div style={{ ...styles.snapSection, backgroundColor: '#e0e0e0' }}>
            <div style={styles.boxPlotContainer}>
              <BoxPlot data={data} />
            </div>
          </div>

          {/* Sección 3: Guardar Reporte y Datos */}
          <div style={{ ...styles.snapSection, backgroundColor: '#d0d0d0' }}>
            <div style={styles.buttonContainer}>
              <SaveReport pivotState={pivotState} />
              <SaveData csvData={data} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
