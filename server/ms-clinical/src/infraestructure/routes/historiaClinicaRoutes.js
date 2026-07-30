import { Router } from "express";
import { historiaClinicaContainer } from "../conteiner/historiaClinicaContainer.js";

const router = Router();

router.post('/historiaClinica', historiaClinicaContainer.create);
router.get('/historiaClinica', historiaClinicaContainer.read);
router.get('/historiaClinica/:id', historiaClinicaContainer.readById);
router.put('/historiaClinica/:id', historiaClinicaContainer.update);
router.patch('/historiaClinica/:id', historiaClinicaContainer.patch);
router.delete('/historiaClinica/:id', historiaClinicaContainer.delete);

export default router;
