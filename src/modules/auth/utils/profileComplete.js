export const isProfileComplete = (user) => {
    return Boolean(
        user.username &&
        user.userlastname &&
        user.rut &&
        user.address &&
        user.communeId &&
        user.phoneNumber
    )
}