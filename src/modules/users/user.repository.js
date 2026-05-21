import { Op } from "sequelize";
import { CommuneModel, UserModel, UserRoleModel, UserStatusModel } from "../../config/dbSequelize.js";

export const getAllUsersPaginationWithSearchRepository = async ({ page, limit, search }) => {
    const include = [
        {
            model: CommuneModel,
            as: "commune",
            attributes: ["idCommune", "commune", "provinceId"],
        },
        {
            model: UserStatusModel,
            as: "userStatus",
            attributes: ["idUserStatus", "status"],
        },
        {
            model: UserRoleModel,
            as: "userRole",
            attributes: ["idUserRole", "role"],
        },
    ];

    const where = search
        ? {
            [Op.or]: [
                { username: { [Op.iLike]: `%${search}%` } },
                { userlastname: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } }
            ],
        }
        : {};

    const offset = (page - 1) * limit;

    const items = await UserModel.count({ where });
    const result = await UserModel.findAll({
        where,
        include,
        limit,
        offset,
        distinct: true,
        order: [['updated_at', 'DESC']]
    });

    return { count: items, rows: result };
};
export const findUserByIdRepository = async (id) => {
    return await UserModel.findByPk(id, {
        include: [
            {
                model: CommuneModel,
                as: "commune",
                attributes: ["idCommune", "commune"],
            },
            {
                model: UserStatusModel,
                as: "userStatus",
                attributes: ["idUserStatus", "status"],
            },
            {
                model: UserRoleModel,
                as: "userRole",
                attributes: ["idUserRole", "role"],
            },
        ],
    });
};
export const findUserByEmailRepository = async (email) => {
    return await UserModel.findOne({
        where: { email },
        include: [
            {
                model: CommuneModel,
                as: "commune",
                attributes: ["idCommune", "commune", "provinceId"],
            },
            {
                model: UserStatusModel,
                as: "userStatus",
                attributes: ["idUserStatus", "status"],
            },
            {
                model: UserRoleModel,
                as: "userRole",
                attributes: ["idUserRole", "role"],
            },
        ],
    });
};
export const createUserRepository = async (user, options = {}) => {
    return await UserModel.create({
        email: user.email,
        userRoleId: 3,
        userStatusId: 1
    }, options);
};
export const updateUserRepository = async (id, userData, options = {}) => {
    const [count, updatedUsers] = await UserModel.update(
        userData ,
        {
            where: {
                idUser: id
            }, ...options, returning: true
        }
    );
    if (count === 0) return null;

    console.log('updatedUsers: ', updatedUsers)
    return updatedUsers[0];

    //return updatedUser;
};
