import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import usuarioModel from '../model/usuarioModel.js';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ estado: 'error', resultado: 'Faltan credenciales' });
        }

        const usuario = await usuarioModel.findOne({ where: { username } });
        if (!usuario) {
            return res.status(401).json({ estado: 'error', resultado: 'Usuario no encontrado' });
        }

        const esValido = await bcrypt.compare(password, usuario.password_hash);
        if (!esValido) {
            return res.status(401).json({ estado: 'error', resultado: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, username: usuario.username, id_rol: usuario.id_rol },
            process.env.JWT_SECRET || 'secret123',
            { expiresIn: '1d' }
        );

        return res.status(200).json({ estado: 'ok', token, usuario: { username: usuario.username, id_rol: usuario.id_rol } });
    } catch (error) {
        return res.status(500).json({ estado: 'error', resultado: 'Error en el servidor: ' + error.message });
    }
};

export const register = async (req, res) => {
    try {
        const { username, password, id_rol } = req.body;
        if (!username || !password || !id_rol) {
            return res.status(400).json({ estado: 'error', resultado: 'Faltan datos requeridos' });
        }

        const existe = await usuarioModel.findOne({ where: { username } });
        if (existe) {
            return res.status(400).json({ estado: 'error', resultado: 'El usuario ya existe' });
        }

        const password_hash = await bcrypt.hash(password, 10);
        
        await usuarioModel.create({
            username,
            password_hash,
            id_rol,
            activo: true,
            fecha_creacion: new Date()
        });

        return res.status(201).json({ estado: 'ok', resultado: 'Usuario registrado correctamente' });
    } catch (error) {
        return res.status(500).json({ estado: 'error', resultado: 'Error en el servidor: ' + error.message });
    }
};
