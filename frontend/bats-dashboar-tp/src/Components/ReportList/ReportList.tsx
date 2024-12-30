import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import 'react-pivottable/pivottable.css';
import { PivotState, BoxPlotState } from '../../types/Types';

interface Report {
  id: string;
  name: string;
}

interface ReportsListProps {
  setPivotState: Dispatch<SetStateAction<PivotState>>;
  setBoxPlotState: Dispatch<SetStateAction<BoxPlotState>>;
}


function ReportsList({ setPivotState, setBoxPlotState }: Readonly<ReportsListProps>) {
  const [reports, setReports] = useState<Report[]>([]);

  // load reports from localStorage 
    useEffect(() => {
    const reportsFromStorage = localStorage.getItem('reports');
    if (reportsFromStorage) {
      setReports(JSON.parse(reportsFromStorage));
    }
  }, []);

  const handleLoadReport = async (reportId: string) => {
    try {
      const response = await fetch(`http://localhost/batstats/report/query/${reportId}`);
      if (!response.ok) {
        throw new Error('Error loading report');
      }
  
      const { configuration } = await response.json();
      if (!configuration) {
        throw new Error('the config is empty or null');
      }
  
      let parsedConfig;
      try {
        parsedConfig = JSON.parse(configuration);
      } catch (jsonError) {
        if (jsonError instanceof Error) {
          throw new Error('Parse error to JSON: ' + jsonError.message);
        } else {
          throw new Error('Unknowns error  parsing JSON confg');
        }
      }
  
      const { pivotState = {}, boxPlotState = {} } = parsedConfig;

      console.log("Validated Pivot State:", pivotState);     
  
      setPivotState(pivotState);
      setBoxPlotState(boxPlotState);
    } catch (error) {
      console.error('Load Error config: ', error);
    }
  };
  

  return (
    <div>
      <h1>Your Reports</h1>
      <ul>
      <select onChange={(e) => handleLoadReport(e.target.value)}>
         <option value="" disabled selected>Select a report</option>
         {reports.map((report) => (
         <option key={report.id} value={report.id}>
            {report.name}
      </option>
        ))}
      </select>

      </ul>
    </div>
  );
}

export default ReportsList;
