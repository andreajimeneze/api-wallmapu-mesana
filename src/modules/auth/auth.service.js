import jwt from "jsonwebtoken";
import { getUserByEmailService,  createUserService} from "../users/user.service.js";
import { verifyToken } from "./google.service.js";
import { authResponseDTO } from "./auth.dto.js";
import { env } from "../../config/env.js";

export const loginWithGoogleService = async (googleToken) => {
  const googleUser = await verifyToken(googleToken);

  let user = await getUserByEmailService(googleUser.email);

  if (!user) {
    user = await createUserService({
      email: googleUser.email,
      name: googleUser.username,
      picture: googleUser.picture,
      profileComplete: false,
      userRoleId: 3,
      userStatusId: 1
    });
  }

  const token = jwt.sign(
    {
      id: user.id_user,
      email: user.email,
      role: user.role,
    },
    env.jwt.jwt_secret,
    {
      expiresIn: "7d",
    },
  );
  return authResponseDTO({
    token,
    user: {
      id_user: user.id_user,
      email: user.email,
      name: user.username,
      picture: user.picture,
      profileComplete: user.profileComplete,
      role: user.role,
    },
  });
};
