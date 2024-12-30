import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Перевод значения в пикселях в rem строковое
 */
export const toRem = (px: number, remValue = 16) => `${px / remValue}rem`;

/**
 * classNames/clsx но с примесями tailwind-merge
 */
export const cx = (...args: Parameters<typeof clsx>) => twMerge(clsx(...args));
