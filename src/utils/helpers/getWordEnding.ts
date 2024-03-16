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

// пример: getWordEnding(maxLength, 'символ', 'символа', 'символов')
// при maxLength = 1, 21, 31, ... ---> "maxLength символ" (н., 21 символ)
// при maxLength = 2, 3, 4, 22, 23, 24, ... ---> "maxLength символа" (н., 23 символа)
// при maxLength = 5, 6, 7, 11, 12, 13, ... ---> "maxLength символов" (н., 13 символов)