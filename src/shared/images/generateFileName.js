export const generateFileName = (prefix = 'image', ext = 'webp') => {
  return `${prefix}-${Date.now()}.${ext}`;
};
