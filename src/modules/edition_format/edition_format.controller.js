import { successDeleteResponse, internalServerResponse, successUpdateResponse } from '../../core/responses/apiResponse.js';
import { createEditionFormatService, deleteEditionFormatService, updateEditionFormatService } from './edition_format.service.js';


export const createEditionFormat = async (req, res) => {
  const {idEdition, formats } = req.body;
 
  try {

    const format = await createEditionFormatService(idEdition, formats);
 
  } catch(error) {
    console.error(error);
  }
}
export const updateEditionFormat = async (req, res) => {
  const { idEdition} = req.params;
  const { format_ids } = req.body;

  try {
    const updated = await updateEditionFormatService(idEdition, format_ids);
    return res.status(202).json(successUpdateResponse({ message: 'Relación edicion-formato actualizada correctamente', data: updated}))

  } catch (error) {
    console.error('update edition format: ', error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar eliminar la relación edición-formato",
      }),
    );
  }

}

export const deleteEditionFormat = async (req, res) => {
  const { idEdition, idFormat } = req.params;

  try {
    await deleteEditionFormatService(idEdition, idFormat);

    return res.status(204).json(
      successDeleteResponse({
        message: "Relación edición-formato eliminado exitosamente",
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar eliminar la relación edición-formato",
      }),
    );
  }
};
