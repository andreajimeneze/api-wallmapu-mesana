import {
  badRequestResponse,
  conflictResponse,
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
  successDeleteResponse,
  successUpdateResponse,
} from "../../core/responses/apiResponse.js";
import { copyResponseDTO, copyJoinResponseDTO, copyByBookResponseDTO, createCopyDTO, updateCopyDTO, baseCopyDTO } from "./copy.dto.js";
import {
  createCopyService,
  updateCopyService,
  deleteCopyService,
  getCopiesByEditionIdService,
  getAllCopiesAvailableByBookService,
} from "./copy.service.js";

export const getAllCopiesAvailableByBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const availableCopies = await getAllCopiesAvailableByBookService(bookId);

    return res.status(200).json(succesGetResponse({ message: 'Copias disponibles del libro obtenidas con éxito', data: availableCopies.map(copyByBookResponseDTO)}))
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener las copias disponibles del libro",
      }),
    );
  }
};
export const getCopiesByIdEdition = async (req, res) => {
  const { editionId } = req.params;
  
  try {
    const searchedCopy = await getCopiesByEditionIdService(editionId);

    return res.status(200).json(
      succesGetResponse({
        message: "Copias obtenidas exitosamente",
        data: searchedCopy.map(copyByBookResponseDTO),
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res.status(404).json(notFoundResponse({ message: error.message }));
    };
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener las copias",
      }),
    );
  }
};
export const createCopy = async (req, res) => {
  const copyDTO = createCopyDTO(req.body);

  try {
    const createdCopy = await createCopyService(copyDTO);

    return res.status(201).json(
      successDeleteResponse({
        message: "Copia creada exitosamente",
        data: baseCopyDTO(createdCopy),
      }),
    );
  } catch (error) {
    console.error('copy controller: ', error);
    if (error.status === 404) {
      return res.status(404).json(notFoundResponse({ message: error.message }));
    };
    if (error.status === 400) {
      return res.status(400).json(badRequestResponse({ message: error.message }));
    };
    if (error.status === 409) {
      return res.status(409).json(conflictResponse({ message: error.message }));
    };
    return res.status(500).json(internalServerResponse({ message: error.message, }))
  };
}
export const updateCopy = async (req, res) => {
  const { id } = req.params;

  const copyData = req.body;
  const copyDto = updateCopyDTO(copyData);
  
  try {
    const updatedCopy = await updateCopyService(id, copyDto);

    return res
      .status(200)
      .json(successUpdateResponse({ message: "Copia actualizada con éxito", data: baseCopyDTO(updatedCopy) }));
  } catch (error) {
    console.error(error);
    if (error.status === 400) {
      return res.status(400).json(badRequestResponse({ message: error.message }));
    };
    if (error.status === 409) {
      return res.status(409).json(conflictResponse({ message: error.message }));
    };
    return res.status(500).json(internalServerResponse({ message: error.message, }))
  }
};
export const deleteCopy = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCopy = await deleteCopyService(id);

    return res.status(200).json(
      successDeleteResponse({ message: "Copia eliminada exitosamente", data: deletedCopy }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res.status(404).json(notFoundResponse({ message: error.message }));
    };

    if (error.status === 409) {
      return res.status(409).json(conflictResponse({ message: error.message }));
    };
    return res.status(500).json(internalServerResponse({ message: error.message, }))
  }
};
