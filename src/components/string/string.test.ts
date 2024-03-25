import getReversedStringStepArrays from "./algorithm";


describe('String', () => {
  // тесты с валидными данными
  test('Передана корректная строка', () => {
    expect(getReversedStringStepArrays('a'))
      .toEqual([['a']]);
    expect(getReversedStringStepArrays('abc'))
      .toEqual([['a', 'b', 'c'], ['c', 'b', 'a']]);
    expect(getReversedStringStepArrays('abcd'))
      .toEqual([['a','b','c','d'], ['d','b','c','a'], ['d','c','b','a']]);
    expect(getReversedStringStepArrays('# 2^'))
      .toEqual([['#',' ','2','^'], ['^',' ','2','#'], ['^','2',' ','#']]);
  });

  // тесты с пограничными значениями
  test('Передана пустая строка', () => {
    expect(getReversedStringStepArrays(''))
      .toEqual([[]]);
  });

  // тесты с невалидными данными - проверяет TS
})