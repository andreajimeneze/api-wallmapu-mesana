import jwt from "jsonwebtoken";
import { getUserByEmailService,  createUserService} from "../users/user.service.js";
import { verifyToken } from "./google.service.js";
import { authResponseDTO } from "./auth.dto.js";
import { env } from "../../config/env.js";
import { isProfileComplete } from "../../helper/profileComplete.js";

export const loginWithGoogleService = async (googleToken) => {
   
  const googleUser = await verifyToken(googleToken);

  let user = await getUserByEmailService(googleUser.email);

  if (!user) {
    user = await createUserService({
      email: googleUser.email,
      username: googleUser.name,
      userRoleId: 3,
      userStatusId: 1
    });
    user = await getUserByEmailService(googleUser.email);

  } else {
    if(!user.username) {
      user.username = googleUser.name;
      await user.save();
    }
  }

  const token = jwt.sign(
    {
      id: user.idUser,
      email: user.email,
      role: user.userRole?.role,
    },
    env.jwt.jwt_secret,
    {
      expiresIn: "7d",
    },
  );

  const profileComplete = isProfileComplete(user) ?? false;
  console.log('Perfil completo?: ', profileComplete);
  return authResponseDTO({
    token,
    user: {
      id_user: user.idUser,
      email: user.email,
      username: user.username,
      picture: googleUser.picture,
      profileComplete,
      role: user.userRole?.role,
    },
  });
};
