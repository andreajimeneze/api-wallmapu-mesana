export const generateImageName = (prefix = 'image', ext = 'webp') => {
  return `${prefix}-${Date.now()}.${ext}`;
};
