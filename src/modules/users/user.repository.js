import { CommuneModel, UserModel, UserRoleModel, UserStatusModel } from "../../config/dbSequelize.js";

export const getAllUsersPaginationWithSearchRepository = async({page, limit, search}) => {
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
          { lastname: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } }
        ],
      }
    : {};
  
  const offset = (page - 1) * limit;

  const items = await UserModel.count({where});
  const result = await UserModel.findAll({
    where,
    include,
    limit,
    offset,
    distinct: true,
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

export const createUserRepository = async (user) => {
    return await UserModel.create({
        email: user.email,
        userRoleId: 3,
        userStatusId: 1,
        createdAt: now(),
        updatedAt: now(),
    });
};

export const updateUserRepository = async (id, userData) => {
    const userSelected = await UserModel.findByPk(id);

    if (!userSelected) return null;

    return await userSelected.update({
        ...userData
    });
};
