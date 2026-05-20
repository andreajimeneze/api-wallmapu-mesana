export const conflictError = (message = "Conflicto de datos") => {
    const error = new Error(message);
    error.status = 409;
    return error;
}

export const notFoundError = (message) => {
    const error = new Error("Recurso no encontrado");
    error.status = 404;
    return error;
}

export const badRequestError = (message) => {
    const error = new Error(message);
    error.status = 400;
    return error;
}

export const unauthorizedError = (message = 'Usuario no authorizado') => {
    const error = new Error(message);
    error.status = 401;
    return error;
}