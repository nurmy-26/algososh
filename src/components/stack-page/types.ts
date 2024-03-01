import { ElementStates } from "../../types/element-states";


export type TCircle = {
  value: string;
  color: ElementStates;
}

export type TStack<T, C> = {
  // геттеры
  size: number;
  peak: T | null;
  peakIndex: number;
  array: T[];

  // сеттеры
  color: C;

  // методы
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  
}