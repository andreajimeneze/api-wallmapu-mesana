import { findAllUserStatusRepository, findUserStatusByIdRepository } from "./user-status.repository.js";

export const getUsersStatusService = async () => {
    return await findAllUserStatusRepository();
} ;

export const getUserStatusByIdService = async (id) => {
    return await findUserStatusByIdRepository(id);
};