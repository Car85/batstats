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
    alignItems: 'center', // Centra horizontalmente todos los elementos
    justifyContent: 'center',
    minHeight: '100vh', // Para centrar verticalmente en toda la ventana
    padding: '20px',
    textAlign: 'center', // Centra el texto en el interior de los contenedores
    boxSizing: 'border-box',
  } as CSSProperties,
  dropZone: {
    width: '80%', // Ajusta el tamaño de la herramienta de Drop
    border: '2px dashed #ccc',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
    marginBottom: '20px', // Espaciado inferior
  } as CSSProperties,
  pivotContainer: {
    width: '80%',
    marginBottom: '20px',
  } as CSSProperties,
  boxPlotContainer: {
    width: '80%',
    marginBottom: '20px',
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
  const [csvLoaded, setCsvLoaded] = useState(false); // Estado para rastrear si el CSV está cargado
  const { CSVReader } = useCSVReader();

  const PlotlyRenderers = createPlotlyRenderers(Plotly);

  const handleCsvUpload = (results: any) => {
    if (results && results.data) {
      console.log('Resultados del CSV:', results.data);
      setData(results.data);
      setCsvLoaded(true); // Establece que el CSV está cargado
    } else {
      console.error('Los resultados no contienen datos válidos:', results);
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Mostrar la herramienta de Drop solo si el CSV no está cargado */}
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

      {/* Mostrar la Pivot Table, Box Chart y botones solo si el CSV está cargado */}
      {csvLoaded && (
        <>
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

          <div style={styles.boxPlotContainer}>
            <BoxPlot data={data} />
          </div>

          <div style={styles.buttonContainer}>
            <SaveReport pivotState={pivotState} />
            <SaveData csvData={data} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
