import { deleteBookSubjectService } from "./book_subject.service.js";
import { successDeleteResponse, internalServerResponse } from '../../shared/apiResponse.js';

export const deleteBookSubject = async (req, res) => {
  const { bookId, subjectId } = req.params;

  try {
    await deleteBookSubjectService(bookId, subjectId);

    return res.status(202).json(
      successDeleteResponse({
        message: "Relación libro-descriptor eliminado exitosamente",
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar eliminar la relación libro-descriptor",
      }),
    );
  }
};
