import { swap } from "../../utils/helpers";


// алгоритм получения массива шагов (слепки развернутой строки на каждом шаге)
const getReversedStringStepArrays = (string: string) => {
  const arr = string.split('');
  const result = [[...arr]];

  // для одного элемента свап не нужен
  if (string.length === 1) {
    return result;
  }

  let start = 0;
  let end = arr.length - 1;
  
  while (start <= end) {
    // меняем элементы местами
    swap(arr, start, end);
    // записываем текущий массив в массив шагов
    result.push([...arr]);

    start++;
    end--;
  }

  return result;
};

export default getReversedStringStepArrays;