/**
 * Перевод значения в пикселях в rem строковое
 */
export const toRem = (px: number, remValue = 16) => `${px / remValue}rem`;
