export function degToRad(deg: number) {
  return deg * (Math.PI / 180.0);
}
export function radToDeg(rad: number) {
  return rad * (180.0 / Math.PI);
}

/**
 * Получить процент от числа
 * @example
 * ```ts
 * percentFrom(500, 2000) // 25
 * percentFrom(1000, 2000) // 50
 * ```
 */
export const percentFrom = (num: Maybe<number>, from: Maybe<number>) => {
  return ((num || 0) / (from || 0)) * 100 || 0;
};
