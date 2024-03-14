import { TCircle } from "./types";


// алгоритм получения массива шагов (индексов тех эл-в, которые будут меняться на каждом шаге)
const reverseArray = (arr: TCircle[]) => {
  const result = [];
  let start = 0;
  let end = arr.length - 1;
  
  while (start <= end) {
    result.push({ start, end });

    start++;
    end--;
  }

  return result;
};

export default reverseArray;