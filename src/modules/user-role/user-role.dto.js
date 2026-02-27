export const responseUserRoleDTO = (res) => ({
    id_user_role: res.idUserRole,
    role: res.role,
    created_at: res.createdAt,
    updated_at: res.updatedAt
})