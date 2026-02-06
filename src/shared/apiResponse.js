export const successResponse = ({
    statusCode = 0,
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
    statusCode = -1
}) => ({
    isSuccess: false,
    statusCode,
    message,
    data   
});

