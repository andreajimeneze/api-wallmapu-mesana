export const responseUserStatusDTO = (res) => ({
    id_user_status: res.idUserStatus,
    status: res.status,
    created_at: res.created_at,
    updated_at: res.updated_at
})