export const successCreateResponse = ({
    statusCode = 201,
    message = '',
    data
}) => ({
    isSuccess: true,
    statusCode,
    message, 
    data
});

export const successGetResponse = ({
    statusCode = 200,
    message = '',
    data = data
}) => ({
    isSuccess: true,
    statusCode,
    message, 
    data
});

export const successUpdateResponse = ({
    statusCode = 200,
    message = '',
    data
}) => ({
    isSuccess: true,
    statusCode,
    message, 
    data
});

export const successDeleteResponse = ({
    statusCode = 204,
    message = '',
    data
}) => ({
    isSuccess: true,
    statusCode,
    message, 
    data
});


export const notFoundResponse = ({
    message = '',
    data = null,
    statusCode = 404
}) => ({
    isSuccess: false,
    statusCode,
    message,
    data   
});

export const internalServerResponse = ({
    message = '',
    data = null,
    statusCode = 500
}) => ({
    isSuccess: false,
    statusCode,
    message,
    data   
});

export const unauthorizedResponse = ({
    message = '',
    data = null,
    statusCode = 401
}) => ({
    isSuccess: false,
    statusCode,
    message,
    data   
});

export const notPermissionResponse = ({
    message = '',
    data = null,
    statusCode = 403
}) => ({
    isSuccess: false,
    statusCode,
    message,
    data   
});