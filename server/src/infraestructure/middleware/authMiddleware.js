import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ estado: 'error', resultado: 'No se proporcionó un token válido' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        req.usuario = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ estado: 'error', resultado: 'Token inválido o expirado' });
    }
};
