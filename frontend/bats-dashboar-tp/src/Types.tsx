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
    data?: (string | number)[][]; 
    options?: Record<string, unknown>;
    [key: string]: unknown; 
  }
  
  export interface BoxPlotState {
    map?: string;
    data?: (string | number)[][]; 
    labels?: string[]; 
    [key: string]: unknown; 
  }
  

  export interface CSVReaderProps {
    getRootProps: () => React.HTMLAttributes<HTMLDivElement>; 
    acceptedFile: File | null;
    ProgressBar: React.ComponentType<React.CSSProperties>; 
  }
  
  