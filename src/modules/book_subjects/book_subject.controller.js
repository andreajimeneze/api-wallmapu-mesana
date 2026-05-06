import { deleteBookSubjectService, updateBookSubjectService } from "./book_subject.service.js";
import { successDeleteResponse, internalServerResponse, successUpdateResponse } from '../../core/responses/apiResponse.js';

export const updateBookSubject = async (req, res) => {
  const { idBook} = req.params;
  const { subjects } = req.body;

  try {
    const updated = await updateBookSubjectService(idBook, subjects);
    return res.status(202).json(successUpdateResponse({ message: 'Relación libro-descriptor actualizada correctamente', data: updated}))

  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar eliminar la relación libro-descriptor",
      }),
    );
  }

}

export const deleteBookSubject = async (req, res) => {
  const { idBook, idSubject } = req.params;

  try {
    await deleteBookSubjectService(idBook, idSubject);

    return res.status(204).json(
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
