import { NewsGalleryModel } from "../../config/dbSequelize.js";

export const findNewsGalleryByNewsRepository = async (newsId, options = {}) => {
    return await NewsGalleryModel.findAll({
        where: {
            newsId
        },
        order: [["idNewsGallery", "ASC"]],
        ...options
    });
};
export const findImageByIdGalleryRepository = async (id) => {
    return await NewsGalleryModel.findByPk(id);
};
export const createGalleryRepository = async (galleryData, options = {}) => {
    return await NewsGalleryModel.create(galleryData, options);
};
export const deleteGalleryByIdRepository = async (id, options = {}) => {
    return await NewsGalleryModel.destroy({
        where: {
            idNewsGallery: id
        },
        ...options
    });
};
export const deleteGalleryByNewsIdRepository = async (newsId, options = {}) => {
    return await NewsGalleryModel.destroy({
        where: { newsId },
        ...options
    });
};