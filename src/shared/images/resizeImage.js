import sharp from "sharp";

export const resizeImage = async (
  buffer,
  {
    width,
    heigth,
    ratio,
    fit = "cover",
    allowEnlargement = true,
    quality = 90,
  },
) => {
  const image = sharp(buffer);
  const metadata = await image.metadata();

  let targetWidth = width;
  let targetHeight = heigth;

  if (ratio && (!width || !heigth)) {
    if (width) targetHeight = Math.round(width / ratio);
    if (heigth) targetWidth = Math.round(heigth * ratio);
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
