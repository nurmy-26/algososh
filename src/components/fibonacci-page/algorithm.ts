import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { setDelay } from "../../utils/helpers";


// алгоритм нахождения ряда Фибоначчи для числа
const fibonacciIterative = async (n: number, setCircles: (arr: number[]) => void, setLoading: (isLoading: boolean) => void) => {
  // вариант где n=1 это [0], n=2 это [0,1] и тд
  // let arr = []
  // let prev = 0, next = 1;

  // for(let i = 0; i < n; i++){
  //   arr.push(prev)
  //   setCircles([...arr]);
  //   let temp = next;
  //   next = prev + next;
  //   prev = temp;
    
  //   // интервал между свапами
  //   await setDelay(SHORT_DELAY_IN_MS);
  //   setCircles([...arr]);
  // }
  // console.log(arr)
  // setLoading(false);

  // вариант от [1, 1]
  let arr = [1, 1];

  if (n === 1) {
    setCircles([...arr]);
  } else {
    for (let i = 2; i < n + 1; i++) {
      setCircles([...arr]);
      // берем значение по модулю ради n=1
      arr.push(Math.abs(arr[i-2] + arr[i-1]));
  
      // интервал между свапами
      await setDelay(SHORT_DELAY_IN_MS);
      setCircles([...arr]);
    }
  }
  
  setLoading(false);
};

export default fibonacciIterative;
// todo - сделать алгоритм чистой функцией, вынести логику рендеринга в компонент (проход по массиву с интервалом)