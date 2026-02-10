import sharp from "sharp";

export const resizeImage = async (
  buffer,
  {
    width,
    height,
    ratio,
    fit,
    allowEnlargement = true,
    quality
  },
) => {
  const image = sharp(buffer);
  const metadata = await image.metadata();

  let targetWidth = width;
  let targetHeight = height;

  if (ratio && (!width || !height)) {
    if (width) targetHeight = Math.round(width / ratio);
    if (height) targetWidth = Math.round(height * ratio);
  }

  const shouldEnLarge =
    allowEnlargement &&
    (metadata.width < targetWidth || metadata.height < targetHeight);

    return image
    .resize(targetWidth, targetHeight, {
      fit,
      withoutEnlargement: !shouldEnLarge,
    })
    .webp({ quality })
    .toBuffer();
};
