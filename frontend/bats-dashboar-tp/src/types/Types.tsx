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
  
  export interface BoxPlotState {
    map?: string;
    data?: string[][]; 
    labels?: string[]; 
    [key: string]: unknown; 
  }


  export interface BarChartState {
    map?: string;
    data?: string[][]; 
    labels?: string[]; 
    [key: string]: unknown; 
  }
  
  

  export interface CSVReaderProps {
    getRootProps: () => React.HTMLAttributes<HTMLDivElement>; 
    acceptedFile: File | null;
    ProgressBar: React.ComponentType<React.CSSProperties>; 
  }


  export interface MatrixDataState {
    data: (string | number)[][]; 
}

  
  