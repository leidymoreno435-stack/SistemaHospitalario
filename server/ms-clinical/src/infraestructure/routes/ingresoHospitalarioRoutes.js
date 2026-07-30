import { Router } from "express";
import { ingresoHospitalarioContainer } from "../conteiner/ingresoHospitalarioContainer.js";

const router = Router();

router.post('/ingresoHospitalario', ingresoHospitalarioContainer.create);
router.get('/ingresoHospitalario', ingresoHospitalarioContainer.read);
router.get('/ingresoHospitalario/:id', ingresoHospitalarioContainer.readById);
router.put('/ingresoHospitalario/:id', ingresoHospitalarioContainer.update);
router.patch('/ingresoHospitalario/:id', ingresoHospitalarioContainer.patch);
router.delete('/ingresoHospitalario/:id', ingresoHospitalarioContainer.delete);

export default router;
