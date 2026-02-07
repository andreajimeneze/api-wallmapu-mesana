export const successResponse = ({
    statusCode = 200 || 201,
    message = 'Operación exitosa',
    data = null
}) => ({
    isSuccess: true,
    statusCode,
    message,
    data
});

export const errorResponse = ({
    message = 'Ocurrió un error',
    data = null,
    statusCode = 404
}) => ({
    isSuccess: false,
    statusCode,
    message,
    data   
});

