import { Router } from "express";
import { facturaContainer } from "../conteiner/facturaContainer.js";

const router = Router();

router.post('/factura', facturaContainer.create);
router.get('/factura', facturaContainer.read);
router.get('/factura/:id', facturaContainer.readById);
router.put('/factura/:id', facturaContainer.update);
router.patch('/factura/:id', facturaContainer.patch);
router.delete('/factura/:id', facturaContainer.delete);

export default router;
