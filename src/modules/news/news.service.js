import { NewsModel } from '../../config/dbSequelize.js';

export const getAllNewsService = async ({limit, offset}) => {
    return await NewsModel.findAndCountAll({
        limit,
        offset,
        order: [['date', 'DESC']]
    });
};

export const getOneNewsService = async (id) => {
    return await NewsModel.findByPk(id);
};

export const createNewsService = async (newsData) => {
    return await NewsModel.create({
        ...newsData,
        date: new Date()
    });
};

export const updateNewsService = async (id, newsData) => {
    const newsSelected = await NewsModel.findByPk(id);

    if(!newsSelected) return null;
    return await newsSelected.update(newsData);
};

export const deleteNewsService = async (id) => {
    const newsSelected = await NewsModel.findByPk(id);

     if(!newsSelected) return null;
     await newsSelected.destroy();
     return true;
};