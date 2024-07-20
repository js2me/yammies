import { waitAsync } from './async';

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
