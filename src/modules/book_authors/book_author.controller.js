import {
  internalServerResponse,
  successDeleteResponse,
} from "../../shared/apiResponse.js";
import { deleteBookAuthorService } from "./book_author.service.js";

export const deleteBookAuthor = async (req, res) => {
  const { idBook, idAuthor } = req.params;

  try {
    await deleteBookAuthorService(idBook, idAuthor);

    return res
      .status(202)
      .json(
        successDeleteResponse({
          message: "Relación libro-autor eliminado exitosamente",
        }),
      );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar eliminar la relación libro-autor",
        }),
      );
  }
};
