export type FnValue<TValue, TArgs extends any[] = []> =
  | TValue
  | ((...args: TArgs) => TValue);

export const resolveFnValue = <TValue, TArgs extends any[] = []>(
  fn: FnValue<TValue, TArgs>,
  ...args: TArgs
) => {
  if (typeof fn === 'function') {
    return (fn as any)(...args) as TValue;
  }

  return fn;
};
