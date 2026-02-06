import fs from 'fs/promises';
import path from 'path';

export const saveImageFile = async (baseDir, folder, filename, buffer) => {
  const outputDir = path.join(baseDir, 'public/images', folder);
  await fs.mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, filename);
  await fs.writeFile(outputPath, buffer);

  return outputPath;
};
