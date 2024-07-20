export type StorageType = 'session' | 'local';

const storages: Record<StorageType, Storage> = {
  session: sessionStorage,
  local: localStorage,
};

export const createStorageKey = (
  prefix: string,
  key: string,
  namespace?: string,
) => `${prefix}${namespace ? `/${namespace}` : ''}/${key}`;

const parseStorageValue = <V>(value: unknown): V | null => {
  if (typeof value !== 'string') {
    return value as V;
  }

  try {
    const parsed = JSON.parse(value);
    return parsed;
  } catch (e) {
    return null;
  }
};

const formatValueToStorage = (value: unknown): string => {
  return JSON.stringify(value);
};

export interface SetToStorageConfig<V>
  extends Omit<GetFromStorageConfig<V>, 'fallback'> {
  value: V;
}

export interface GetFromStorageConfig<V> {
  /**
   * Ключ по которому можно получить значение из хранилища (имя ключа не полное, оно дополняется неймпспейсом проекта)
   */
  key: string;
  /**
   * Тип хранилища
   */
  type: StorageType;
  /**
   * дефолтное значение, которое будет использоваться если значения нет в хранилище
   */
  fallback?: V;
  /**
   * Доп. делитель в ключе
   */
  namespace?: string;
  /**
   * Доп. делитель
   */
  prefix?: string;
}

export function createStorage<
  C extends Partial<Pick<GetFromStorageConfig<any>, 'prefix' | 'type'>>,
>(storageConfig: C) {
  type ConfigKeys = keyof C;

  return {
    set: <V>(cfg: Omit<SetToStorageConfig<V>, ConfigKeys>) => {
      const config = cfg as SetToStorageConfig<V>;
      const storageType = (config.type ?? storageConfig.type!) as StorageType;
      const storagePrefix = (config.prefix ?? storageConfig.prefix!) as string;

      const storage = storages[storageType];

      storage.setItem(
        createStorageKey(storagePrefix, config.key, config.namespace),
        formatValueToStorage(config.value),
      );
    },
    get: <V>(cfg: Omit<GetFromStorageConfig<V>, ConfigKeys>) => {
      const config = cfg as GetFromStorageConfig<V>;
      const storageType = (config.type ?? storageConfig.type!) as StorageType;
      const storagePrefix = (config.prefix ?? storageConfig.prefix!) as string;

      const storage = storages[storageType];

      return (
        parseStorageValue<V>(
          storage.getItem(
            createStorageKey(storagePrefix, config.key, config.namespace),
          ),
        ) ??
        config.fallback ??
        null
      );
    },
  } as const;
}

export const rootStorage = createStorage({ prefix: '@' });
