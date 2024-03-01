import { TQueue } from "./types";


type TItem<T, C> = T extends object & { color: C } ? T : never;

class Queue<T, C> implements TQueue<T, C> {
  private container: T[] = [];
  private head: number = 0;
  private tail: number = 0;
  private readonly size: number = 0;
  private length: number = 0;
  private defaultValue: T;

  constructor(size: number, defaultValue: T) {
    this.size = size;
    this.container = Array.from({ length: size }, () => defaultValue);
    this.defaultValue = defaultValue;
  }


  get isEmpty() { return this.length === 0};
  get peak() {
    if (this.isEmpty) {
      throw new Error("В очереди нет элементов")
    }
    return this.container[this.head];
  };
  get tailIndex() {
    return this.tail;
  };
  get headIndex() {
    return this.head;
  };
  get array() { return this.container };
  get arraySize() { return this.size };


  enqueue = (item: T) => {
    if (this.tail >= this.size) {
      return;
    }
    if (this.length >= this.size) {
      throw new Error("Превышена максимальная длина очереди")
    }

    this.container[this.tail % this.size] = item;
    this.length++;
    this.tail++;
  }

  dequeue = () => {
    if (this.isEmpty) {
      return;
    }

    this.container[this.head] = this.defaultValue;
    this.length--;
    if (this.head < this.size - 1) {
      this.head++;
    }
  }

  clear = () => {
    this.container = Array.from({ length: this.size }, () => this.defaultValue);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

}

export default Queue;