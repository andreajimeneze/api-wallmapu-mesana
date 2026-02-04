import sharp from "sharp";
import fs from "fs";
import path from "path";

export const processImage = (folder ) => {
    return async (req, res, next) => {
        try {
            if(!req.file) return next();
        
        const outputDir = path.join(process.cwd(), 'public/images', folder);
       
        fs.mkdirSync(outputDir, { recursive: true });

        const fileName = `image-${Date.now()}.webp`;
        const outputPath = path.join(outputDir, fileName);

        await sharp(req.file.buffer)
        .resize(800, 800, {
            fit: 'cover'
        })
        .toFormat('webp', { quality: 90 })
        .toFile(outputPath);

        req.imageFileName = fileName;
        next();
        } catch(error) {
            console.error("Error al procesar la imagen:", error);
            res.status(500).json({ message: "Error al procesar la imagen" });
        }

    }};
    