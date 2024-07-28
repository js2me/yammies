import { waitAsync } from './async';

/**
 * Функция ленивой загрузки модуля, с возможностью вызова доп. попыток
 * @example
 * ```ts
 * fetchLazyModule(() => import("./test.ts"), 3) // начнет загрузку test.ts
 * // Произошла ошибка загрузки test.ts, тогда fetchLazyModule повторно вызовет fn()
 * // Вызывать будет столько раз сколько указано attempts (по умолчанию 3)
 * ```
 */
export const fetchLazyModule = async <T>(
  fn: () => Promise<T>,
  attempts = 3,
): Promise<T> => {
  const attemptsArray = Array(attempts).fill(fn);
  let lastError: null | Error = null;

  for await (const attempt of attemptsArray) {
    try {
      if (lastError !== null) {
        await waitAsync(1000);
      }
      return await attempt();
    } catch (e) {
      lastError = e as Error;
    }
  }
  throw lastError;
};
