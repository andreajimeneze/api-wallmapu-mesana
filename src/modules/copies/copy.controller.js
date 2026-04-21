import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
  successDeleteResponse,
  successUpdateResponse,
} from "../../core/responses/apiResponse.js";
import { copyResponseDTO, copyJoinResponseDTO, copyByBookResponseDTO, createCopyDTO, updateCopyDTO } from "./copy.dto.js";
import {
  getAllCopiesService,
 getCopiesByEditionIdService,
  createCopyService,
  updateCopyService,
  deleteCopyService,
  getAllCopiesByBookService,
  getAllCopiesAvailableService,
  getCopyByIdService,
} from "./copy.service.js";

export const getAllCopies = async (req, res) => {
  try {
    const allCopies = await getAllCopiesService();
    
    if (!allCopies || allCopies.length === 0) {
      return res.status(200).json(
        succesGetResponse({
          message: "No existen copias cargadas actualmente",
        }),
      );
    };

    return res.status(200).json(
      succesGetResponse({
        message: "Copias obtenidas exitosamente",
        data: allCopies.map(copyJoinResponseDTO),
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
      return res.status(200).json(succesGetResponse({message: 'No existen copias de este libro'}));
    };

    return res.status(200).json(succesGetResponse({message: 'Copias del libro obtenidas con éxito', data: allBookCopies.map(copyByBookResponseDTO)}))
  } catch (error) {
    console.error('get copies by book service', error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener las copias del libro",
      }),
    );
  }
};

export const getAllCopiesAbailableByBook = async (req, res) => {
  const {bookId} = req.params;


  try {
    const availableCopies = await getAllCopiesAvailableService(bookId);
 
    if(!availableCopies || availableCopies.length === 0) {
       return res.status(200).json(succesGetResponse({message: 'No existen copias disponibles de este libro'}));
    };

    return  res.status(200).json(succesGetResponse({message: 'Copias disponibles del libro obtenidas con éxito', data: availableCopies.map(copyByBookResponseDTO)}))
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
  const {editionId}  = req.params;

  try {
    const searchedCopy = await getCopiesByEditionIdService(editionId);
 
    if (!searchedCopy) {
      return res
        .status(404).json(notFoundResponse({ message: "Copias no encontradas" }));
    };

    return res.status(200).json(
      succesGetResponse({
        message: "Copias obtenidas exitosamente",
        data: searchedCopy.map(copyResponseDTO),
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

export const getCopyById = async (req, res) => {
  const {id} = req.params;

  try {
    const copyById = await getCopyByIdService(id);

    if(!copyById) {
      return res.status(404).json(notFoundResponse({message: 'No existe la copia solicitada'}));
    };

    return res.status(200).json(succesGetResponse({message: 'Copia obtenida exitosamente', data: copyResponseDTO(copyById)}));
  } catch(error) {
    console.error(error);
    return res.status(500).json(internalServerResponse({message: 'Error al intentar obtener la copia'}));
  }
};

export const createCopy = async (req, res) => {
 const { copy_number, signature_topography, edition_id, status_id }  = req.body;

 const editionId = edition_id;
 const statusId = status_id;
  
  const copyData = {
  signatureTopography: signature_topography,
  barcode: signature_topography,
  copyNumber: copy_number,
  editionId: editionId,
  statusId: statusId
};
 
  try {
    const createdCopy = await createCopyService(copyData);

    return res.status(201).json(
      successDeleteResponse({
        message: "Copia creada exitosamente",
        data: copyResponseDTO(createdCopy),
      }),
    );
  } catch (error) {
    console.error('copy controller: ', error);
    return res.status(400).json({
    isSuccess: false,
    message: error.message,
  });
  }
};

export const updateCopy = async (req, res) => {
  const { id } = req.params;
  const  copyData = req.body;

  const copyDto = updateCopyDTO(copyData);

  try {
    const updatedCopy = await updateCopyService(id, copyDto);

    return res
      .status(202)
      .json(successUpdateResponse({ message: "Copia actualizada con éxito", data: copyResponseDTO(updatedCopy)}));
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
