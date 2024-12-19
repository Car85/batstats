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

const PlotlyRenderers = createPlotlyRenderers(Plotly);

const App = () => {
  const [pivotState, setPivotState] = useState<object>({});
  const [boxPlotState, setBoxPlotState] = useState<object>({});
  const [data, setData] = useState<(string | number)[][]>([]);
  const [csvLoaded, setCsvLoaded] = useState(false);

  const { CSVReader } = useCSVReader();

  const handleCsvUpload = (results: any) => {
    if (results && results.data) {
      setData(results.data);
      setCsvLoaded(true);
    }
  };

  const handleSaveReport = (report: any) => {
    console.log('Saving report:', report);
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
              data={pivotState.data || data}
              onChange={setPivotState}
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
            data={boxPlotState.boxPlotData || data}
            onChange={setBoxPlotState}  
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
                  onSave={handleSaveReport}
                />
                <SaveData csvData={data} />
                <ReportList
                  setPivotState={setPivotState}
                  setBoxPlotState={setBoxPlotState}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default App;
