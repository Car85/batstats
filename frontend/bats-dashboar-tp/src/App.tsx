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
  const [selectedOption, setSelectedOption] = useState<'batting' | 'pitching' | null>(null);
  const { CSVReader } = useCSVReader();
  useEffect(() => {
    if (!selectedOption) return;
    const endpointSaveData = 'http://localhost/barstats/json/save-data';
    const endpoint =
      selectedOption === 'batting'
        ? 'http://localhost/batstats/batting'
        : 'http://localhost/batstats/pitching';

    fetch(endpoint)
      .then((response) => response.json())
      .then((jsonData) => {
        const formattedData =
          selectedOption === 'batting'
            ? [
                ['Player', 'HomeRuns', 'WAR', 'GamesPlayed', 'RunScored', 'Hits', 'StolenBases'],
                ...jsonData.map((player: any) => [
                  player.playerName,
                  player.homeRuns,
                  player.war,
                  player.gamesPlayed,
                  player.runScored,
                  player.hits,
                  player.stolenBases,
                ]),
              ]
            : [
                ['Player', 'GamesPlayed', 'InningsPitched', 'EarnedRuns', 'ERA', 'RAA', 'WAA'],
                ...jsonData.map((player: any) => [
                  player.playerName,
                  player.gamesPlayed,
                  player.inningPitched,
                  player.earnedRuns,
                  player.era,
                  player.raa,
                  player.waa,
                ]),
              ];
        setData(formattedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [selectedOption]);

  const PlotlyRenderers = createPlotlyRenderers(Plotly);

  if (!selectedOption) {
    return (
      <div className="button-container">
        <button className="big-button" onClick={() => setSelectedOption('batting')}>
          Batting Stats
        </button>
        <button className="big-button" onClick={() => setSelectedOption('pitching')}>
          Pitching Stats
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>{selectedOption === 'batting' ? 'Batting Stats' : 'Pitching Stats'} Pivot Table</h1>
      <div className="card">
      <CSVReader
        onUploadAccepted={(results: any) => {
        if (results && results.data) {
            console.log('Resultados del CSV:', results.data);
        } else {
            console.error('Los resultados no contienen datos válidos:', results);
        }
      }}>
         {({
    getRootProps,
    acceptedFile,
    ProgressBar,
    getRemoveFileProps,
  }: any) => (
    <>
      <div style={styles.csvReader}>
        <button type='button' {...getRootProps()} style={styles.browseFile}>
          Browse file
        </button>
        <div style={styles.acceptedFile}>
          {acceptedFile && acceptedFile.name}
        </div>
        <button {...getRemoveFileProps()} style={styles.remove}>
          Remove
        </button>
        <SaveData pivotState={pivotState} />
      </div>
      <ProgressBar style={styles.progressBarBackgroundColor} />
    </>
  )}
      </CSVReader>
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
      <SaveReport pivotState={pivotState} />
    </div>
  );
}

export default App;
