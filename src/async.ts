/* eslint-disable @typescript-eslint/no-explicit-any */

export const waitAsync = (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const endlessRAF = (
  quitFn: () => boolean | void,
  asMicrotask?: boolean,
) => {
  if (quitFn()) return;

  const raf = () =>
    requestAnimationFrame(() => endlessRAF(quitFn, asMicrotask));

  if (asMicrotask) {
    queueMicrotask(raf);
  } else {
    raf();
  }
};
