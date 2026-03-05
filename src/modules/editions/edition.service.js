import { BookModel, EditionModel, EditorialModel } from "../../config/dbSequelize.js";

export const getAllEditionsService = async () => {
    return await EditionModel.findAll({
        include: [
            {
                model: BookModel,
                as: 'book'
            },
            {
                model: EditorialModel,
                as: 'editorial'
            }
        ]
    });
};

export const getEditionByIdService = async (id) => {
    return await EditionModel.findByPk(id, {
         include: [
            {
                model: BookModel,
                as: 'book'
            },
            {
                model: EditorialModel,
                as: 'editorial'
            }
        ]
    })
};