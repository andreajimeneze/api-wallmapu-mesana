export const userResponseDTO = (user) => ({
    id_user: user.idUser,
    username: user.username,
    userlastname: user.userlastname,
    rut: user.rut,
    address: user.address,
    commune_id: user.communeId,
    phoneNumber: user.phone_number,
    user_role_id: user.userRoleId,
    user_status_id: user.userStatusId,
    created_at: user.createdAt,
    updated_at: user.updatedAt
})