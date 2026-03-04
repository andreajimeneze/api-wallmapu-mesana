export const responseUserRoleDTO = (res) => ({
    id_user_role: res.idUserRole,
    role: res.role,
    created_at: res.created_at,
    updated_at: res.updated_at
})