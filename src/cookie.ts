import { AnyObject } from './utils/types';

export const parseCookie = (cookiesString = document.cookie) => {
  return cookiesString
    .split(';')
    .map(function (cookieString) {
      return cookieString.trim().split('=');
    })
    .reduce<AnyObject>(function (acc, current) {
      acc[current[0]] = current[1];
      return acc;
    }, {});
};
