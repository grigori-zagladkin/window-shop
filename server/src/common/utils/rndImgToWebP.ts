import * as sharp from 'sharp';

export const generateWebPFromOtherImageFormat = (image: string) =>
  sharp(Buffer.from(image, 'base64'))
    .webp()
    .toBuffer()
    .then((data) => data.toString('base64'));
