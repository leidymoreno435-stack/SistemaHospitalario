import jwt from 'jsonwebtoken';

// 1. Diccionario de Roles según tu base de datos
export const ROLES = {
  ADMIN: 1,
  MEDICO: 2,
  ENFERMERIA: 3,
  RECEPCIONISTA: 4,
  FARMACIA: 5
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ estado: 'error', resultado: 'No se proporcionó un token válido en el Gateway' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Guardamos la información decodificada en req.user para que esté disponible en los siguientes middlewares
    req.user = decoded; 

    // Inyectamos las cabeceras para los microservicios internos
    req.headers['x-user-id'] = decoded.id_usuario;
    req.headers['x-user-rol'] = decoded.id_rol;

    next();
  } catch (err) {
    return res.status(401).json({ estado: 'error', resultado: 'Token inválido o expirado' });
  }
};

/**
 * Middleware para verificar si el usuario tiene uno de los roles permitidos
 * @param {...number} allowedRoles - IDs de roles autorizados (ej: 1, 2)
 */
export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(Number(req.user.id_rol))) {
      return res.status(403).json({ 
        estado: 'error', 
        resultado: 'Acceso denegado: Permisos insuficientes para este recurso' 
      });
    }
    next();
  };
};