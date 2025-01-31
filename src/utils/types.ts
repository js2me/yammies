/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Extract all values from object or array
 */
export type ValueOf<T> = T[keyof T];

/** Converts enum keys to union */
export type ExtractEnumKeys<T> = ValueOf<{
  [key in keyof T]: key extends string ? key : never;
}>;

export type Maybe<T> = Nullable<T> | undefined;

export type Nullable<T> = T | null;

/**
 * Any object with any values
 */
export type AnyObject = Record<string, any>;

/**
 * Empty object without properties
 */
export type EmptyObject = Record<string, never>;

export type AnyPrimitive = string | number | boolean | null | undefined;

export type AnyFunction = (...args: any) => any;

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type FalsyValues = undefined | null | '' | false | 0;

export type MaybeFalsy<T> = Maybe<T> | FalsyValues;

export type MaybeFn<T, TArgs extends any[] = any[]> =
  | T
  | ((...args: TArgs) => T);

export type Class<T, Args extends any[] = any[]> = new (...args: Args) => T;

/**
 * Все свойства будут опциональны, в любую глубину
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type PartialKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type RequiredKeys<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export type AllPropertiesOptional<T> = keyof T extends never
  ? true
  : {
        [K in keyof T]-?: undefined extends T[K] ? never : K;
      } extends { [K in keyof T]: never }
    ? true
    : false;

export type RecordEntries<T extends AnyObject> =
  T extends Record<infer Keys, infer Values>
    ? [Keys, Values][]
    : T extends Partial<Record<infer Keys, infer Values>>
      ? [Keys, Values][]
      : never;

export type RenameKey<
  TObject,
  TOldKey extends keyof TObject,
  TNewKey extends string,
> = Omit<TObject, TOldKey> &
  AllPropertiesOptional<Pick<TObject, TOldKey>> extends true
  ? { [K in TNewKey]?: TObject[TOldKey] }
  : { [K in TNewKey]: TObject[TOldKey] };

export type IsObjectEmpty<T extends AnyObject> = T extends EmptyObject
  ? true
  : keyof T extends never
    ? true
    : never;

export type IsEmptyArray<T extends readonly any[]> = T extends []
  ? true
  : false;
