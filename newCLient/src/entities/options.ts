export enum SectionType {
  TEXT,
  TABLE,
  HISTOGRAM,
  FREQUENCY_HISTOGRAM,
}

export type Section = {
  type: SectionType;
  content: any;
  id: number;
};

export type TableContent = {
  colums: Array<string>;
};

export type Options = {
  sections: Array<Section>;
};
