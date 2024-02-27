// получить правильную форму слова
// one, two, five - варианты формы слова для чисел, заканчивающихся на 1, 2-4, 5+ соответственно
const getWordEnding = (number: number | undefined, one: string, two: string, five: string) => {
  if (number === undefined) {
    return five
  }
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

export default getWordEnding;