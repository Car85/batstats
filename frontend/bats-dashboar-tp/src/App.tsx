import React, { CSSProperties, useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plotly from 'react-plotly.js';
import SaveReport from './SaveReport';
import { useCSVReader } from 'react-papaparse';
import SaveData from './SaveData';
import BoxPlot from './Boxplot';
import ReportList from './ReportList';

const styles = {
  appContainer: {
    scrollSnapType: 'y mandatory',
    overflowY: 'scroll',
    height: '100vh',
    width: '100vw',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  } as CSSProperties,
  snapSection: {
    scrollSnapAlign: 'start',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    boxSizing: 'border-box',
    padding: '20px',
  } as CSSProperties,
  dropZone: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    border: '2px dashed #ccc',
    backgroundColor: '#001f3f',
    color: '#fff',
    cursor: 'pointer',
    textAlign: 'center',
  } as CSSProperties,
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  } as CSSProperties,
  pivotContainer: {
    width: '80%',
  } as CSSProperties,
  actionButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#FFF',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  } as CSSProperties,
};

interface PivotState {
  map?: string; 
  [key: string]: any;
}

interface BoxPlot {
  map?: string;
  [key: string]: any;

}


const PlotlyRenderers = createPlotlyRenderers(Plotly);

const App = () => {
  const [pivotState, setPivotState] = useState<PivotState>({});
  const [boxPlotState, setBoxPlotState] = useState<BoxPlot>({});
  const [data, setData] = useState<(string | number)[][]>([]);
  const [csvLoaded, setCsvLoaded] = useState(false);
  const [usePivotStateData, setUsePivotStateData] = useState(false); 

  const { CSVReader } = useCSVReader();

  const handleCsvUpload = (results: any) => {
    console.log(results.data);
    if (results && results.data) {
      setData(results.data);
      setCsvLoaded(true);
      setUsePivotStateData(false); 
    }else {
      console.error('Result data not valid:', results);
    }
  };
 
 
  return (
    <div style={styles.appContainer}>
      {!csvLoaded && (
        <section style={styles.snapSection}>
          <CSVReader onUploadAccepted={handleCsvUpload}>
            {({ getRootProps, acceptedFile, ProgressBar }: any) => (
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
        </section>
      )}

      {csvLoaded && (
        <section style={{ ...styles.snapSection, backgroundColor: '#f0f0f0' }}>
          <div style={styles.pivotContainer}>
          <PivotTableUI
              data={Array.isArray(pivotState.data) && pivotState.data.length > 0 ? pivotState.data : data} 
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
        <section style={{ ...styles.snapSection, backgroundColor: '#e0e0e0' }}>
          <BoxPlot
            data={Array.isArray(boxPlotState.data) && boxPlotState.data.length > 0 ? boxPlotState.data : data}
            onChange={(newState) => setBoxPlotState({ ...boxPlotState, ...newState })}
        />

        </section>
      )}

      {csvLoaded && (
        <section style={{ ...styles.snapSection, backgroundColor: '#f0f0f0' }}>
          <div style={{ width: '90%' }}>
            <div style={{ ...styles.snapSection, backgroundColor: '#d0d0d0' }}>
              <div style={styles.buttonContainer}>
                <SaveReport
                  pivotState={pivotState}
                  boxPlotState={boxPlotState}
                />
                <SaveData csvData={data} />               
              </div>
            </div>
          </div>
        </section>        
      )}
       {csvLoaded && (
        <section style={{ ...styles.snapSection, backgroundColor: '#d0d0d0' }}>
          <ReportList
            setPivotState={handleCsvUpload}
            setBoxPlotState={handleCsvUpload}
          />
        </section>
      )}
    </div>
  );            
};

export default App;
