export const authResponseDTO = (auth) => ({
    accessToken: auth.accessToken, 
    //refreshToken: auth.refreshToken,
    user: {
        id_user: auth.user.id_user,
        email: auth.user.email,
        name: auth.user.username,
        picture: auth.user.picture,
        profileComplete: auth.user.profileComplete,
        role: auth.user.role
    }

})