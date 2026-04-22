export const responseUserStatusDTO = (res) => ({
    id_status: res.idUserStatus,
    name: res.status,
    created_at: res.created_at,
    updated_at: res.updated_at
})