import { Router } from 'express';
import { getConsultations, getConsultationById, createConsultation, updateConsultation, deleteConsultation } from '../controller/clinicalController.js';
import { authMiddleware } from '../../../../infraestructure/middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/clinical', getConsultations);
router.get('/clinical/:id', getConsultationById);
router.post('/clinical', createConsultation);
router.put('/clinical/:id', updateConsultation);
router.delete('/clinical/:id', deleteConsultation);

export default router;
