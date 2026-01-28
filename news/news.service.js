import { NewsModel } from '../config/dbSequelize.js';

export const getAllNewsService = async () => {
    return await NewsModel.countAndFindAll({
        order: [['date', 'DESC']]
    });
};

export const createNewsService = async () => {
    return await NewsModel.create({
        ...newsData,
        date: new Date()
    });
};