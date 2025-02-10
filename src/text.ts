/**
 * Склонение слова в зависимости от количества
 * @example
 * declension(1, ['слово', 'слова', 'слов']) // 'слово'
 * @example
 * declension(2, ['слово', 'слова', 'слов']) // 'слова'
 * @example
 * declension(5, ['слово', 'слова', 'слов']) // 'слов'
 */
export const declension = (
  count: number,
  txt: readonly [one: string, two: string, five: string],
  cases = [2, 0, 1, 1, 1, 2],
) =>
  txt[count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]];
