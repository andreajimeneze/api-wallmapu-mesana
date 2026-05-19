export const validationError = (message = "Error de validación") => {
  const error = new Error(message);
  error.status = 400; 
  return error;
};

export const uniqueConstraintError = (message = "Dato duplicado") => {
  const error = new Error(message);
  error.status = 409; 
  return error;
};

export const foreignKeyError = (message = "Clave foránea inválida") => {
  const error = new Error(message);
  error.status = 400;
  return error;
};

