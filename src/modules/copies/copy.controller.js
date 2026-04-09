import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
  successDeleteResponse,
  successUpdateResponse,
} from "../../shared/apiResponse.js";
import { copyResponseDTO, copyJoinResponseDTO, copyByBookResponseDTO } from "./copy.dto.js";
import {
  getAllCopiesService,
  getCopyByEditionIdService,
  createCopyService,
  updateCopyService,
  deleteCopyService,
  getAllCopiesByBookService,
} from "./copy.service.js";

export const getAllCopies = async (req, res) => {
  try {
    const allCopies = await getAllCopiesService();
    
    if (!allCopies || allCopies.length === 0) {
      return res.status(404).json(
        notFoundResponse({
          message: "No existen copias cargadas actualmente",
        }),
      );
    };

    console.log("all copies en controller para admin: ", allCopies.map(copyJoinResponseDTO));
    return res.status(200).json(
      succesGetResponse({
        message: "Copias obtenidas exitosamente",
        result: allCopies.map(copyJoinResponseDTO),
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener las copias",
      }),
    );
  }
};

export const getAllCopiesByBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const allBookCopies = await getAllCopiesByBookService(bookId);

    if(allBookCopies.length === 0) {
      return res.status(404).json(notFoundResponse({message: 'No existen copias de este libro'}));
    };

    return res.status(200).json(succesGetResponse({message: 'Copias del libro obtenidas con éxito', result: allBookCopies.map(copyByBookResponseDTO)}))
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener las copias del libro",
      }),
    );
  }
};

export const getCopyById = async (req, res) => {
  const { id } = req.params;
console.log("id recibido en controller para admin: ", id);
console.log('req.body en controller para admin: ', req.body);
  try {
    const searchedCopy = await getCopyByEditionIdService(id);

    console.log("copy by id en controller para admin: ", copyJoinResponseDTO(searchedCopy));

    if (!searchedCopy) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Copia no encontrada" }));
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Copia obtenida exitosamente",
        result: copyJoinResponseDTO(searchedCopy),
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener la copia",
      }),
    );
  }
};

export const createCopy = async (req, res) => {
  try {
    const createdCopy = await createCopyService(req.body);

    return res.status(201).json(
      successDeleteResponse({
        message: "Copia creada exitosamente",
        result: copyResponseDTO(createdCopy),
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar crear una copia",
      }),
    );
  }
};

export const updateCopy = async (req, res) => {
  const { id } = req.params;
  const { copyData } = req.body;

  const copyDto = updateCopyDTO(copyData);

  try {
    const updatedCopy = await updateCopyService(id, copyDto);

    return res
      .status(202)
      .json(successUpdateResponse({ message: "Copia actualizada con éxito", result: copyResponseDTO(updatedCopy)}));
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar actualizar una copia",
      }),
    );
  }
};

export const deleteCopy = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteCopyService(id);

    return res.status(202).json(
      successDeleteResponse({ message: "Copia eliminada exitosamente" }),
    );
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Error al intentar eliminar copia" });
  }
};
