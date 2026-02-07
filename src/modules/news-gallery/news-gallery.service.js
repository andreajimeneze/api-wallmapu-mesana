import { News_galleryModel } from "../../config/dbSequelize.js";

export const createGalleryNewsService = async ({id_news, alt, 
    img }) => {
    return await News_galleryModel.create({
        alt,
        img,
        id_news
    });
};

export const getGalleryByNewsService = async (id_news) => {
    return await News_galleryModel.findAll({
        where: { id_news},
        attributes: ['id_news_gallery', 'alt', 'img', 'id_news'],
        order: [['id_news_gallery', 'ASC']]
    });
};