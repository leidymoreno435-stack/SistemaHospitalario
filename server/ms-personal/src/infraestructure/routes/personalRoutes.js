import { Router } from 'express';
import { personalController } from '../conteiner/personalConteiner.js';

const router = Router();

router.post('/personal', personalController.create);
router.get('/personal', personalController.read);
router.delete('/personal', personalController.delete);

export default router;