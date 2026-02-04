import { createNewsGalleryDTO, newsGalleryResponseDTO } from "./news-gallery.dto.js";
import { createGalleryNewsService, getGalleryByNewsService } from "./news-gallery.service.js";

export const getGalleryByNews = async (req, res) => {
    try {
        const { news_id } = req.params;
        const gallery  = await getGalleryByNewsService(news_id);

        if(gallery.length === 0) {
            return res.status(404).json({message: "No existen imágenes en la galería"});
        }

        return res.status(200).json({ gallery: gallery.map(newsGalleryResponseDTO)})
    } catch(error) {
        res.status(500).json({error: "Error al obtener las imágenes de la galería"});
    }
};

export const createGalleryNews = async (req, res) => {
    try {
        const { news_id } = req.params;
        const { alt } = req.body;
        const url = req.imageFileName;
        await createGalleryNewsService(news_id, { alt, url });
       
        res.status(201).json({ message: "Imagen de galería creada exitosamente" });
    } catch(error) {
        console.error('Error al crear la imagen de la galería:', error);
        res.status(500).json({ error: 'Error al crear la imagen en la galería'})
    }
}