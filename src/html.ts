import insane, { SanitizeOptions } from 'insane';
import { clamp } from 'lodash-es';

import { blobToUrl } from './media';
import { Maybe } from './utils/types';

/**
 * Вытаскивает RGB из любого цвета
 *
 * Не рекомендуется к использованию так как вызывает reflow
 */
export const getComputedColor = (color?: string): string | null => {
  if (!color) return null;

  const d = document.createElement('div');
  d.style.color = color;
  document.body.append(d);
  const rgbcolor = globalThis.getComputedStyle(d).color;
  const match =
    /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[.d+]*)*\)/g.exec(rgbcolor);

  if (!match) return null;

  return `${match[1]}, ${match[2]}, ${match[3]}`;
};

export const downloadUsingAnchor = (
  urlOrBlob: string | Blob,
  fileName?: string,
) => {
  const url = blobToUrl(urlOrBlob);

  const a = document.createElement('a');
  a.href = url;

  a.download = fileName ?? 'file';

  a.target = '_blank';

  document.body.append(a);

  a.click();

  a.remove();
};

/**
 * Surrounds string in an anchor tag
 */
export function wrapTextToTagLink(link: string) {
  const descr = String(link).replace(/^(https?:\/{0,2})?(w{3}\.)?/, 'www.');
  if (!/^https?:\/{2}/.test(link)) link = `http://${link}`;
  return `<a href=${link} target="_blank">${descr}</a>`;
}

export const collectOffsetTop = (element: HTMLElement | null) => {
  let offsetTop = 0;
  let node = element;

  while (node != null) {
    offsetTop += node.offsetTop;
    node = node.parentElement;
  }

  return offsetTop;
};

export const skipEvent = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();

  return false;
};

export const globalScrollIntoViewForY = (node: HTMLElement) => {
  const scrollContainer = document.body;
  const pageHeight = window.innerHeight;
  const nodeBounding = node.getBoundingClientRect();
  const scrollPagesCount = scrollContainer.scrollHeight / pageHeight;

  const scrollPageNumber = clamp(
    nodeBounding.top / pageHeight,
    1,
    scrollPagesCount,
  );

  window.scroll({
    top: scrollPageNumber * pageHeight,
    behavior: 'smooth',
  });
};

const sanitizeDefaults: SanitizeOptions = {
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    span: ['class'],
    code: ['class'],
  },
  allowedClasses: {},
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedTags: [
    'a',
    'article',
    'b',
    'blockquote',
    'br',
    'caption',
    'code',
    'del',
    'details',
    'div',
    'em',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hr',
    'i',
    'img',
    'ins',
    'kbd',
    'li',
    'main',
    'ol',
    'p',
    'pre',
    'section',
    'span',
    'strong',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'th',
    'thead',
    'tr',
    'u',
    'ul',
  ],
  filter: undefined,
  transformText: undefined,
};

export const sanitizeHtml = (
  html: Maybe<string>,
  config?: Partial<SanitizeOptions>,
) => {
  return insane(html ?? '', {
    ...sanitizeDefaults,
    ...config,
  });
};

export const checkElementHasParent = (
  element: HTMLElement | null,
  parent: Maybe<HTMLElement>,
) => {
  let node = element;

  if (!parent) return false;

  while (node != null) {
    if (node === parent) {
      return true;
    } else {
      node = node.parentElement;
    }
  }

  return false;
};

/**
 * Executes a function within a view transition if supported by the browser.
 *
 * @param {VoidFunction} fn - The function to be executed.
 * @returns {ViewTransition} - The result of the executed function.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition | MDN: Document.startViewTransition}
 */
export const startViewTransitionSafety = (
  fn: VoidFunction,
  params?: { disabled?: boolean },
) => {
  if (document.startViewTransition && !params?.disabled) {
    return document.startViewTransition(fn);
  }
  fn();
};
