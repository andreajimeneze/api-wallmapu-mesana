import  jwt  from "jsonwebtoken";
import { env } from '../../config/env.js';

export const jwtMiddleware = (req, res, next) => {
 
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, env.jwt.jwt_secret);
    req.user = decodedToken;
   
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export const authorizedRoles = (...allowedRoles) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        message: 'Token requerido'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Acceso denegado'
      });
    }

    next();
  };
};

export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Usuario no autorizado'
      });
    }

    next();
  };
};