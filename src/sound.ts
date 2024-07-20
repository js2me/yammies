export const playSound = async (
  file: string,
  { volume = 1 }: { volume?: number } = {},
) => {
  let audio = new Audio(file);
  audio.volume = volume;
  audio.muted = !volume;
  await audio.play();
  audio.remove();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  audio = null;
};
