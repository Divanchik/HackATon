export enum Condition {
    AND,
    OR,
    EQUAL,
    NOT_EQUAL,
    // TODO ДОПОЛНИТЬ
}

export type Filter = {
    linkedFileName: string | null;
    linkedColumnName: string | null;
    conditionCustomValue: any | null;
    condition: Condition;
    // TODO ДОПОЛНИТЬ
}

export type LinkOperator = {
    condition: Condition | null;
    filters: Array<Filter> | null;
};

export type LinkOperators = Array<LinkOperator>