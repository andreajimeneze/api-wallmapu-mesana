import {
  internalServerResponse,
  successCreateResponse,
} from "../../core/responses/apiResponse.js";
import {
  createCoverImageService,
  deleteCoverImageService,
} from "./edition_image.service.js";

export const createCoverImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ message: "No se envió ninguna imagen" });
    }
    const coverImage = await createCoverImageService(req.file);

    return res.status(201).json(
      successCreateResponse({
        message: "Portada creada exitosamente",
        result: coverImage,
      }),
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        internalServerResponse({ message: "Error al intentar crear portada" }),
      );
  }
};

export const deleteCoverImage = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteCoverImageService(id);

    return res.status(202).json({ message: "Portada eliminada correctamente", result: result  });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({
        message: error.message || "Error al intentar eliminar la portada",
      });
  }
};
