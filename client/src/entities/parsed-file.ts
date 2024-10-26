export type Column = {
  columnName: string;
  values: any;
};

export type ParsedFile = {
  fileName: string;
  columns: Array<Column>;
  length: number;
};

export type ParsedFiles = Array<ParsedFile>;
