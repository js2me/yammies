export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export const blobToUrl = (urlOrBlob: string | Blob) =>
  urlOrBlob instanceof Blob ? URL.createObjectURL(urlOrBlob) : urlOrBlob;

export const fileToBlob = (file: File) => {
  return new Blob([file], { type: file.type });
};

export const imageToBlob = (
  imageElement: HTMLImageElement,
  mimeType: string = 'image/png',
) => {
  const canvas = document.createElement('canvas');

  canvas.width = imageElement.naturalWidth || 300;
  canvas.height = imageElement.naturalHeight || 300;

  canvas.getContext('2d')!.drawImage(imageElement, 0, 0);

  const dataUri = canvas.toDataURL(mimeType, 1);
  const base64data = dataUri.split(',')[1];
  const base64MimeType = dataUri.split(';')[0].slice(5);

  const bytes = window.atob(base64data);
  const buf = new ArrayBuffer(bytes.length);
  const arr = new Uint8Array(buf);

  for (let i = 0; i < bytes.length; i++) {
    arr[i] = bytes.charCodeAt(i);
  }

  const blob = new Blob([arr], { type: base64MimeType });

  return blob;
};

/**
 * Загружает и отрисовывает изображение с использованием Image
 *
 * @returns {Promise<HTMLImageElement>}
 */
export const renderImage = (urlOrBlob: Blob | string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.src = blobToUrl(urlOrBlob);
    image.onload = () => resolve(image);
    image.onerror = () => reject();
  });
