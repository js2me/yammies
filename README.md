<img src="assets/logo.png" align="right" height="156" alt="logo" />

# yummies  

[![NPM version][npm-image]][npm-url] [![build status][github-build-actions-image]][github-actions-url] [![npm download][download-image]][download-url] [![bundle size][bundlephobia-image]][bundlephobia-url]


[npm-image]: http://img.shields.io/npm/v/yummies.svg
[npm-url]: http://npmjs.org/package/yummies
[github-build-actions-image]: https://github.com/js2me/yummies/workflows/Build/badge.svg
[github-actions-url]: https://github.com/js2me/yummies/actions
[download-image]: https://img.shields.io/npm/dm/yummies.svg
[download-url]: https://npmjs.org/package/yummies
[bundlephobia-url]: https://bundlephobia.com/result?p=yummies
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/yummies


Yummies - это набор разнообразных утилит для JavaScript-проектов с открытым исходным кодом, предназначенный для упрощения выполнения общих задач и повышения производительности. Этот проект предоставляет разработчикам мощные и простые в использовании функции, которые легко интегрировать в любой JavaScript-код.  

## [yummies/async](src/async.ts)  
Утилиты по работе с асинхронным кодом  

## [yummies/cookie](src/cookie.ts)  
Утилиты по работе с куками  

## [yummies/css](src/css.ts)  
Утилиты по работе с CSS  

## [yummies/date-time](src/date-time.ts)  
Утилиты по работе с датой и временем (основаны на dayjs)   

## [yummies/device](src/device.ts)  
Утилиты по работе с устройствами  

## [yummies/html](src/html.ts)  
Утилиты по работе с HTML  

## [yummies/id](src/id.ts)  
Утилиты по работе с идентификаторами  

## [yummies/imports](src/imports.ts)  
Утилиты по работе с импортом модулей  

## [yummies/math](src/math.ts)  
Утилиты по работе с устройствами  

## [yummies/media](src/media.ts)  
Утилиты по работе с медиа (изображением, канвасом и блобом)  

## [yummies/ms](src/ms.ts)  
Утилиты по работе с миллисекундами  

## [yummies/price](src/price.ts)  
Утилиты по работе с денежными значениями (форматирование)  

## [yummies/sound](src/sound.ts)  
Утилиты по работе со звуком  

## [yummies/storage](src/storage.ts)  
Утилиты по работе с хранилищем (localStorage, sessionStorage)  

## [yummies/text](src/text.ts)  
Утилиты по работе с текстом  

## [yummies/type-guard](src/type-guard.ts)  
Утилита для проверок на типы  

## [yummies/vibrate](src/vibrate.ts)  
Утилиты по работе с vibrate api  

## [yummies/utility-types](src/utils/types.ts)  
TypeScript типы-утилиты, которые упрощают написание TypeScript кода.  
Импортируются глобально, используя `d.ts` файл, встраиваясь в окружающую среду   
```ts
import 'yummies/utility-types';
```  
Или указываются в `tsconfig.json` в поле `"types"`    
```json
{
  "compilerOptions": {
    "types": [
      "yummies/utility-types"
    ],
    "target": "...blabla",
    ...
  }
  ...
}
```
Также можно использовать альтернативный "библиотечный" подход, когда нам нужны экспортируемые типы.  
Для этого можно использовать импорт `yummies/utils/types`   

```ts
import { AnyObject } from 'yummies/utils/types';
```


## [yummies/complex](src/complex/index.ts)  

Дополнительный набор комплексных утилит  