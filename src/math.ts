export function degToRad(deg: number) {
  return deg * (Math.PI / 180.0);
}
export function radToDeg(rad: number) {
  return rad * (180.0 / Math.PI);
}

export const percentFrom = (num: Maybe<number>, from: Maybe<number>) => {
  return ((num || 0) / (from || 0)) * 100 || 0;
};
