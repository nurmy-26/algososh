import { ElementStates } from "../../types/element-states";


export type TClickedState = 'add-h' | 'add-t' | 'add-i' | 'del-h' | 'del-t' | 'del-i' | '';

export type TCircle = {
  value: string;
  color: ElementStates;
  index?: number;
}

export type TList<T> = {
  // геттеры
  headIndex: number;
  tailIndex: number;
  listSize: number;
  array: T[];

  // методы
  prepend: (item: T) => void; // добавить в начало (head)
  append: (item: T) => void; // добавить в конец (tail)
  removeHead: () => void; // удалить из начала
  removeTail: () => void; // удалить из конца
  insertAt: (item: T, index: number) => void; // добавить по индексу
  deleteAt: (index: number) => void; // удалить по индексу
}