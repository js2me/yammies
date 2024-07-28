const MULTIPLY_BY_UNIT = {
  ms: 1,
  sec: 1000,
  min: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  week: 1000 * 60 * 60 * 24 * 7,
} as const;

/**
 * Переводит значение в юнитах в миллисекунды
 *
 * @example
 * ```ts
 * ms(1, 'min') // 60_000
 * ms(30, 'sec') // 30_000
 * ```
 */
export const ms = (value: number, unit: keyof typeof MULTIPLY_BY_UNIT = 'ms') =>
  value * MULTIPLY_BY_UNIT[unit];
