import {
  internalServerResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import { responseRegionDTO } from "./region.dto.js";
import {
  getAllRegionsService,
} from "./region.service.js";

export const getAllRegions = async (req, res) => {
  try {
    const regions = await getAllRegionsService();

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

