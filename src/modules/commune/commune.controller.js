import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import { responseCommuneDTO } from "./commune.dto.js";
import {
  getAllCommuneService,
  getCommuneByIdService,
} from "./commune.service.js";

export const getAllCommune = async (req, res) => {
  try {
    const communes = await getAllCommuneService();

    if (!communes || communes.length === 0) {
      return res
        .status(200)
        .json(
          succesGetResponse({ message: "No hay comunas cargadas actualmente" }),
        );
    }

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

export const getCommuneById = async (req, res) => {
  const { id } = req.params;
  try {
    const commune = await getCommuneByIdService(id);

    if (!commune) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Comuna no existe" }));
    }

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Comuna obtenida exitosamente",
          data: responseCommuneDTO(commune),
        }),
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({ message: "No se pudo obtener la comuna" }),
      );
  }
};
