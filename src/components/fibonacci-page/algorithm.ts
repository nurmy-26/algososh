import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { setDelay } from "../../utils/helpers";


// алгоритм выведения n чисел Фибоначчи после первой единицы
const fibonacciIterative = async (
  n: number, 
  setCircles: (arr: number[]) => void, 
  setLoading: (isLoading: boolean) => void,
  delay = SHORT_DELAY_IN_MS
  ) => {
  let arr = [1, 1];

  // рендер первого круга
  setCircles([1]);

  // рендер второго круга
  await setDelay(delay);
  setCircles([...arr]);

  // рендер последующих кругов
  for (let i = 2; i < n + 1; i++) {
    arr.push(arr[i-2] + arr[i-1]);

    // интервал между свапами
    await setDelay(delay);
    setCircles([...arr]);
  }
  
  setLoading(false);
};

export default fibonacciIterative;