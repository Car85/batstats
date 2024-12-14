import React, { CSSProperties, useEffect, useState } from 'react';
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
  csvReader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  } as CSSProperties,
  browseFile: {
    width: '20%',
  } as CSSProperties,
  acceptedFile: {
    border: '1px solid #ccc',
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: '80%',
  } as CSSProperties,
  remove: {
    borderRadius: 0,
    padding: '0 20px',
  } as CSSProperties,
  progressBarBackgroundColor: {
    backgroundColor: 'red',
  } as CSSProperties,
};

function App() {
  const [pivotState, setPivotState] = useState({});
  const [data, setData] = useState<(string | number)[][]>([]);
  const { CSVReader } = useCSVReader();
  
  const PlotlyRenderers = createPlotlyRenderers(Plotly);

  return (
    <div className="App">
      <div className="card">
      <CSVReader
  onUploadAccepted={(results: any) => {
    if (results && results.data) {
      console.log('Resultados del CSV:', results.data);
      setData(results.data); 
    } else {
      console.error('Los resultados no contienen datos válidos:', results);
    }
  }}
>
  {({
    getRootProps,
    acceptedFile,
    ProgressBar,
  }: any) => (
    <div
      {...getRootProps()}
      style={{
        width: '100%',
        border: '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: '#f9f9f9',
      }}
    >
      {acceptedFile ? (
        <p>{acceptedFile.name}</p>
      ) : (
        <p>DROP YOUR CSV DATASET HERE</p>
      )}
      <ProgressBar style={styles.progressBarBackgroundColor} />
    </div>
  )}
</CSVReader>


<div style={{ display: 'flex', justifyContent: 'space-between' }}>
    {/* Pivot Table */}
    <div style={{ width: '65%' }}>
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
    {/* Box Plot */}
    <div style={{ width: '50%' }}>
      <BoxPlot data={data} />
    </div>
    
      </div></div>
      <SaveReport pivotState={pivotState} />
      <SaveData csvData={data} /> 
      </div>
  );
}

export default App;
