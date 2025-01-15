import { AnyFunction, AnyObject } from './utils/types.js';

// Based on https://gist.github.com/jonbretman/7259628
function getType(value: unknown) {
  // handle corner cases for old IE and PhantomJS
  if (value === undefined) {
    return 'undefined';
  }

  if (value === null) {
    return 'null';
  }

  // handle DOM elements
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (value && (value.nodeType === 1 || value.nodeType === 9)) {
    return 'element';
  }

  const toStringResult = Object.prototype.toString.call(value);

  const type = toStringResult.slice('[object '.length, -1).toLowerCase();

  // handle NaN and Infinity
  if (type === 'number') {
    if (Number.isNaN(value as number)) {
      return 'nan';
    }
    if (!Number.isFinite(value as number)) {
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
