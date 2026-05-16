export const successCreateResponse = ({
  statusCode = 201,
  resource = 'Recurso',
  message,
  data,
}) => ({
  isSuccess: true,
  statusCode,
  message: message ?? `${resource} creado/a con éxito`,
  data,
});

export const succesGetResponse = ({
  statusCode = 200,
  resource = 'Recurso',
  message,
  data = null,
}) => ({
  isSuccess: true,
  statusCode,
  message: message ?? `${resource} obtenido/a(s) con éxito`,
  data,
});

export const successUpdateResponse = ({
  statusCode = 202,
  resource = 'Recurso',
  message,
  data,
}) => ({
  isSuccess: true,
  statusCode,
  message: message ?? `${resource} actualizado/a con éxito`,
  data,
});

export const successDeleteResponse = ({
  statusCode = 202,
  resource = 'Recurso',
  message,
  data = null,
}) => ({
  isSuccess: true,
  statusCode,
  message: message ?? `${resource} eliminado/a con éxito`,
  data
});

export const notFoundResponse = ({
  resource = 'Recurso',
  message,
  data = null,
  statusCode = 404
}) => ({
  isSuccess: false,
  statusCode,
  message: message ?? `${resource} no encontrado/a(s)`,
  data,
});

export const internalServerResponse = ({
  resource = 'Recurso',
  message,
  data = null,
  statusCode = 500,
}) => ({
  isSuccess: false,
  statusCode,
  message: message ?? `Error al intentar ejecutar la acción en ${resource}`,
  data,
});

export const unauthorizedResponse = ({
  message = 'No autenticado',
  data = null,
  statusCode = 401,
}) => ({
  isSuccess: false,
  statusCode,
  message,
  data,
});

export const notPermissionResponse = ({
  message =  'No autorizado para acceder al recurso',
  data = null,
  statusCode = 403,
}) => ({
  isSuccess: false,
  statusCode,
  message,
  data,
});

export const badRequestResponse = ({
  message = 'Solicitud inválida',
  data = null,
  statusCode = 400,
}) => ({
  isSuccess: false,
  statusCode,
  message,
  data,
});

export const conflictResponse = ({
  message = 'Recurso no se puede ejecutar',
  data = null,
  statusCode = 409,
}) => ({
  isSuccess: false,
  statusCode,
  message,
  data,
});