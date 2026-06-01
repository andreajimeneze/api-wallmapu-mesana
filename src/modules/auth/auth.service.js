import jwt from "jsonwebtoken";
import { getUserByEmailService,  createUserService} from "../users/user.service.js";
import { verifyToken } from "./google.service.js";
import { authResponseDTO } from "./auth.dto.js";
import { env } from "../../config/env.js";
import { isProfileComplete } from "./utils/profileComplete.js";

export const loginWithGoogleService = async (googleToken) => {
   
  const googleUser = await verifyToken(googleToken);

  let user = await getUserByEmailService(googleUser.email);
 console.log('user googleUser: ', user);
  if (!user) {
    user = await createUserService({
      email: googleUser.email,
      name: googleUser.name,
      userRoleId: 3,
      userStatusId: 1
    });
    user = await getUserByEmailService(googleUser.email);

  } else {
    if(!user.name) {
      user.name = googleUser.name;
      await user.save();
    }
  }

  const token = jwt.sign(
    {
      sub: user.idUser,
      role: user.userRole?.name,
    },
    env.jwt.jwt_secret,
    {
      expiresIn: "1d"   
    },
  );

  const profileComplete = isProfileComplete(user) ?? false;
  
  return authResponseDTO({
    token,
    user: {
      id_user: user.idUser,
      email: user.email,
      name: user.name,
      picture: googleUser.picture,
      profileComplete,
      role: user.userRole?.name,
    },
  });
};
