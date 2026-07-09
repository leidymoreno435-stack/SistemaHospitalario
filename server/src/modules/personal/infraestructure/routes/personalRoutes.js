import { Router } from 'express';
import { getPersonal, getPersonalById, createPersonal, updatePersonal, deletePersonal } from '../controller/personalController.js';
import { authMiddleware } from '../../../../infraestructure/middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/personal', getPersonal);
router.get('/personal/:id', getPersonalById);
router.post('/personal', createPersonal);
router.put('/personal/:id', updatePersonal);
router.delete('/personal/:id', deletePersonal);

export default router;
