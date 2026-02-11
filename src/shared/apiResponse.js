export const successCreateResponse = ({
  statusCode = 201,
  message = "",
  result,
}) => ({
  isSuccess: true,
  statusCode,
  message,
  result,
});

export const successGetResponse = ({
  statusCode = 200,
  message = "",
  result = result,
}) => ({
  isSuccess: true,
  statusCode,
  message,
  result,
});

export const successUpdateResponse = ({
  statusCode = 200,
  message = "",
  result,
}) => ({
  isSuccess: true,
  statusCode,
  message,
  result,
});

export const successDeleteResponse = ({
  statusCode = 204,
  message = "",
  result,
}) => ({
  isSuccess: true,
  statusCode,
  message,
  result,
});

export const notFoundResponse = ({
  message = "",
  result = null,
  statusCode = 404,
}) => ({
  isSuccess: false,
  statusCode,
  message,
  result,
});

export const internalServerResponse = ({
  message = "",
  result = null,
  statusCode = 500,
}) => ({
  isSuccess: false,
  statusCode,
  message,
  result,
});

export const unauthorizedResponse = ({
  message = "",
  result = null,
  statusCode = 401,
}) => ({
  isSuccess: false,
  statusCode,
  message,
  result,
});

export const notPermissionResponse = ({
  message = "",
  result = null,
  statusCode = 403,
}) => ({
  isSuccess: false,
  statusCode,
  message,
  result,
});

export const badRequestResponse = ({
  message = "",
  result = null,
  statusCode = 400,
}) => ({
  isSuccess: false,
  statusCode,
  message,
  result,
});
