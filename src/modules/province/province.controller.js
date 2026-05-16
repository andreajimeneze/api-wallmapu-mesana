import {
  internalServerResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import {
  getAllProvincesService,
} from "./province.service.js";
import { responseProvinceDTO } from "./province.dto.js";

export const getAllProvinces = async (req, res) => {
  try {
    const provinces = await getAllProvincesService();

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Provincias obtenidas exitosamente",
          data: provinces.map(responseProvinceDTO),
        }),
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({ message: "Error al obtener las provincias" }),
      );
  }
};

