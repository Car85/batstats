import { Data } from "plotly.js";

export interface ParseResult<T> {
    data: T[];
    errors: string[];
    meta: {
      delimiter: string;
      linebreak: string;
      aborted: boolean;
      fields?: string[];
    };
  }


  export interface PivotState {
    map?: string; 
    data?: string[][];
    options?: Record<string, unknown>;
    [key: string]: unknown; 
  }
  
  export interface BoxReplica {
    data?: Data[];
    plotlayout?: PlotYaout;
  }

  export interface BoxPlotState {
    data?: string[][];          
    options?: Record<string, unknown>; 
    labels?: string[];           
    categoricalColumn?: string;  
    numericColumn?: string;      
    selectedCategories?: string[]; 
    tooltipColumn?: string;
    [key: string]: unknown;
  }

  export interface BarChartReplica {
    data: BarData[];
    layout: PlotYaout;
  }
  
  export interface BarData {
    y: number[] | string[]; 
    x: number[] | string[]; 
    type: 'bar'; 
    name: string; 
    text: string[]; 
    hoverinfo: string; 
    textposition: string; 
  }

  

  export interface BarChartState {
    map?: string;
    data?: string[][]; 
    options?: Record<string, unknown>;
    labels?: string[]; 
    [key: string]: unknown; 
  }
  
  

  export interface CSVReaderProps {
    getRootProps: () => React.HTMLAttributes<HTMLDivElement>; 
    acceptedFile: File | null;
    ProgressBar: React.ComponentType<React.CSSProperties>; 
  }


  export interface MatrixDataState {
    map?: string;
    data?: (string)[][];     
}



export interface DashboardState {
  pivotState: PivotState; 
  boxPlotState: BoxPlotState; 
  barChartState: BarChartState; 
  correlationMatrixState: MatrixDataState; 
}


export interface PlotYaout {
  title: string;
  yaxis: {
    title: string;
  };
  xaxis: {
    title: string;
  };

}


export interface BarLayout {
  title: {
    text: string;}
  yaxis: {
    title: {
      text: string;}
    type: '-' | 'linear' | 'log' | 'date' | 'category' | 'multicategory';
    range: number[];
    autorange: boolean;

  };
  xaxis: {
    title: {
      text: string;}
    type: '-' | 'linear' | 'log' | 'date' | 'category' | 'multicategory';
    range: number[];
    autorange: boolean;
  };

}

  
  