import { ElementStates } from "./element-states";

// string
export interface ISymbolsStep {
  symbols: string[];
  index?: number;
  state?: ElementStates;
};

// sorting-page
export interface INumbersArray {
  num: number;
  state?: ElementStates;
};

// stack-page
export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
};

export interface IStackSymbols {
  symbol: string | undefined,
  state: ElementStates
};

// queue-page 
export interface IQueueSymbols {
  symbol: string | undefined,
  state: ElementStates,
  head?: string | null,
  tail?: string | null,
};

// list-page
export interface ILinkedList<T> {
  append: (value: T) => void;
  prepend: (value: T) => void;
  addByIndex: (value: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  getHead: () => void;
};

export interface IListSymbols {
  symbol: string | undefined,
  state: ElementStates,
  head?: 'head' | null,
  tail?: 'tail' | null,
  smallCircle?: IListSmallSymbol
};

export interface IListSmallSymbol {
  symbol: string | undefined
};