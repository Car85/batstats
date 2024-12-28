import React, { useState } from 'react';


import PivotTableUI from 'react-pivottable/PivotTableUI';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plotly from 'react-plotly.js';
import SaveReport from './SaveReport';
import { useCSVReader } from 'react-papaparse';
import BoxPlot from './Boxplot';
import ReportList from './ReportList';


import './App.css';
import { BoxPlotState, ParseResult, PivotState, CSVReaderProps } from './Types';



const PlotlyRenderers = createPlotlyRenderers(Plotly);

const App = () => {
  const [pivotState, setPivotState] = useState<PivotState>({});
  const [boxPlotState, setBoxPlotState] = useState<BoxPlotState>({});
  const [data, setData] = useState<string[][]>([]);
  const [csvLoaded, setCsvLoaded] = useState(false);
  const [usePivotStateData, setUsePivotStateData] = useState(false); 

  const { CSVReader } = useCSVReader();

  const handleCsvUpload = (results: ParseResult<string[]>) => {
    console.log(results.data);
    if (results && results.data) {
      setData(results.data);
      setCsvLoaded(true);
      setUsePivotStateData(false);
  
      setPivotState({ ...pivotState, data: results.data });
      setBoxPlotState({ ...boxPlotState, data: results.data });
    } else {
      console.error('Result data not valid:', results);
    }
  };
  
 
 
  return (
  <div className="appContainer">
      {!csvLoaded && (
        <section className="snapSection">
          <CSVReader onUploadAccepted={handleCsvUpload}>
            {({ getRootProps, acceptedFile, ProgressBar }: CSVReaderProps) => (
              <div {...getRootProps()} className="dropZone">
                {acceptedFile ? (
                  <p>{acceptedFile.name}</p>
                ) : (
                  <p>DROP YOUR CSV DATASET HERE</p>
                )}
                <ProgressBar/>
              </div>
            )}
          </CSVReader>
        </section>
      )}

      {csvLoaded && (
        <section className="snapSection">
          <div className="pivotContainer">
          <PivotTableUI
          data={
            
              Array.isArray(pivotState.data) && pivotState.data.length > 0
              ? pivotState.data.map(row => row.map(cell => String(cell)))
              : data.map(row => row.map(cell => String(cell)))  
             }
              
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
        <section className="snapSection">
          <BoxPlot
            data={Array.isArray(boxPlotState.data) && boxPlotState.data.length > 0 ? boxPlotState.data : data}
            onChange={(newState: BoxPlotState) => setBoxPlotState({ ...boxPlotState, ...newState })}
        />

        </section>
      )}

      {csvLoaded && (
        <section className="snapSection">
          <div style={{ width: '90%' }}>
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
            setPivotState={(state: PivotState) => setPivotState(state)}
            setBoxPlotState={(state: BoxPlotState) => setBoxPlotState(state)}
        />
        </section>
      )}
    </div>
  );            
};

export default App;
