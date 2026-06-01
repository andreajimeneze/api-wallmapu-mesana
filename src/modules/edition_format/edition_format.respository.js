import { EditionFormatModel } from "../../config/dbSequelize.js";


export const findOneEditionFormatByFormatIdRepository = async (idFormat) => {
    return await EditionFormatModel.findOne({
        where: { idFormat: idFormat }
    });
};

export const bulkCreateEditionFormatRepository = async (data, options = {}) => {

    return await EditionFormatModel.bulkCreate(data, options);
};

export const deleteEditionFormatRepository = async (idEdition, idFormat, options = {}) => {
    return await EditionFormatModel.destroy({
        where: {
            idEdition: idEdition,
            idFormat: idFormat
        }, ...options
    });
};

export const deleteEditionFormatByIdEditionRepository = async (idEdition, options = {}) => {
    return await EditionFormatModel.destroy({
        where: {
            idEdition: idEdition
        },
        ...options
    });
};