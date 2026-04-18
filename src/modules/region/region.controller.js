import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import { responseRegionDTO } from "./region.dto.js";
import {
  getAllRegionsService,
  getRegionByIdService,
} from "./region.service.js";

export const getAllRegions = async (req, res) => {
  try {
    const regions = await getAllRegionsService();

    if (!regions || regions.length === 0) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "No hay regiones actualmente" }));
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Regiones obtenidas exitosamente",
        data: regions.map(responseRegionDTO),
      }),
    );
  } catch (error) {
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener las regiones",
      }),
    );
  }
};

export const getRegionById = async (req, res) => {
  const { id } = req.params;

  try {
    const region = await getRegionByIdService(id);

    if (!region) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "No existen regiones actualmente" }));
    }

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Región obtenida exitosamente",
          data: responseRegionDTO(region),
        }),
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar obtener las regiones",
        }),
      );
  }
};
