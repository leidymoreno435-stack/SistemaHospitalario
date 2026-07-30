import { Router } from "express";
import { detalleRecetaContainer } from "../conteiner/detalleRecetaContainer.js";

const router = Router();

router.post('/detalleReceta', detalleRecetaContainer.create);
router.get('/detalleReceta', detalleRecetaContainer.read);
router.get('/detalleReceta/:id', detalleRecetaContainer.readById);
router.put('/detalleReceta/:id', detalleRecetaContainer.update);
router.patch('/detalleReceta/:id', detalleRecetaContainer.patch);
router.delete('/detalleReceta/:id', detalleRecetaContainer.delete);

export default router;
