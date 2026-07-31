import { Router } from "express";
import { patientContainer } from "../conteiner/patientContainer.js";

const router = Router();

router.post('/patient', patientContainer.create);
router.get('/patient', patientContainer.read);
router.get('/patient/:id', patientContainer.readById);
router.put('/patient/:id', patientContainer.update);
router.patch('/patient/:id', patientContainer.patch);
router.delete('/patient/:id', patientContainer.delete);

export default router;