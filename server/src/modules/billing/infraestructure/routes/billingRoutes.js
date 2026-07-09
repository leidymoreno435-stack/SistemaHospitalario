import { Router } from 'express';
import { getInvoices, getInvoiceById, createInvoice, updateInvoice, deleteInvoice } from '../controller/billingController.js';
import { authMiddleware } from '../../../../infraestructure/middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/billing', getInvoices);
router.get('/billing/:id', getInvoiceById);
router.post('/billing', createInvoice);
router.put('/billing/:id', updateInvoice);
router.delete('/billing/:id', deleteInvoice);

export default router;
