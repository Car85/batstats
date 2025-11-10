

interface ParseResult<T> {
    data: T[];
    errors: Error[];
    meta: {
      delimiter: string;
      linebreak: string;
      aborted: boolean;
      fields?: string[]; // Para archivos CSV con encabezados
      truncated: boolean;
    };
  }
  