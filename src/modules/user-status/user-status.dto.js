export const responseUserStatusDTO = (res) => ({
    id_user_status: res.idUserStatus,
    name: res.name,
    created_at: res.created_at,
    updated_at: res.updated_at
})