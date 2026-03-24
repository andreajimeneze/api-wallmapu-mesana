import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
  successDeleteResponse,
  successUpdateResponse,
} from "../../shared/apiResponse.js";
import { copyResponseDTO, copyJoinResponseDTO } from "./copy.dto.js";
import {
  getAllCopiesService,
  getCopyByIdService,
  createCopyService,
  updateCopyService,
  deleteCopyService,
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
    }
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

// export const getCopyByIdJoin = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const searchedCopy = await getCopyByIdJoinService(id);

//     if (!searchedCopy) {
//       return res
//         .status(404)
//         .json(notFoundResponse({ message: "Copia no encontrada" }));
//     }

//     return res.status(200).json(
//       succesGetResponse({
//         message: "Copia obtenida exitosamente",
//         result: copyJoinResponseDTO(searchedCopy),
//       }),
//     );
//   } catch (error) {
//     return res.status(500).json(
//       internalServerResponse({
//         message: "Error al intentar obtener la copia",
//       }),
//     );
//   }
// };

export const getCopyById = async (req, res) => {
  const { id } = req.params;

  try {
    const searchedCopy = await getCopyByIdService(id);

    if (!searchedCopy) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Copia no encontrada" }));
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Copia obtenida exitosamente",
        result: copyResponseDTO(searchedCopy),
      }),
    );
  } catch (error) {
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener la copia",
      }),
    );
  }
};

export const createCopy = async (req, res) => {
  //const { copyData } = req.body;
  console.log("req body en copy controller: ", req.body);
  try {
    const createdCopy = await createCopyService(req.body);
    console.log("copia creada en controller", createdCopy);
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

  try {
    const updatedCopy = await updateCopyService(id, copyData);

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
