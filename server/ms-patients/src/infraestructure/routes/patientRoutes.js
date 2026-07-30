import { Router } from 'express';
import { patientController } from '../conteiner/patientConteiner.js';

const router = Router();

router.post('/patients', patientController.create);
router.patch('/patients', patientController.update);
router.get('/patients', patientController.read);
router.delete('/patients', patientController.delete);

export default router;