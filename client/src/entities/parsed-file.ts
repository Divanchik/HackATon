export type Column = {
    columnName: string;
    values: any;
}

export type ParsedFile = {
    fileName: string;
    columns: Array<Column>;
}

export type ParsedFiles = Array<ParsedFile>;