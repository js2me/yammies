export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export const fileToBlob = (file: File) => {
  return new Blob([file], { type: file.type });
};

export const renderImage = (blobOrUrl: Blob | string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.src =
      blobOrUrl instanceof Blob ? URL.createObjectURL(blobOrUrl) : blobOrUrl;
    image.onload = () => resolve(image);
    image.onerror = () => reject();
  });
