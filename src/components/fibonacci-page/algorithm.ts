// алгоритм получения n чисел Фибоначчи после первой единицы
const getFibonacciSeries = (n: number) => {
  let result = [1, 1];
  
  if (n <= 1) {
    return result;
  }

  for (let i = 2; i < n + 1; i++) {
    result.push(result[i-2] + result[i-1]);
  }
  
  return result;
};

export default getFibonacciSeries;