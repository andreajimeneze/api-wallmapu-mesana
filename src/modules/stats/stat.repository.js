import { Op } from "sequelize";
import {
    AuthorModel,
    BookModel,
    CommuneModel,
    CopyModel,
    EditorialModel,
    LoanModel,
    NewsModel,
    ProvinceModel,
    RegionModel,
    ReservationModel,
    SubjectModel,
    UserModel,
} from "../../config/dbSequelize.js";

export const findAllStatesAdminRepository = async () => {
    const [
        users,
        news,
        books,
        loans,
        reservations
    ] = await Promise.all([
        UserModel.count(),
        NewsModel.count(),
        BookModel.count(),
        LoanModel.count(),
        ReservationModel.count()
    ]);

    return {
        users,
        news,
        books,
        loans,
        reservations
    };
};

export const findAllAdminRepository = async () => {
    const [
        users,
        news,
        authors,
        editorials,
        books,
        communes,
        provinces,
        regions,
        subjects

    ] = await Promise.all([
        UserModel.count(), 
        NewsModel.count(),
        AuthorModel.count(),
        EditorialModel.count(),
        BookModel.count(),
        CommuneModel.count(),
        ProvinceModel.count(),
        RegionModel.count(),
        SubjectModel.count()
    ]);

    return {
        users,
        news,
        authors,
        editorials,
        books,
        communes,
        provinces,
        regions,
        subjects
    };
};


export const findAllUseRepository = async (userId) => {
    const [
        historicLoans,
        activeLoans,
        overdueLoans,
    ] = await Promise.all([
        LoanModel.count({
            where: {
                userId,
                loanStatusId: {
                    [Op.in]: [1, 2, 3]
                }
            }
        }),
        LoanModel.count({
            where: {
                userId,
                loanStatusId: 1
            }
        }),
        LoanModel.count({
            where: {
                userId,
                loanStatusId: 3
            }
        })
    ]);

    return {
        historicLoans,
        activeLoans,
        overdueLoans
    };
};
