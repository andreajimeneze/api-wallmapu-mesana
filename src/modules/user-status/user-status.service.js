import { findAllUserStatusRepository } from "./user-status.repository.js";

export const getUsersStatusService = async () => {
    return await findAllUserStatusRepository();
} ;