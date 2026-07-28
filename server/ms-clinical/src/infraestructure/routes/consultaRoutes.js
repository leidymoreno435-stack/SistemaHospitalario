import { Router } from 'express';
import { consultaController } from '../conteiner/consultaConteiner.js';

const router = Router();

router.get('/consultas', consultaController.read);
router.post('/consultas', consultaController.create);
router.put('/consultas', consultaController.update);
router.delete('/consultas', consultaController.delete);

export default router;