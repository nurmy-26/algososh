import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../utils/constants/delays";
import { setDelay, swap } from "../../utils/helpers";
import { TCircle } from "./types";


// алгоритм разворота строки
const reverseArray = async (arr: TCircle[], setCircles: (circles: TCircle[]) => void, setLoading: (isLoading: boolean) => void) => {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    // для одного элемента свап не нужен
    if (arr.length > 1) {
      // шаг до свапа - значения кругов еще прежние, цвет - розовый
      arr[start].color = ElementStates.Changing;
      arr[end].color = ElementStates.Changing;
      setCircles([...arr]);

      // интервал между свапами
      await setDelay(DELAY_IN_MS);

      // свап
      swap(arr, start, end);
    }
    
    // поменявшиеся круги становятся зелеными
    arr[start].color = ElementStates.Modified;
    arr[end].color = ElementStates.Modified;
    setCircles([...arr]); 
    
    start++;
    end--;
  }

  setLoading(false);
};

export default reverseArray;
// todo - сделать алгоритм чистой функцией, визуализацию отдельно
// алгоритм возвращает массив стейтов, компонент отрисовывает стейты по таймеру