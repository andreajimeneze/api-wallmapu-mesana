export const responseUserStatusDTO = (res) => ({
    id_user_status: res.idUserStatus,
    status: res.status,
    created_at: res.createdAt,
    updated_at: res.updatedAt
})