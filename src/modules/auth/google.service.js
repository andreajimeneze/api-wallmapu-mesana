import { OAuth2Client } from "google-auth-library";
import { env } from "../../config/env.js";

const client = new OAuth2Client(env.google.google_id);

export const verifyToken = async (googleToken) => {
  try {
    const responseGoogle = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${googleToken}`,
        },
      },
    );

    if (!responseGoogle.ok) {
      throw new Error("Token inválido");
    }

    const dataGoogle = await responseGoogle.json();

    if (!dataGoogle) {
      throw new Error("Email no verificado");
    }

    return {
      googleId: dataGoogle.sub,
      email: dataGoogle.email,
      name: dataGoogle.name,
      picture: dataGoogle.picture,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error al intentar validar el token");
  }
};
