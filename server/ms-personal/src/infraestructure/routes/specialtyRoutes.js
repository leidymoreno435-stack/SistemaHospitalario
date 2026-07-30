import { Router } from 'express';
import { specialtyController } from '../conteiner/specialtyConteiner.js';

const router = Router();

router.post('/especialidad', specialtyController.create);
router.patch('/especialidad', specialtyController.update);
router.get('/especialidad', specialtyController.read);
router.delete('/especialidad', specialtyController.delete);

export default router;