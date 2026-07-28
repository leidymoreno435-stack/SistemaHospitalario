import { Router } from 'express';
import { consultaController } from '../conteiner/consultaConteiner.js';

const router = Router();

router.get('/consultas', consultaController.read);
router.post('/consultas', consultaController.create);
router.patch('/consultas', consultaController.update);
router.delete('/consultas', consultaController.delete);

export default router;