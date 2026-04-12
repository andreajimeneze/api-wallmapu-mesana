import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../shared/apiResponse.js";
import {
  editorialResponseDTO,
  createEditorialResponseDTO,
  baseEditorialDTO,
} from "./editorial.dto.js";
import {
  createEditorialService,
  getAllEditorialsService,
  getEditorialByIdService,
  updateEditorialService,
} from "./editorial.service.js";

export const getAllEditorials = async (req, res) => {
  try {
    const editorials = await getAllEditorialsService();
   
    if (!editorials || editorials.length === 0) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "No hay editoriales cargadas" }));
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Editoriales obtenidas exitosamente",
        result: editorials.map(editorialResponseDTO),
      }),
    );
  } catch (error) {
    console.error(error)
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener las editoriales",
      }),
    );
  }
};

export const getEditorialById = async (req, res) => {
  const { id } = req.params;

  try {
    const editorial = await getEditorialByIdService(id);

    if (!editorial) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Editorial no encontrada" }));
    }

    return res
      .status(200)
      .json(succesGetResponse({ message: "Editorial obtenida exitosamente", result: baseEditorialDTO(editorial) }));
  } catch (error) {
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener la editorial",
      }),
    );
  }
};

export const updateEditorial = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const editorial = await getEditorialByIdService(id);

    if (!editorial) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Editorial no encontrada" }));
    }

    const updatedEditorial = await updateEditorialService(id, {
      editorial: name
    });

    return res.status(202).json(
      succesGetResponse({
        message: "Editorial editada correctamente",
        result: updatedEditorial,
      }),
    );
  } catch (error) {
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar editar editorial",
      }),
    );
  }
};

export const createEditorial = async (req, res) => {
  const { name } = req.body;

  try {
    const dto = createEditorialResponseDTO(name);
    const createdEditorial = await createEditorialService({ dto });

    return res
      .status(201)
      .json(
        succesGetResponse({
          message: "Editorial creada exitosamente",
          result: createdEditorial,
        }),
      );
  } catch (error) {
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar crear una editorial",
      }),
    );
  }
};
