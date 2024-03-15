import { swap } from "../../utils/helpers";
import { SortTypes } from "./types";


// сортировка выбором
export const makeSelectionSort = (arr: number[], type: SortTypes) => {
  const { length } = arr;
  const result = [];
  const sortedInd: number[] = [];
  
  for (let i = 0; i < length - 1; i++) {

    // сортировка ПО УБЫВАНИЮ (от большего) -----------------------------
    if (type === SortTypes.Max) {
      let maxIndex = i;

      for (let j = i + 1; j < length; j++) {
        // записываем снапшот значений перед изменениями
        result.push({
          trav1: i,
          trav2: j,
          sorted: [...sortedInd],
          arr: [...arr]
        });

        // находим индекс максимального элемента и записываем в maxIndex
        if (arr[j] > arr[maxIndex]) {
          maxIndex = j;
        }
      }

      // меняем местами текущий эл-т (первый неотсортированный) с максимальным
      swap(arr, maxIndex, i);
    }

    // сортировка ПО ВОЗРАСТАНИЮ (от меньшего) --------------------------
    if (type === SortTypes.Min) {
      let minIndex = i;
      for (let j = i + 1; j < length; j++) {
        // записываем снапшот значений перед изменениями
        result.push({
          trav1: i,
          trav2: j,
          sorted: [...sortedInd],
          arr: [...arr]
        });

        // находим индекс минимального элемента и записываем в minIndex
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      // меняем местами текущий эл-т (первый неотсортированный) с минимальным
      swap(arr, minIndex, i);
    }

    // в конце каждого цикла пополняем массив отсортированных индексов
    sortedInd.push(i);
  }

  sortedInd.push(length - 1);
  // записываем снапшот значений после цикла
  result.push({
    trav1: -1,
    trav2: -1,
    sorted: [...sortedInd],
    arr: [...arr]
  });

  return result;
}


// сортировка пузырьком
export const makeBubbleSort = (arr: number[], type: SortTypes) => {
  const { length } = arr;
  const result = [];
  const sortedInd: number[] = [];
  
  // i - счетчик проходов по массиву
  for (let i = 0; i < length; i++) {  
    for (let j = 0; j < (length - i - 1); j++) {
      // записываем снапшот значений перед изменениями
      result.push({
        trav1: j,
        trav2: j+1,
        sorted: [...sortedInd],
        arr: [...arr]
      });

      // сортировка ПО УБЫВАНИЮ (от большего) -----------------------------
      if (type === SortTypes.Max) {
        if (arr[j] < arr[j + 1]) {
          swap(arr, j, j+1);
        }
      }

      // сортировка ПО ВОЗРАСТАНИЮ (от меньшего) --------------------------
      if (type === SortTypes.Min) {
        if (arr[j] > arr[j + 1]) {
          swap(arr, j, j+1);
        }
      }

    }
    sortedInd.push(length - i - 1);
  }

  // записываем снапшот значений после цикла
  result.push({
    trav1: -1,
    trav2: -1,
    sorted: [...sortedInd],
    arr: [...arr]
  });

  return result;
}
