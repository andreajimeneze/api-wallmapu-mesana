export const isProfileComplete = (user) => {
    return Boolean(
        user.name &&
        user.lastname &&
        user.rut &&
        user.address &&
        user.communeId &&
        user.phoneNumber
    )
}