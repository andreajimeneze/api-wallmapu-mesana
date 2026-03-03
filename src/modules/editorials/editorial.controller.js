import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../shared/apiResponse.js";
import {
  editorialResponseDTO,
  createEditorialResponseDTO,
} from "./editorial.dto.js";
import {
  createEditorialService,
  getAllEditorialsService,
  getEditorialByIdService,
  getEditorialsPaginationService,
  updateEditorialService,
} from "./editorial.service.js";

export const getEditorialsPagination = async (req, res) => {
  let page = parseInt(req.query.page ?? 1);
  let items = parseInt(req.query.items ?? 10);

  if (isNaN(page) || page < 1 || isNaN(items) || items < 1) {
    return res.status(400).json(
      badRequestResponse({
        message: "El número de página o items debe ser mayor a 0",
      }),
    );
  }

  try {
    const result = await getEditorialsPaginationService({
      page,
      limit: items,
      search: req.query.search ?? "",
    });

    return res.status(200).json(
      succesGetResponse({
        message: "Editoriales obtenidas exitosamente",
        result: result.result,
      }),
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({ message: "Error al obtener las editoriales" }),
      );
  }
};

export const getAllEditorials = async (req, res) => {
  try {
    const editorials = await getAllEditorialsService();

   
    if (!editorials || !editorials.length > 0) {
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
    const editorialSearched = await getEditorialByIdService(id);

    if (!editorialSearched) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Editorial no encontrada" }));
    }

    return res
      .status(200)
      .json(succesGetResponse({ message: "Editorial obtenida exitosamente" }));
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
    const searchedEditorial = getEditorialById(id);

    if (!searchedEditorial) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Editorial no encontrada" }));
    }

    const updatedEditorial = await updateEditorialService(id, {
      editorial: name || searchedEditorial.editorial,
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
