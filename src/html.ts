import { blobToUrl } from './media';

/**
 * Вытаскивает RGB из любого цвета
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
