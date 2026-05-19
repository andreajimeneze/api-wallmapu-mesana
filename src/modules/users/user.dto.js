import { responseCommuneDTO } from "../commune/commune.dto.js";
import { responseUserRoleDTO } from "../user-role/user-role.dto.js";
import { responseUserStatusDTO } from "../user-status/user-status.dto.js";

export const baseUserDTO = (user) => ({
    id_user: user.idUser,
    name: user.username,
    lastname: user.userlastname,
    email: user.email
});

export const userResponseDTO = (user) => ({
    id_user: user.idUser,
    name: user.username,
    lastname: user.userlastname,
    email: user.email,
    rut: user.rut,
    address: user.address,
    commune_id: user.communeId,
    phone: user.phoneNumber,
    user_role_id: user.userRoleId,
    user_status_id: user.userStatusId,
    created_at: user.created_at,
    updated_at: user.updated_at
});

export const userCompleteResponseDTO = (user) => ({
    id_user: user.idUser,
    name: user.username,
    lastname: user.userlastname,
    email: user.email,
    rut: user.rut,
    address: user.address,
    commune_id: user.communeId,
    phone: user.phoneNumber,
    user_role_id: user.userRoleId,
    user_status_id: user.userStatusId,
    created_at: user.created_at,
    updated_at: user.updated_at,
    user_role_name: user.userRole.role,
    user_status_name: user.userStatus.status
});

export const updateUserDTO = (data) => ({
  idUser: data.id_user,
  name: data.name,
  lastname: data.lastname,
  rut: data.rut,
  address: data.address,
  phone: data.phone,
  emaill: data.email,
  communeId: data.commune_id,
  userRoleId: data.user_role_id,
  userStatusId: data.user_status_id
});


