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