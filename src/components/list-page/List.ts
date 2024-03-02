import { TList } from "./types";


class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}


class List<T> implements TList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  private createInitialList(arr: T[]) {
    arr.forEach((item) => this.append(item));
  };

  constructor(array?: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    // если при создании экземпляра передан массив, создаем начальный список
    if (array) {
      this.createInitialList(array);
    }
  }


  get headIndex() {
    let headInd;
    if (this.size !== 0) {
      headInd = 0;
    } else {
      headInd = -1;
    }
    return headInd;
  };
  get tailIndex() {
    let tailInd;
    if (this.size !== 0) {
      tailInd = this.size - 1;
    } else {
      tailInd = -1;
    }
    return tailInd;
  };
  get listSize() { return this.size };
  get array() {
    let curr = this.head;
    const arrayFromList = [];

    while (curr) {
      arrayFromList.push(curr.value);
      curr = curr.next;
    }

    return [...arrayFromList];
  };


  // добавить в начало (head)
  prepend = (item: T) => {
    const node = new Node(item);
    // если список еще пуст
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    // иначе вставляем элемент перед первым и меняем ссылки
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  // добавить в конец (tail)
  append = (item: T) => {
    const node = new Node(item);
    // если список еще пуст
    if (this.tail === null) {
      this.head = node;
      this.tail = node;
    // иначе добавляем новый элемент в конец и меняем ссылки
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  removeHead = () => {
    // если список еще пуст
    if (this.head === null) {
      return null;
    // иначе меняем ссылки
    } else if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      const temp = this.head.next; // сохраняем ссылку на следующий эл-т
      this.head.next = null; // обнуляем связь первого элемента со списком
      this.head = temp; // обновляем элемент head
    }
    this.size--;
  }

  removeTail = () => {
    // если список еще пуст
    if (this.head === null) {
      return null;
    // если в списке 1 элемент
    } else if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    // если в списке 2 и более элемента
    } else {
      let curr = this.head;
      // 2 элемента
      if (curr.next !== null && curr.next.next === null) {

        curr.next = null;
        this.tail = curr;
      } else {
        // 3+ элемента
        while (curr.next !== null && curr.next.next !== null) {
          curr = curr.next;
        }
        curr.next = null;
        this.tail = curr;
      }
    }
    this.size--;
  }

  insertAt = (item: T, index: number) => {
    if (index < 0 || index > this.size) {
      // return или блок кнопок
      throw new Error('Введен неверный индекс')
    } else {
      const node = new Node(item);

      // если нужно добавить в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      // иначе перебираем эл-ты до нужной позиции
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (curr && currIndex < index - 1) {
          currIndex++;
          curr = curr.next;
        }

        if (curr) {
          // в next добавляемого эл-та записываем ссылку на след элемент
          node.next = curr.next;
          // а в ссылку текущего эл-та - ссылку на добавляемый эл-т
          curr.next = node;
        }
      }
      this.size++;
    }
  }

  deleteAt = (index: number) => {
    if (index < 0 || index > this.size) {
      // return или блок кнопок
      throw new Error('Введен неверный индекс')
    } else {
      // если нужно удалить из начала списка
      if (index === 0 && this.head) {
        const temp = this.head.next; // сохраняем ссылку на следующий эл-т
        this.head.next = null; // обнуляем связь первого элемента со списком
        this.head = temp; // обновляем элемент head
      // иначе перебираем эл-ты до нужной позиции
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (curr && currIndex < index - 1) {
          currIndex++;
          curr = curr.next;
        }

        if (curr && curr.next) {
          curr.next = curr.next.next;
        }
      }
      this.size--;
    }
  }

}

export default List;