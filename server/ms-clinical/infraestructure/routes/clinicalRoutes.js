import { Router } from 'express';
import { getConsultations, getConsultationById, createConsultation, updateConsultation, deleteConsultation } from '../controller/clinicalController.js';

const router = Router();

router.get('/clinical', getConsultations);
router.get('/clinical/:id', getConsultationById);
router.post('/clinical', createConsultation);
router.put('/clinical/:id', updateConsultation);
router.delete('/clinical/:id', deleteConsultation);

export default router;
