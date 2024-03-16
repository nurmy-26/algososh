// вернет рандомное число из указанного промежутка
export const getRandomInt = (min: number, max: number) => {
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