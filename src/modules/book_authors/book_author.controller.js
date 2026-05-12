import {
  internalServerResponse,
  successDeleteResponse,
  successUpdateResponse,
} from "../../core/responses/apiResponse.js";
import { deleteBookAuthorService, updateBookAuthorService } from "./book_author.service.js";

export const updateBookAuthor = async (req, res) => {
  const { idBook } = req.params;
  const { authors } = req.body;

  try {

    const bookAuthor = await updateBookAuthorService(idBook, authors);

    return res
      .status(202)
      .json(
        successUpdateResponse({
          message: "Relación libro-autor editada exitosamente",
          data: bookAuthor
        }))

  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar editar la relación libro-autor",
        }),
      );
  }
}

export const deleteBookAuthor = async (req, res) => {
  const { idBook, idAuthor } = req.params;

  try {
    await deleteBookAuthorService(idBook, idAuthor);

    return res
      .status(204)
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
