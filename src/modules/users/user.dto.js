import { responseCommuneDTO } from "../commune/commune.dto.js";
import { responseUserRoleDTO } from "../user-role/user-role.dto.js";
import { responseUserStatusDTO } from "../user-status/user-status.dto.js";

export const baseUserDTO = (user) => ({
    id_user: user.idUser,
    name: user.name,
    lastname: user.lastname,
    email: user.email
});

export const userResponseDTO = (user) => ({
    id_user: user.idUser,
    name: user.name ?? '',
    lastname: user.lastname ?? '',
    email: user.email ?? '',
    rut: user.rut ?? '',
    address: user.address ?? '',
    commune_id: user.communeId ?? 0,
    phone: user.phoneNumber ?? '',
    user_role_id: user.userRoleId,
    user_status_id: user.userStatusId,
    created_at: user.createdAt,
    updated_at: user.updatedAt
});

export const userCompleteResponseDTO = (user) => ({
    id_user: user.idUser,
    name: user.name ?? '',
    lastname: user.lastname ?? '',
    email: user.email ?? '',
    rut: user.rut ?? '',
    address: user.address ?? '',
    commune_id: user.communeId ?? 0,
    phone: user.phoneNumber ?? '',
    user_role_id: user.userRoleId,
    user_status_id: user.userStatusId,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
    user_role_name: user.userRole?.name ?? '',
    user_status_name: user.userStatus?.name ?? ''
});


export const updateUserDTO = (data) => ({
  name: data.name,
  lastname: data.lastname,
  rut: data.rut,
  address: data.address,
  phoneNumber: data.phone,
  email: data.email,
  communeId: data.commune_id,
});

export const updateUserByAdminDTO = (data) => ({
  idUser: data.id_user,
  name: data.name,
  lastname: data.lastname,
  rut: data.rut,
  address: data.address,
  phoneNumber: data.phone,
  communeId: data.commune_id,
  userRoleId: data.user_role_id,
  userStatusId: data.user_status_id
});


