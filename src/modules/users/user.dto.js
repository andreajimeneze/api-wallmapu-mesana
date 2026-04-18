export const baseUserDTO = (user) => ({
    id_user: user.idUser,
    user_name: user.username,
    user_lastname: user.userlastname,
    user_email: user.email
});

export const userResponseDTO = (user) => ({
    id_user: user.idUser,
    user_name: user.username,
    user_lastname: user.userlastname,
    user_email: user.email,
    rut: user.rut,
    address: user.address,
    commune_id: user.communeId,
    phone: user.phoneNumber,
    user_role_id: user.userRoleId,
    user_status_id: user.userStatusId,
    created_at: user.created_at,
    updated_at: user.updated_at,
    role: user.userRole?.role
});