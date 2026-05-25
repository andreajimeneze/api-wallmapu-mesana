import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import {
  editorialResponseDTO,
  baseEditorialDTO,
} from "./editorial.dto.js";
import {
  createEditorialService,
  getAllEditorialsService,
  getAllEditorialsWithPaginationService,
  getEditorialByIdService,
  updateEditorialService,
} from "./editorial.service.js";

export const getAllEditorialsWithPagination = async (req, res) => {
  let page = parseInt(req.query.page ?? 1);
    let limit = parseInt(req.query.limit ?? 10);

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return res.status(400).json(
        badRequestResponse({
          message: "El número de página o items debe ser mayor a 0",
        }),
      );
    }

  try {
    const editorials = await getAllEditorialsWithPaginationService({
      page,
      limit,
      search: req.query.search ?? "",
    });
   
      return res.status(200).json(
      succesGetResponse({
        resource: "Editoriales",
        data: editorials.data,
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener las editoriales",
      }),
    );
  }
};

export const getAllEditorials = async (req, res) => {
  try {
    const editorial = await getAllEditorialsService();

    return res
      .status(200)
      .json(succesGetResponse({ resource: "Editorial", data: editorial.map(editorialResponseDTO) }));
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener la editorial",
      }),
    );
  }
};
export const getEditorialById = async (req, res) => {
  const { id } = req.params;

  try {
    const editorial = await getEditorialByIdService(id);

    return res
      .status(200)
      .json(succesGetResponse({ resource: "Editorial", data: baseEditorialDTO(editorial) }));
  } catch (error) {
    console.error(error);
    if(error.status = 404) {
      return res.status(404).json(notFoundResponse({message: error.message}));
    }
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener las editoriales",
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
        resource: "Editorial",
        data: updatedEditorial,
      }),
    );
  } catch (error) {
    console.error(error);
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
    const createdEditorial = await createEditorialService( name );

    return res
      .status(201)
      .json(
        succesGetResponse({
          resource: "Editorial",
          data: editorialResponseDTO(createdEditorial),
        }),
      );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar crear una editorial",
      }),
    );
  }
};
