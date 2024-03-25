import { makeBubbleSortSteps, makeSelectionSortSteps } from "./algorithm";
import { SortTypes } from "./types";


describe('Sorting', () => {
  // тесты с валидными данными
  test('Переданы корректные данные при сортировке ВЫБОРОМ', () => {
    // 1 эл-т в массиве для min и max сортировки
    expect(makeSelectionSortSteps([1], SortTypes.Min))
      .toEqual([{trav1: -1, trav2: -1, sorted: [0], arr: [1]}]);
    expect(makeSelectionSortSteps([1], SortTypes.Max))
      .toEqual([{trav1: -1, trav2: -1, sorted: [0], arr: [1]}]);

    // несколько эл-в в массиве для min и max сортировки
    expect(makeSelectionSortSteps([20, 30, 10], SortTypes.Min))
      .toEqual([{trav1: 0, trav2: 1, sorted: [], arr: [20, 30, 10]},
        {trav1: 0, trav2: 2, sorted: [], arr: [20, 30, 10]}, 
        {trav1: 1, trav2: 2, sorted: [0], arr: [10, 30, 20]},
        {trav1: -1, trav2: -1, sorted: [0, 1, 2], arr: [10, 20, 30]}]);
    expect(makeSelectionSortSteps([20, 30, 10], SortTypes.Max))
      .toEqual([{trav1: 0, trav2: 1, sorted: [], arr: [20, 30, 10]},
        {trav1: 0, trav2: 2, sorted: [], arr: [20, 30, 10]}, 
        {trav1: 1, trav2: 2, sorted: [0], arr: [30, 20, 10]},
        {trav1: -1, trav2: -1, sorted: [0, 1, 2], arr: [30, 20, 10]}]);
  });
  test('Переданы корректные данные при сортировке ПУЗЫРЬКОМ', () => {
    // 1 эл-т в массиве для min и max сортировки
    expect(makeBubbleSortSteps([1], SortTypes.Min))
      .toEqual([{trav1: -1, trav2: -1, sorted: [0], arr: [1]}]);
    expect(makeBubbleSortSteps([1], SortTypes.Max))
      .toEqual([{trav1: -1, trav2: -1, sorted: [0], arr: [1]}]);

    // несколько эл-в в массиве для min и max сортировки
    expect(makeBubbleSortSteps([20, 30, 10], SortTypes.Min))
      .toEqual([{trav1: 0, trav2: 1, sorted: [], arr: [20, 30, 10]},
        {trav1: 1, trav2: 2, sorted: [], arr: [20, 30, 10]}, 
        {trav1: 0, trav2: 1, sorted: [2], arr: [20, 10, 30]},
        {trav1: -1, trav2: -1, sorted: [2, 1, 0], arr: [10, 20, 30]}]);
    expect(makeBubbleSortSteps([20, 30, 10], SortTypes.Max))
      .toEqual([{trav1: 0, trav2: 1, sorted: [], arr: [20, 30, 10]},
        {trav1: 1, trav2: 2, sorted: [], arr: [30, 20, 10]}, 
        {trav1: 0, trav2: 1, sorted: [2], arr: [30, 20, 10]},
        {trav1: -1, trav2: -1, sorted: [2, 1, 0], arr: [30, 20, 10]}]);
  });

  // тесты с пограничными значениями
  test('Передан пустый массив', () => {
    expect(makeSelectionSortSteps([], SortTypes.Min))
      .toEqual([{trav1: -1, trav2: -1, sorted: [], arr: []}]);
    expect(makeSelectionSortSteps([], SortTypes.Max))
      .toEqual([{trav1: -1, trav2: -1, sorted: [], arr: []}]);
      
    expect(makeBubbleSortSteps([], SortTypes.Min))
      .toEqual([{trav1: -1, trav2: -1, sorted: [], arr: []}]);
    expect(makeBubbleSortSteps([], SortTypes.Max))
      .toEqual([{trav1: -1, trav2: -1, sorted: [], arr: []}]);
  });

})