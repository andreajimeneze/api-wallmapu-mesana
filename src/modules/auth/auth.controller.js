import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import { loginWithGoogleService } from "./auth.service.js";


export const loginWithGoogle = async (req, res) => {
  const { googleToken } = req.body;

  try {
    if (!googleToken) {
      return res
        .status(400)
        .json(notFoundResponse({ message: "Token requerido" }));
    }

    const login = await loginWithGoogleService(googleToken);

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Logueo exitoso",
          result: login
        }),
      );
  } catch (error) {
    return res.status(400).json(
      internalServerResponse({
        message: error.message,
      }),
    );
  }
};
