export const generateFileName = (prefix = 'image', id, ext = 'webp') => {
  const shortDate = Date.now().toString(36);
  return `${id}-${prefix}-${shortDate}.${ext}`;
};
