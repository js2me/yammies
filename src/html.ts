/**
 * Вытаскивает rgb из цвета
 */
export const getComputedColor = (color?: string): string | null => {
  if (!color) return null;

  const d = document.createElement('div');
  d.style.color = color;
  document.body.appendChild(d);
  const rgbcolor = window.getComputedStyle(d).color;
  const match =
    /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[.d+]*)*\)/g.exec(rgbcolor);

  if (!match) return null;

  return `${match[1]}, ${match[2]}, ${match[3]}`;
};

export const downloadUsingAnchor = (
  urlOrBlob: string | Blob,
  fileName?: string,
) => {
  const url =
    typeof urlOrBlob === 'string' ? urlOrBlob : URL.createObjectURL(urlOrBlob);

  const a = document.createElement('a');
  a.href = url;
  if (fileName) {
    a.download = fileName;
  }
  a.target = '_blank';

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
};

/**
 * Surrounds string in an anchor tag
 */
export function wrapTextToTagLink(link: string) {
  const descr = String(link).replace(/^(https?:[/]{0,2})?([w]{3}[.])?/, 'www.');
  if (!/^https?:[/]{2}/.test(link)) link = `http://${link}`;
  return `<a href=${link} target="_blank">${descr}</a>`;
}
