import {Router} from 'express';
import {usuarioControlador} from '../contenedor/UsuarioContenedor.js';

const router = Router(); 

router.post('/', usuarioControlador.crear);
router.get('/:id', usuarioControlador.lista);
router.delete('/:id', usuarioControlador.eliminar);

export default router; 