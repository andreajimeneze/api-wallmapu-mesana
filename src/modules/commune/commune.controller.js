import {
  internalServerResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import { responseCommuneDTO } from "./commune.dto.js";
import {
  getAllCommuneService,
} from "./commune.service.js";

export const getAllCommune = async (req, res) => {
  try {
    const communes = await getAllCommuneService();

    return res.status(200).json(
      succesGetResponse({
        message: "Comunas obtenidas exitosamente",
        data: communes.map(responseCommuneDTO),
      }),
    );
  } catch (error) {
      console.error(error);
    return res
      .status(500)
      .json(
        internalServerResponse({ error: error.message }),
      );
  }
};