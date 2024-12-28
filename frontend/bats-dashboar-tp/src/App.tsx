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
import './ParseResult';



interface PivotState {
  map?: string; 
  [key: string]: any;
}

interface BoxPlot {
  map?: string;
  data?: (string | number)[][]; 
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

  const handleCsvUpload = (results: ParseResult<string[]>) => {
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
  <div className="appContainer">
      {!csvLoaded && (
        <section className="snapSection">
          <CSVReader onUploadAccepted={handleCsvUpload}>
            {({ getRootProps, acceptedFile, ProgressBar }: any) => (
              <div {...getRootProps()} className="dropZone">
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
        <section className="snapSection">
          <div className="pivotContainer">
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
        <section className="snapSection">
          <BoxPlot
            data={Array.isArray(boxPlotState.data) && boxPlotState.data.length > 0 ? boxPlotState.data : data}
            onChange={(newState: BoxPlot) => setBoxPlotState({ ...boxPlotState, ...newState })}
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
            setPivotState={handleCsvUpload}
            setBoxPlotState={handleCsvUpload}
          />
        </section>
      )}
    </div>
  );            
};

export default App;
