import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import {
  getAllProvincesService,
  getProvinceByIdService,
} from "./province.service.js";
import { responseProvinceDTO } from "./province.dto.js";

export const getAllProvinces = async (req, res) => {
  try {
    const provinces = await getAllProvincesService();

    if (!provinces || provinces.length === 0) {
      return res
        .status(200)
        .json(
          succesGetResponse({
            message: "No hay provincias cargadas actualmente",
          }),
        );
    }

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

export const getProvinceById = async (req, res) => {
  const { id } = req.params;

  try {
    const province = await getProvinceByIdService(id);

    if (!province) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Provincia no encontrada" }));
    }

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Provincia obtenida exitosamente",
          data: responseProvinceDTO(province),
        }),
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({ message: "Error al obener la provincia" }),
      );
  }
};
