import { Router } from "express";
import { detalleFacturaContainer } from "../conteiner/detalleFacturaContainer.js";

const router = Router();

router.post('/detalleFactura', detalleFacturaContainer.create);
router.get('/detalleFactura', detalleFacturaContainer.read);
router.get('/detalleFactura/:id', detalleFacturaContainer.readById);
router.put('/detalleFactura/:id', detalleFacturaContainer.update);
router.patch('/detalleFactura/:id', detalleFacturaContainer.patch);
router.delete('/detalleFactura/:id', detalleFacturaContainer.delete);

export default router;
