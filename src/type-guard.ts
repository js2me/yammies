// Based on https://gist.github.com/jonbretman/7259628
function getType(o: unknown) {
  // handle corner cases for old IE and PhantomJS
  if (o === undefined) {
    return 'undefined';
  }

  if (o === null) {
    return 'null';
  }

  // handle DOM elements
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (o && (o.nodeType === 1 || o.nodeType === 9)) {
    return 'element';
  }

  const s = Object.prototype.toString.call(o);
  const type = s.substring('[object '.length, s.length - 1).toLowerCase();

  // handle NaN and Infinity
  if (type === 'number') {
    if (isNaN(o as number)) {
      return 'nan';
    }
    if (!isFinite(o as number)) {
      return 'infinity';
    }
  }

  return type;
}

const createTypeGuard =
  <T>(type: string) =>
  (value: unknown): value is T =>
    getType(value) === type;

const isDefined = <T>(value: T | undefined | null): value is T => value != null;

export const typeGuard = {
  isNull: createTypeGuard<null>('null'),
  isUndefined: createTypeGuard<undefined>('undefined'),
  isObject: createTypeGuard<AnyObject>('object'),
  isArray: createTypeGuard<unknown[]>('array'),
  isString: createTypeGuard<string>('string'),
  isNumber: createTypeGuard<number>('number'),
  isBoolean: createTypeGuard<boolean>('boolean'),
  isFunction: createTypeGuard<AnyFunction>('function'),
  isRegExp: createTypeGuard<boolean>('regexp'),
  isElement: createTypeGuard<HTMLElement>('element'),
  isNaN: createTypeGuard<number>('nan'),
  isInfinite: createTypeGuard<number>('infinite'),
  isSymbol: createTypeGuard<symbol>('symbol'),
  isDefined,
};
