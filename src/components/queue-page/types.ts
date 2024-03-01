import { ElementStates } from "../../types/element-states";


export type TCircle = {
  value: string;
  color: ElementStates;
}

export type TQueue<T, C> = {
  // геттеры
  // size: number;
  isEmpty: boolean;
  peak: T | null;
  tailIndex: number;
  headIndex: number;
  array: (T | null)[];

  // методы
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  
}