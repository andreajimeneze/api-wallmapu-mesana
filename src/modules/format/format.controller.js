import { badRequestResponse, conflictResponse, internalServerResponse, notFoundResponse, succesGetResponse, successCreateResponse, successUpdateResponse } from "../../core/responses/apiResponse.js";
import { formatResponseDTO, updateFormatDTO } from "./format.dto.js";
import { createFormatService, deleteFormatService, getAllFormatsPaginationService, getAllFormatssService, getFormatByIdService, updateFormatService } from "./format.service.js";

export const getAllFormatsPagination = async (req, res) => {
  try {
    let page = parseInt(req.query.page ?? 1);
    let limit = parseInt(req.query.limit ?? 10);

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return res.status(400).json(
        badRequestResponse({
          message: "El número de página o items debe ser mayor a 0",
        }),
      );
    }

    const result = await getAllFormatsPaginationService
      ({
        page,
        limit,
        search: req.query.search ?? "",
      });

    return res.status(200).json(
      succesGetResponse({
        message: "Formatos obtenidos exitosamente",
        data: result.data,
      }),
    );
  } catch (error) {
    console.error('ERROR FORMAT CONTROLLER', error);
    return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener los descriptores' }));
  }
};

export const getAllFormats = async (req, res) => {
  try {
    const formats = await getAllFormatssService();

    return res.status(200).json(
      succesGetResponse({
        message: "Formatos obtenidos existosamente",
        data: formats.map(formatResponseDTO),
      }),
    );
  } catch (error) {
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener los formatos",
      }),
    );
  }
};

export const getFormatById = async (req, res) => {
  const { id } = req.params;

  try {
    const format = await getFormatByIdService(id);

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Formato obtenido con éxito",
          data: formatResponseDTO(format),
        }),
      );
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res
        .status(404)
        .json(
          notFoundResponse({
            message: error.message,
          }),
        );
    }
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar obtener el formato",
        }),
      );
  }
};

export const createFormat = async (req, res) => {
  const { name } = req.body;

  try {
    const format = await createFormatService(name);
console.log('format create: ', format)
    res.status(201).json(
      successCreateResponse({
        message: "Formato creado exitosamente",
        data: formatResponseDTO(format),
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 409) {
      return res
        .status(409)
        .json(
          conflictResponse({
            message: error.message,
          }),
        );
    }
    res.status(500).json(internalServerResponse({
      message: "Error al crear el formato",
    }),
    );
  }
}
export const updateFormat = async (req, res) => {
  const { id } = req.params;

  const formatDTO = updateFormatDTO(req.body);

  try {
    const updatedFormat = await updateFormatService(id, formatDTO);

    res.status(202).json(
      successUpdateResponse({
        message: "Formato actualizado exitosamente",
        data: formatResponseDTO(updatedFormat),
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 409) {
      return res
        .status(409)
        .json(
          conflictResponse({
            message: error.message,
          }),
        );
    }
    if (error.status === 404) {
      return res
        .status(404)
        .json(
          notFoundResponse({
            message: error.message,
          }),
        );
    }
    res.status(500).json(internalServerResponse({
      message: "Error al actualizar el formato",
    }),
    );
  }
};

export const deleteFormat = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFormat = await deleteFormatService(id);

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Formato eliminado exitosamente",
        }),
      );
  } catch (error) {
    console.error(error);
    if (error.status === 409) {
      return res
        .status(409)
        .json(
          conflictResponse({
            message: error.message,
          }),
        );
    }
    if (error.status === 404) {
      return res
        .status(404)
        .json(
          notFoundResponse({
            message: error.message,
          }),
        );
    }
    res.status(500).json(internalServerResponse({
      message: "Error al actualizar el formato",
    }),
    );
  }
};
