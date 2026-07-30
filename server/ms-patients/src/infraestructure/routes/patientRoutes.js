import { Router } from "express";
import { patientContainer } from "../conteiner/patientContainer.js";

const router = Router();

<<<<<<< HEAD
router.post('/patient', patientContainer.create);
router.get('/patient', patientContainer.read);
router.get('/patient/:id', patientContainer.readById);
router.put('/patient/:id', patientContainer.update);
router.patch('/patient/:id', patientContainer.patch);
router.delete('/patient/:id', patientContainer.delete);
=======
router.post('/patients', patientController.create);
router.patch('/patients', patientController.update);
router.get('/patients', patientController.read);
router.delete('/patients', patientController.delete);
>>>>>>> 0d9d72c5b2672db31ec3ec3bbb62a6ad85fcf7b6

export default router;