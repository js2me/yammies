import { customAlphabet } from 'nanoid';

const DIGITS = '0123456789';
const LATIN_CHARS = 'abcdefghijklmnopqrstuvwxyz';

const ALPHABET = `${LATIN_CHARS}${DIGITS}`;

export const generateId = customAlphabet(ALPHABET, 6);

export const generateShortId = customAlphabet(ALPHABET, 4);

export const generateNumericId = customAlphabet(`${DIGITS}`, 6);

export const generateNumericShortId = customAlphabet(`${DIGITS}`, 4);

export const createLinearNumericIdGenerator = (size: number = 9) => {
  let lastCount = 0;
  return () => {
    return (lastCount++).toString().padStart(size, '0');
  };
};

export const generateLinearNumericId = createLinearNumericIdGenerator();
