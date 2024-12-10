import React, { useEffect, useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import './App.css';
import './styles/style.css';
import Plotly from 'react-plotly.js';
import SaveReport from './SaveReport';

function App() {
  const [pivotState, setPivotState] = useState({});
  const [data, setData] = useState<(string | number)[][]>([]);
  const [selectedOption, setSelectedOption] = useState<'batting' | 'pitching' | null>(null);

  useEffect(() => {
    if (!selectedOption) return;

    // Define el endpoint y el formato en el mismo lugar
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
