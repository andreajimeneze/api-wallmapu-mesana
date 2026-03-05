import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../shared/apiResponse.js";
import { editionResponseDTO } from "./edition.dto.js";
import {
  getAllEditionsService,
  getEditionByIdService,
} from "./edition.service.js";

export const getAllEditions = async (req, res) => {
  try {
    const allEditions = await getAllEditionsService();

    if (!allEditions || allEditions.length === 0) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Edición no encontrada" }));
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Lista de ediciones obtenida exitosamente",
        result: allEditions.map(editionResponseDTO),
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener el listado de ediciones",
      }),
    );
  }
};

export const getEditionById = async (req, res) => {
  const { id } = req.params;

  try {
    const searchedEdition = await getEditionByIdService(id);

    if (!searchedEdition) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Edición no encontrada" }));
    }

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Edición encontrada exitosamente",
          result: editionResponseDTO(searchedEdition),
        }),
      );
  } catch (error) {
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener la edición",
      }),
    );
  }
};
