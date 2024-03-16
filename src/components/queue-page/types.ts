import { ElementStates } from "../../types/element-states";


export type TCircle = {
  value: string;
  color: ElementStates;
}

export type TQueue<T> = {
  // геттеры
  isEmpty: boolean;
  peak: T | null;
  tailIndex: number;
  headIndex: number;
  array: (T | null)[];
  arraySize: number;

  // методы
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  
}