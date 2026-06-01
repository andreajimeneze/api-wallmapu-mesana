import { Op } from "sequelize";
import { CommuneModel, UserModel, UserRoleModel, UserStatusModel } from "../../config/dbSequelize.js";

export const getAllUsersPaginationWithSearchRepository = async ({ page, limit, search }) => {
    const include = [
        {
            model: CommuneModel,
            as: "commune",
            attributes: ["idCommune", "name", "provinceId"],
        },
        {
            model: UserStatusModel,
            as: "userStatus",
            attributes: ["idUserStatus", "name"],
        },
        {
            model: UserRoleModel,
            as: "userRole",
            attributes: ["idUserRole", "name"],
        },
    ];

    const where = search
        ? {
            [Op.or]: [
                { name: { [Op.iLike]: `%${search}%` } },
                { lastname: { [Op.iLike]: `%${search}%` } },
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
                attributes: ["idCommune", "name"],
            },
            {
                model: UserStatusModel,
                as: "userStatus",
                attributes: ["idUserStatus", "name"],
            },
            {
                model: UserRoleModel,
                as: "userRole",
                attributes: ["idUserRole", "name"],
            },
        ],
    });
};
export const findUserByEmailRepository = async (email) => {
    return await UserModel.findOne({
        where: { email: email },
        include: [
            {
                model: CommuneModel,
                as: "commune",
                attributes: ["idCommune", "name", "provinceId"],
            },
            {
                model: UserStatusModel,
                as: "userStatus",
                attributes: ["idUserStatus", "name"],
            },
            {
                model: UserRoleModel,
                as: "userRole",
                attributes: ["idUserRole", "name"],
            },
        ],
    });
};
export const createUserRepository = async (user, options = {}) => {
    return await UserModel.create({
        email: user.email,
        name: user.name,
        userRoleId: 3,
        userStatusId: 1
    }, options);
};
export const updateUserRepository = async (id, userData, options = {}) => {
  await UserModel.update(userData, {
    where: { idUser: id },
    ...options,
  });

  return await UserModel.findByPk(id);
};