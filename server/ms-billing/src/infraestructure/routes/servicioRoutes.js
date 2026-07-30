import { Router } from "express";
import { servicioContainer } from "../conteiner/servicioContainer.js";

const router = Router();

router.post('/servicio', servicioContainer.create);
router.get('/servicio', servicioContainer.read);
router.get('/servicio/:id', servicioContainer.readById);
router.put('/servicio/:id', servicioContainer.update);
router.patch('/servicio/:id', servicioContainer.patch);
router.delete('/servicio/:id', servicioContainer.delete);

export default router;
