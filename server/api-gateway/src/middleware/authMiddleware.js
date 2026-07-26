import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ estado: 'error', resultado: 'No se proporcionó un token válido en el Gateway' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Opcional: inyectar info del usuario en cabeceras para los microservicios internos
        req.headers['x-user-id'] = decoded.id_usuario;
        req.headers['x-user-rol'] = decoded.id_rol;
        next();
    } catch (err) {
        return res.status(401).json({ estado: 'error', resultado: 'Token inválido o expirado' });
    }
};
