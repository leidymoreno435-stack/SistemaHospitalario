import { Router } from 'express';
import { patientController } from '../conteiner/patientConteiner.js';

const router = Router();

router.get('/patients', patientController.read);
router.post('/patients', patientController.create);
router.delete('/patients', patientController.delete);
//router.get('/patients/:id', getPatientById);
//router.put('/patients/:id', updatePatient);

export default router;
