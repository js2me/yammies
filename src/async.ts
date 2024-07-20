/* eslint-disable @typescript-eslint/no-explicit-any */

export const waitAsync = (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));
