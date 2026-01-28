import { News_galleryModel } from "../../config/dbSequelize.js";

export const getGalleryByNewsService = async (news_id) => {
    return await News_galleryModel.findAll({
        where: { news_id},
        attributes: ['id_news_gallery', 'alt', 'url'],
        order: [['id_news_gallery', 'ASC']]
    });
};

export const createGalleryNewsService = async (news_id, {alt, url}) => {
    return await News_galleryModel.create({
        alt,
        url,
        news_id
    });
};