import { Router } from 'express';
import { getPatients, getPatientById, createPatient, updatePatient, deletePatient } from '../controller/patientController.js';
import { authMiddleware } from '../../../../infraestructure/middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware); // Todas las rutas de pacientes requieren autenticacion

router.get('/patients', getPatients);
router.get('/patients/:id', getPatientById);
router.post('/patients', createPatient);
router.put('/patients/:id', updatePatient);
router.delete('/patients/:id', deletePatient);

export default router;
