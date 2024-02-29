import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { setDelay, swap } from "../../utils/helpers";
import { TClickedState, TColumn } from "./types";


// вернет рандомное число из указанного промежутка
const getRandomInt = (min: number, max: number) => {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
}

// сгенерирует массив рандомных чисел (заданы границы длины и значений массива)
export const getRandomArr = (defaultArrLength = {min: 3, max: 17}, defaultArrValues = {min: 0,max: 100}) => {
  let arr: number[] = [];
  const arrLength = getRandomInt(defaultArrLength.min, defaultArrLength.max);
  for (let i = 0; i < arrLength; i++) {
    const randomInt = getRandomInt(defaultArrValues.min, defaultArrValues.max);
    arr.push(randomInt);
  }

  return arr;
}


// сортировка выбором
export const makeSelectionSort = async (
  arr: TColumn[], 
  setColumns: (columns: TColumn[]) => void, 
  setClicked: (isClicked: TClickedState) => void,
  type: 'min' | 'max',
  delay = SHORT_DELAY_IN_MS,
  states = ElementStates
  ) => {

  const { length } = arr;
  
  for (let i = 0; i < length - 1; i++) {
    arr[i].color = states.Changing; // подсвечиваем розовым первый неотсортированный эл-т

    // сортировка ПО УБЫВАНИЮ (от большего) -----------------------------
    if (type === 'max') {
      let maxIndex = i;

      for (let j = i + 1; j < length; j++) {
        arr[j].color = states.Changing; // подсвечиваем розовым перебираемый эл-т
        setColumns([...arr]);
        // интервал между свапами
        await setDelay(delay);

        // находим индекс максимального элемента и записываем в maxIndex
        if (arr[j].value > arr[maxIndex].value) {
          maxIndex = j;
        }
        arr[j].color = states.Default; // пройдя весь массив, текущий эл-т снова становится синим
        setColumns([...arr]); 
      }

      // меняем местами текущий эл-т (первый неотсортированный) с максимальным
      swap(arr, maxIndex, i);
      arr[maxIndex].color = states.Default; // возвращаем бывшему первому н/сорт синий цвет
    }

    // сортировка ПО ВОЗРАСТАНИЮ (от меньшего) --------------------------
    if (type === 'min') {
      let minIndex = i;
      for (let j = i + 1; j < length; j++) {
        arr[j].color = states.Changing;
        setColumns([...arr]);
        await setDelay(delay);

        // находим индекс минимального элемента и записываем в minIndex
        if (arr[j].value < arr[minIndex].value) {
          minIndex = j;
        }
        arr[j].color = states.Default;
        setColumns([...arr]); 
      }
      // меняем местами текущий эл-т (первый неотсортированный) с минимальным
      swap(arr, minIndex, i);
      arr[minIndex].color = states.Default;
    }

    arr[i].color = states.Modified;
    setColumns([...arr]);
  }

  arr[length - 1].color = states.Modified;
  setColumns([...arr]);

  setClicked('');
}


// сортировка пузырьком
export const makeBubbleSort = async (
  arr: TColumn[], 
  setColumns: (columns: TColumn[]) => void, 
  setClicked: (isClicked: TClickedState) => void, 
  type: 'min' | 'max',
  delay = SHORT_DELAY_IN_MS,
  states = ElementStates
  ) => {
    
  const { length } = arr;
  
  // i - счетчик проходов по массиву
  for (let i = 0; i < length; i++) {  
    for (let j = 0; j < (length - i - 1); j++) {

      arr[j].color = states.Changing;
      arr[j+1].color = states.Changing;
      setColumns([...arr]);

      await setDelay(delay);

      // сортировка ПО УБЫВАНИЮ (от большего) -----------------------------
      if (type === 'max') {
        if (arr[j].value < arr[j + 1].value) {
          swap(arr, j, j+1);
        }
      }

      // сортировка ПО ВОЗРАСТАНИЮ (от меньшего) --------------------------
      if (type === 'min') {
        if (arr[j].value > arr[j + 1].value) {
          swap(arr, j, j+1);
        }
      }

      arr[j].color = states.Default;
      setColumns([...arr]);
    }
    arr[length - i - 1].color = states.Modified;
    setColumns([...arr]);
  }


  setClicked('');
}
