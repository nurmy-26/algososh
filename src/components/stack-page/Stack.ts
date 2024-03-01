import { TStack } from "./types";


type TItem<T, C> = T extends object & { color: C } ? T : never;

class Stack<T, C> implements TStack<T, C> {
  private container: T[] = [];

  get size() { return this.container.length };
  get peak() {
    const length = this.size;
    if (length) {
      return this.container[length - 1];
    }
    return null
  };
  get peakIndex() {
    const length = this.size;
    if (length) {
      return length - 1;
    }
    return -1;
  };
  get array() { return this.container };

  set color(value: C) {
    const length = this.size;
    if (length) {
      const lastItem = this.container[length - 1] as TItem<T, C>;
      if (typeof lastItem === 'object' && 'color' in lastItem) {
        lastItem.color = value;
      } else {
        throw new Error('Невозможно назначить цвет элементу без свойства color');
      }
    } else {
      throw new Error('Невозможно назначить цвет отсутствующему элементу');
    }
  }

  push = (item: T) => {
    this.container.push(item);
  }

  pop = () => {
    const length = this.size;
    if (length) {
      this.container.pop();
    }
  }

  clear = () => {
    this.container = [];
  }

}

export default Stack;