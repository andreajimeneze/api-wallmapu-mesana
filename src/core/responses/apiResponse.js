export const successCreateResponse = ({
  statusCode = 201,
  resource = 'Recurso',
  message,
  result,
}) => ({
  isSuccess: true,
  statusCode,
  message: message ?? `${resource} creado con éxito`,
  result,
});

export const succesGetResponse = ({
  statusCode = 200,
  resource = 'Recurso',
  message,
  result = null,
}) => ({
  isSuccess: true,
  statusCode,
  message: message ?? `${resource} obtenido/a con éxito`,
  result,
});

export const successUpdateResponse = ({
  statusCode = 202,
  resource = 'Recurso',
  message,
  result,
}) => ({
  isSuccess: true,
  statusCode,
  message: message ?? `${resource} actualizado con éxito`,
  result,
});

export const successDeleteResponse = ({
  statusCode = 202,
  resource = 'Recurso',
  message,
  result = null,
}) => ({
  isSuccess: true,
  statusCode,
  message: message ?? `${recourse} eliminado con éxito`,
  result
});

export const notFoundResponse = ({
  resource = 'Recurso',
  message,
  result = null,
  statusCode = 404
}) => ({
  isSuccess: false,
  statusCode,
  message: message ?? `${resource} no encontrado/a(s)`,
  result,
});

export const internalServerResponse = ({
  resource = 'Recurso',
  message,
  result = null,
  statusCode = 500,
}) => ({
  isSuccess: false,
  statusCode,
  message: message ?? `Error al intentar ejecutar la acción en ${resource}`,
  result,
});

export const unauthorizedResponse = ({
  message = 'No autenticado',
  result = null,
  statusCode = 401,
}) => ({
  isSuccess: false,
  statusCode,
  message,
  result,
});

export const notPermissionResponse = ({
  message =  'No autorizado para acceder al recurso',
  result = null,
  statusCode = 403,
}) => ({
  isSuccess: false,
  statusCode,
  message,
  result,
});

export const badRequestResponse = ({
  message = 'Solicitud inválida',
  result = null,
  statusCode = 400,
}) => ({
  isSuccess: false,
  statusCode,
  message,
  result,
});

export const conflictResponse = ({
  message = 'Recurso no se puede ejecutar',
  result = null,
  statusCode = 409,
}) => ({
  isSuccess: false,
  statusCode,
  message,
  result,
});